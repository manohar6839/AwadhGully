const Database = require('better-sqlite3');
const db = new Database('packages/dev-server/vendure.sqlite');

try {
  const assets = db.prepare('SELECT * FROM asset').all();
  console.log('Assets in DB:', assets);

  const products = db.prepare('SELECT id, name, featuredAssetId FROM product').all();
  console.log('Products:', products);
} catch (e) {
  console.error(e);
}
