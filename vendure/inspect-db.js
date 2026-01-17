const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'packages/dev-server/vendure.sqlite');
const db = new Database(dbPath, { verbose: console.log });

console.log('Connected to database at:', dbPath);

// List all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name));

// If 'asset' table exists, show its columns
if (tables.some(t => t.name === 'asset')) {
    const columns = db.prepare("PRAGMA table_info(asset)").all();
    console.log('Asset Columns:', columns);
    
    // Show some assets
    const assets = db.prepare("SELECT * FROM asset LIMIT 5").all();
    console.log('First 5 Assets:', assets);
} else {
    console.log('Table "asset" not found.');
}

// Check product table columns
if (tables.some(t => t.name === 'product')) {
    const columns = db.prepare("PRAGMA table_info(product)").all();
    console.log('Product Columns:', columns.map(c => c.name));
     const products = db.prepare("SELECT * FROM product LIMIT 5").all();
    console.log('First 5 Products:', products);
}
