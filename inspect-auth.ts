
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
        console.log('--- AUTHENTICATION METHODS ---');
        
        const res = await client.query(`
            SELECT am.identifier, am."passwordHash", am.type, u.id as "userId", u.identifier as "userEmail"
            FROM "authentication_method" am
            JOIN "user" u ON am."userId" = u.id
        `);

        res.rows.forEach(row => {
            console.log(`User: ${row.userEmail} | Identifier: ${row.identifier} | Type: ${row.type}`);
            console.log(`Hash: ${row.passwordHash ? row.passwordHash.substring(0, 20) + '...' : 'NULL'}`);
            console.log('------------------------------------------------');
        });

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
