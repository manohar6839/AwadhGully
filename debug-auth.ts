
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

(async () => {
    // 1. Load Env Manually
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

    try {
        await client.connect();
        console.log('--- DEBUG INFO ---');

        // 1. Channel Info
        const channels = await client.query(`SELECT id, code, token FROM "channel"`);
        console.log('CHANNELS:', channels.rows);

        // 2. User Info
        const email = 'test@awadhgully.com';
        const userRes = await client.query(`SELECT id, identifier, verified, "deletedAt" FROM "user" WHERE identifier = $1`, [email]);
        console.log('USER:', userRes.rows);

        if (userRes.rows.length > 0) {
            const userId = userRes.rows[0].id;
            // Join authentication_method table
            const authRes = await client.query(`SELECT id, "userId", identifier, "passwordHash" FROM "authentication_method" WHERE "userId" = $1`, [userId]);
             console.log('AUTH METHODS:', authRes.rows);
        }

        // 3. Customer Info
        const customerRes = await client.query(`SELECT id, "emailAddress", "userId" FROM "customer" WHERE "emailAddress" = $1`, [email]);
        console.log('CUSTOMER:', customerRes.rows);

        // 4. Reset Password manually if user exists
        if (userRes.rows.length > 0) {
            console.log('--- RESETTING PASSWORD MANUALLY ---');
            try {
                // @ts-ignore
                const bcrypt = await import('bcryptjs');
                const password = 'TestUser123!';
                const hash = bcrypt.hashSync(password, 10);
                console.log(`Generated Hash for ${password}: ${hash}`);

                const userId = userRes.rows[0].id;
                await client.query(`UPDATE "authentication_method" SET "passwordHash" = $1 WHERE "userId" = $2`, [hash, userId]);
                console.log('UPDATED "authentication_method" with new hash.');
            } catch (e) {
                console.error('Failed to load bcryptjs or update hash:', e);
            }
        }

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
