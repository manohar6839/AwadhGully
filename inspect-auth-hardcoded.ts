
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
        console.log('--- CONNECTED TO DB ---');
        console.log('--- AUTHENTICATION METHODS ---');
        
        const res = await client.query(`
            SELECT am.identifier, am."passwordHash", am.type
            FROM "authentication_method" am
        `);

        res.rows.forEach(row => {
            console.log(`Identifier: ${row.identifier} | Type: ${row.type}`);
            console.log(`Hash: ${row.passwordHash ? row.passwordHash.substring(0, 30) + '...' : 'NULL'}`);
            console.log('------------------------------------------------');
        });

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
