
import { Client } from 'pg';
import * as bcrypt from 'bcryptjs';

(async () => {
    // Hardcoded credentials from previous step
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'awadhgully',
        password: 'awadh123',
        database: 'awadhgully',
        ssl: false
    });

    try {
        await client.connect();
        
        const email = 'test@awadhgully.com';
        const newPassword = '12345678';
        const hash = await bcrypt.hash(newPassword, 10);
        
        console.log(`Resetting password for ${email} to ${newPassword}...`);
        
        // 1. Get User ID
        const userRes = await client.query('SELECT id FROM "user" WHERE identifier = $1', [email]);
        
        if (userRes.rowCount === 0) {
            console.log('User not found. Creating user...');
            // Optional: Logic to create if missing, but focusing on reset for now
            console.error('User test@awadhgully.com does not exist! Please create it first.');
        } else {
            const userId = userRes.rows[0].id;
            
            // 2. Update Authentication Method
            const updateRes = await client.query(`
                UPDATE "authentication_method" 
                SET "passwordHash" = $1 
                WHERE "userId" = $2 AND type = 'native'
            `, [hash, userId]);
            
            if (updateRes.rowCount > 0) {
                console.log('SUCCESS: Password updated.');
            } else {
                console.log('No native authentication method found. Creating one...');
                await client.query(`
                    INSERT INTO "authentication_method" ("createdAt", "updatedAt", "userId", "identifier", "passwordHash", "type")
                    VALUES (NOW(), NOW(), $1, $2, $3, 'native')
                `, [userId, email, hash]);
                console.log('SUCCESS: Authentication method created.');
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
})();
