
import { Client } from 'pg';

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
        
        const email = 'manohar6839@gmail.com';
        console.log(`Manually verifying ${email}...`);
        
        const res = await client.query(`
            UPDATE "user" 
            SET verified = true 
            WHERE identifier = $1
            RETURNING id, verified
        `, [email]);

        if (res.rowCount === 0) {
            console.log('User not found.');
        } else {
            console.log(`SUCCESS: User ${email} (ID: ${res.rows[0].id}) is now VERIFIED.`);
        }

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
