const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Starting High-Fidelity Simulator (Awadh Gully)...');

const DB_FILE = path.join(__dirname, 'v3-mock-db.json');

// --- DATA ---
const PRODUCTS = [
    {
        productId: '1',
        productName: 'Royal Galouti Kebab',
        slug: 'royal-galouti-kebab',
        description: "Melt-in-mouth texture. Finely minced lamb marinated with 160 secret spices, smoked with cloves, and pan-seared in ghee.",
        price: 45000,
        assets: [{ preview: 'https://placehold.co/300?text=Galouti+Kebab' }]
    },
    {
        productId: '2',
        productName: 'Nawabi Dum Biryani',
        slug: 'nawabi-dum-biryani',
        description: "Aromatic & Subtle. Long-grain basmati and succulent meat, slow-cooked in a sealed 'handi' to trap the aroma of saffron and ittar.",
        price: 55000,
        assets: [{ preview: 'https://placehold.co/300?text=Dum+Biryani' }]
    },
    {
        productId: '3',
        productName: 'Saffron Phirni',
        slug: 'saffron-phirni',
        description: "Sweet Conclusion. Creamy ground rice pudding enriched with saffron, cardamom, and garnished with silver leaf and nuts.",
        price: 25000,
        assets: [{ preview: 'https://placehold.co/300?text=Saffron+Phirni' }]
    }
];

const SEARCH_ITEMS = PRODUCTS.map(p => ({
    productId: p.productId,
    productName: p.productName,
    slug: p.slug,
    description: p.description,
    priceWithTax: { value: p.price, currencyCode: 'INR' },
    currencyCode: 'INR',
    productAsset: p.assets[0],
    assets: p.assets,
    productVariantId: p.productId,
    sku: p.slug,
    inStock: true
}));

const COLLECTION = {
    id: '1',
    name: 'Signature Creations',
    slug: 'signature-creations',
    breadcrumbs: [],
    parentId: null,
    parent: null,
    productVariants: {
        items: PRODUCTS.map(p => ({
            productId: p.productId,
            productName: p.productName,
            slug: p.slug,
            price: p.price,
            priceWithTax: p.price,
            currencyCode: 'INR',
            product: { 
                slug: p.slug, 
                featuredAsset: p.assets[0] 
            },
            featuredAsset: p.assets[0]
        })),
        totalItems: PRODUCTS.length
    }
};

// --- DB LOGIC ---
let DB = {
    activeOrder: null
};

function loadDb() {
    if (fs.existsSync(DB_FILE)) {
        try {
            DB = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
            console.log('Database loaded.');
        } catch (e) {
            console.error('Failed to load DB, starting fresh.', e);
        }
    }
}

function saveDb() {
    fs.writeFileSync(DB_FILE, JSON.stringify(DB, null, 2));
}

loadDb();

// --- SERVER ---
const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Video-Auth-Token'); // Added Auth headers often used

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url.startsWith('/shop-api')) {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const response = { data: {} };
            
            // --- QUERIES ---
            
            // 1. Search
            if (body.includes('search(')) {
                response.data.search = {
                    items: SEARCH_ITEMS,
                    totalItems: SEARCH_ITEMS.length,
                    facetValues: []
                };
            }

            // 2. Collections
            if (body.includes('collections(')) {
                response.data.collections = {
                    items: [COLLECTION]
                };
            }
            if (body.includes('collection(')) {
                response.data.collection = COLLECTION;
            }

            // 3. Active Order
            if (body.includes('activeOrder')) {
                response.data.activeOrder = DB.activeOrder;
            }

            // 4. Product Detail (simplified)
            if (body.includes('product(')) {
                // Find via substring mapping or default
                let product = PRODUCTS[0];
                if (body.includes('slug: "nawabi-dum-biryani"')) product = PRODUCTS[1];
                if (body.includes('slug: "saffron-phirni"')) product = PRODUCTS[2];

                response.data.product = {
                    id: product.productId,
                    name: product.productName,
                    slug: product.slug,
                    description: product.description,
                    variants: [{ 
                        id: product.productId, 
                        price: product.price, 
                        priceWithTax: product.price, 
                        currencyCode: 'INR',
                        stockLevel: '100', // FIXED: Inventory
                        sku: product.slug,
                        name: product.productName
                    }],
                    assets: product.assets,
                    featuredAsset: product.assets[0],
                    optionGroups: []
                };
            }

            // --- MUTATIONS ---

            // 5. Add Item to Order
            if (body.includes('addItemToOrder')) {
                // Extract variant ID
                const match = body.match(/productVariantId:\s*"([^"]+)"/);
                const variantId = match ? match[1] : '1';
                const product = PRODUCTS.find(p => p.productId === variantId) || PRODUCTS[0];

                if (!DB.activeOrder) {
                    DB.activeOrder = {
                        id: 'order-' + Date.now(),
                        code: 'ORDER-' + Math.floor(Math.random() * 10000),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        totalQuantity: 0,
                        totalWithTax: 0,
                        subTotalWithTax: 0,
                        currencyCode: 'INR',
                        shippingWithTax: 0,
                        shippingLines: [],
                        discounts: [],
                        state: 'AddingItems',
                        active: true,
                        lines: [],
                        customer: { id: 'cust-1', emailAddress: 'guest@example.com', firstName: 'Guest', lastName: 'User' }
                    };
                }

                // Add Line
                const newLine = {
                    id: 'line-' + Math.random().toString(36).substr(2, 9),
                    quantity: 1,
                    linePriceWithTax: product.price,
                    unitPriceWithTax: product.price,
                    discountedLinePriceWithTax: product.price,
                    featuredAsset: product.assets[0],
                    productVariant: {
                        id: variantId,
                        name: product.productName,
                        sku: product.slug,
                        price: product.price,
                        stockLevel: '100',
                        currencyCode: 'INR',
                        product: { name: product.productName, slug: product.slug }
                    }
                };
                DB.activeOrder.lines.push(newLine);
                
                // Update Totals
                DB.activeOrder.totalQuantity += 1;
                DB.activeOrder.totalWithTax += product.price;
                DB.activeOrder.subTotalWithTax += product.price;

                saveDb();
                response.data.addItemToOrder = DB.activeOrder;
                response.data.activeOrder = DB.activeOrder;
            }

            // 6. Transition State (Simplistic)
            if (body.includes('transitionOrderToState')) {
                if (DB.activeOrder) {
                    const match = body.match(/state:\s*"([^"]+)"/);
                    if (match) DB.activeOrder.state = match[1];
                    saveDb();
                    response.data.transitionOrderToState = DB.activeOrder;
                }
            }

             // 7. Add Payment (Simplistic)
             if (body.includes('addPaymentToOrder')) {
                if (DB.activeOrder) {
                    DB.activeOrder.state = 'PaymentSettled';
                     DB.activeOrder.active = false; // Order complete
                     // Archive order logic could go here
                     const completedOrder = JSON.parse(JSON.stringify(DB.activeOrder));
                     DB.activeOrder = null; // Clear active order
                     saveDb();
                     response.data.addPaymentToOrder = completedOrder;
                }
            }

            // 8. Adjust/Remove Order Line (Simplistic - just return order)
            if (body.includes('adjustOrderLine') || body.includes('removeOrderLine')) {
                // To do: implement real removal logic if needed. 
                // For now, assume user adds correctly.
                 response.data.adjustOrderLine = DB.activeOrder;
                 response.data.removeOrderLine = DB.activeOrder;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('HIGH-FIDELITY SIMULATOR RUNNING ON PORT 3000');
});
