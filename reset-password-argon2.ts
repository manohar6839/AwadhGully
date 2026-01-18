
import { Client } from 'pg';
import argon2 from 'argon2';

(async () => {
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
        
        console.log(`Hashing password with Argon2...`);
        const hash = await argon2.hash(newPassword);
        console.log(`Generated Hash: ${hash}`);
        
        // 1. Get User ID
        const userRes = await client.query('SELECT id FROM "user" WHERE identifier = $1', [email]);
        
        if (userRes.rowCount === 0) {
            console.error('User test@awadhgully.com does not exist!');
        } else {
            const userId = userRes.rows[0].id;
            
            // 2. Update Authentication Method
            const updateRes = await client.query(`
                UPDATE "authentication_method" 
                SET "passwordHash" = $1 
                WHERE "userId" = $2 AND type = 'native'
            `, [hash, userId]);
            
            if (updateRes.rowCount > 0) {
                console.log('SUCCESS: Password updated with Argon2 hash.');
            } else {
                console.log('Authentication method not found for update.');
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
})();
