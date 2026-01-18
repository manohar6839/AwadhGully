
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

(async () => {
    // 1. Load Env
    const envPath = path.resolve(__dirname, '.env');
    const dbConfig: any = {};
    
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                dbConfig[key.trim()] = value.trim();
            }
        });
    } else {
        console.error('.env file not found!');
        process.exit(1);
    }

    const client = new Client({
        host: dbConfig.DB_HOST,
        port: parseInt(dbConfig.DB_PORT || '5432'),
        user: dbConfig.DB_USERNAME,
        password: dbConfig.DB_PASSWORD,
        database: dbConfig.DB_NAME,
        ssl: false
    });

    const targetEmail = 'demo@awadhgully.com';
    const targetPassword = 'DemoUser123!';
    const firstName = 'Demo';
    const lastName = 'User';

    try {
        await client.connect();
        console.log(`--- ENSURING USER: ${targetEmail} ---`);

        // @ts-ignore
        const bcrypt = await import('bcryptjs');
        const hash = bcrypt.hashSync(targetPassword, 10);
        console.log(`Generated Hash for ${targetPassword}`);

        // 1. Check if User exists
        const userRes = await client.query(`SELECT id, identifier FROM "user" WHERE identifier = $1`, [targetEmail]);
        let userId;

        if (userRes.rows.length === 0) {
            console.log('User not found. Creating new User...');
            const now = new Date();
            const insertUser = await client.query(`
                INSERT INTO "user" ("createdAt", "updatedAt", identifier, verified, "deletedAt", "lastLogin")
                VALUES ($1, $1, $2, true, null, null)
                RETURNING id
            `, [now, targetEmail]);
            userId = insertUser.rows[0].id;
            console.log('Created User ID:', userId);
        } else {
            userId = userRes.rows[0].id;
            console.log('User exists. ID:', userId);
            // Ensure verified is true
            await client.query(`UPDATE "user" SET verified = true, "deletedAt" = null WHERE id = $1`, [userId]);
        }

        // 2. Ensure Authentication Method exists
        const authRes = await client.query(`SELECT id FROM "authentication_method" WHERE "userId" = $1`, [userId]);
        if (authRes.rows.length === 0) {
             console.log('Creating Authentication Method...');
             const now = new Date();
             await client.query(`
                INSERT INTO "authentication_method" ("createdAt", "updatedAt", identifier, "passwordHash", "userId", type, "config")
                VALUES ($1, $1, $2, $3, $4, 'native', '{}')
             `, [now, targetEmail, hash, userId]);
             console.log('Created Authentication Method.');
        } else {
            console.log('Updating Authentication Method with new hash...');
            await client.query(`UPDATE "authentication_method" SET "passwordHash" = $1 WHERE "userId" = $2`, [hash, userId]);
            console.log('Updated Password Hash.');
        }

        // 3. Ensure Customer exists
        const customerRes = await client.query(`SELECT id FROM "customer" WHERE "emailAddress" = $1`, [targetEmail]);
        if (customerRes.rows.length === 0) {
            console.log('Creating Customer...');
            const now = new Date();
            await client.query(`
                INSERT INTO "customer" ("createdAt", "updatedAt", "firstName", "lastName", "emailAddress", "userId", "deletedAt")
                VALUES ($1, $1, $2, $3, $4, $5, null)
            `, [now, firstName, lastName, targetEmail, userId]);
            console.log('Created Customer.');
        } else {
            console.log('Customer exists.');
            // Ensure link to user is correct
            await client.query(`UPDATE "customer" SET "userId" = $1 WHERE "emailAddress" = $2`, [userId, targetEmail]);
        }
        
        console.log('--- SUCCESS: User verified and password set. ---');
        console.log(`Email: ${targetEmail}`);
        console.log(`Password: ${targetPassword}`);

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
