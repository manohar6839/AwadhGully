
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

(async () => {
    // 1. Load Env Manually
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
        console.log('Loaded .env configuration.');
    } else {
        console.error('.env file not found!');
        process.exit(1);
    }

    // 2. Connect to DB
    const client = new Client({
        host: dbConfig.DB_HOST,
        port: parseInt(dbConfig.DB_PORT || '5432'),
        user: dbConfig.DB_USERNAME,
        password: dbConfig.DB_PASSWORD,
        database: dbConfig.DB_NAME,
        ssl: false // Assuming internal network or no SSL required for localhost/ip
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL.');

        // 3. Fix Channel Token
        const targetToken = 'fosrdc0pacptsremtq5';
        const channelRes = await client.query(`SELECT id, code, token FROM "channel"`);
        console.log('Channels found:', channelRes.rows);

        if (channelRes.rows.length > 0) {
            // Pick the first one as default if multiple, or look for one that looks like default
            const channel = channelRes.rows[0]; 
            // Update it blindly to the target token for now as we only expect one active channel
            await client.query(`UPDATE "channel" SET token = $1 WHERE id = $2`, [targetToken, channel.id]);
            console.log(`UPDATED Channel ${channel.code} Token to ${targetToken}`);
        } else {
            console.error('No channels found at all!');
        }

        // 4. Verify User
        const email = 'test@awadhgully.com';
        const userRes = await client.query(`SELECT id, verified FROM "user" WHERE identifier = $1`, [email]);
        
        if (userRes.rows.length > 0) {
            const user = userRes.rows[0];
            if (!user.verified) {
                await client.query(`UPDATE "user" SET verified = true WHERE id = $1`, [user.id]);
                console.log('UPDATED User: Set to Verified.');
            } else {
                console.log('User is already verified.');
            }
        } else {
            console.error('Test User not found in "user" table! (Might exist in "customer" but not "user"?)');
        }

    } catch (err) {
        console.error('Database Error:', err);
    } finally {
        await client.end();
    }
})();
