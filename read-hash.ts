
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

(async () => {
    // 1. Load Env
    const envPath = path.resolve(__dirname, 'packages/dev-server/.env');
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
        
        const res = await client.query(`
            SELECT identifier, "passwordHash" 
            FROM "authentication_method" 
            WHERE identifier = 'superadmin' OR identifier = 'demo@awadhgully.com'
        `);

        const output = res.rows.map(row => `${row.identifier}: ${row.passwordHash}`).join('\n');
        fs.writeFileSync('hashes.txt', output);
        console.log('Hashes written to hashes.txt');

    } catch (err) {
        console.error('Database Error:', err);
        fs.writeFileSync('hashes.txt', 'Error: ' + err.message);
    } finally {
        await client.end();
    }
})();
