
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
        console.log(`Checking status for ${email}...`);
        
        const checkRes = await client.query('SELECT id, verified FROM "user" WHERE identifier = $1', [email]);
        
        if (checkRes.rowCount === 0) {
            console.log('User NOT FOUND.');
        } else {
            console.log(`Current Status: Verified = ${checkRes.rows[0].verified}`);
            
            console.log(`Setting verified = true...`);
            await client.query('UPDATE "user" SET verified = true WHERE identifier = $1', [email]);
            
            const verifyRes = await client.query('SELECT id, verified FROM "user" WHERE identifier = $1', [email]);
            console.log(`New Status: Verified = ${verifyRes.rows[0].verified}`);
        }

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
