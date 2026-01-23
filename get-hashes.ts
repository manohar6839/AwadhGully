
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
        
        const res = await client.query(`
            SELECT identifier, "passwordHash"
            FROM "authentication_method" 
            WHERE identifier = 'superadmin' OR identifier = 'manohar6839@gmail.com'
        `);

        console.log('--- PASSWORD HASHES ---');
        res.rows.forEach(row => {
            console.log(`User: ${row.identifier}`);
            console.log(`Hash: ${row.passwordHash}`);
            console.log('-----------------------');
        });

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
