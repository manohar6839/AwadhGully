
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
        
        console.log('--- CHECKING USER REOORD ---');
        const res = await client.query(`
            SELECT u.id, u.identifier, u.verified, u."verificationToken"
            FROM "user" u
            WHERE u.identifier = 'manohar6839@gmail.com'
        `);

        if (res.rowCount === 0) {
            console.log('User not found.');
        } else {
            const user = res.rows[0];
            console.log(`User Found: ${user.identifier}`);
            console.log(`Verified: ${user.verified}`);
            console.log(`Token: ${user.verificationToken}`);
            
            if (user.verificationToken) {
                console.log(`\nMANUAL LINK: https://awadhgully.com/verify-email?token=${user.verificationToken}`);
            }
        }

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
