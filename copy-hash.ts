
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
        
        // 1. Get Superadmin Hash
        const adminRes = await client.query(`
            SELECT "passwordHash" FROM "authentication_method" WHERE identifier = 'superadmin'
        `);
        
        if (adminRes.rowCount === 0) {
            console.error('Superadmin not found!');
            process.exit(1);
        }
        
        const validHash = adminRes.rows[0].passwordHash;
        console.log(`Found valid hash from superadmin: ${validHash.substring(0, 10)}...`);

        // 2. Update Target User
        const targetEmail = 'manohar6839@gmail.com';
        const userRes = await client.query('SELECT id FROM "user" WHERE identifier = $1', [targetEmail]);
        
        if (userRes.rowCount === 0) {
            console.error(`User ${targetEmail} not found!`);
        } else {
            const userId = userRes.rows[0].id;
            const updateRes = await client.query(`
                UPDATE "authentication_method" 
                SET "passwordHash" = $1 
                WHERE "userId" = $2 AND type = 'native'
            `, [validHash, userId]);
            
            console.log('SUCCESS: Copied superadmin hash to test user.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
})();
