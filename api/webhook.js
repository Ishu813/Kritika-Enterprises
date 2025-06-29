const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

async function getProductInfo(productName) {
  const name = typeof productName === 'object' && productName.stringValue
    ? productName.stringValue
    : productName;
  const doc = await db.collection('inventory').doc(name).get();
  return doc.exists ? doc.data() : null;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const qr = req.body.queryResult || {};
  const displayName = qr.intent?.displayName || '';
  const intent = displayName.toLowerCase();
  let text = "Sorry, I didn't get that.";
  if (intent === 'get product by category') {
    let raw = qr.parameters.product_category;
    let category = typeof raw === 'string' ? raw : (raw?.stringValue || '');
    category = category.toLowerCase().trim();
    if (!category) {
      text = "Please specify a category (e.g., laptops or cameras).";
    } else {
      const snapshot = await db.collection('inventory').where('category', '==', category).get();
      if (snapshot.empty) {
        text = `Sorry, we don't have any ${category} right now.`;
      } else {
        const items = snapshot.docs.map(d => {
          const p = d.data();
          return `• ${p.name} — ₹${p.price}`;
        }).join('\n');
        text = `Here are our ${category}:\n${items}`;
      }
    }
  } else if (intent === 'default welcome intent') {
    text = "Hey! Welcome to Kritika Enterprises. How can I assist you today?";
  } else if (intent === 'product inquiry') {
    const product = qr.parameters.product_name;
    if (product) {
      const info = await getProductInfo(product);
      text = info ? `The ${product} is available for $${info.price}.` : `I'm sorry, I couldn't find ${product}.`;
    } else {
      text = "Which product would you like info on?";
    }
  } else if (intent === 'stock availability') {
    const product = qr.parameters.product_name;
    if (product) {
      const info = await getProductInfo(product);
      text = info ? (info.stock > 0 ? `Yes—we have ${info.stock} units of ${product} in stock.` : `No, ${product} is currently out of stock.`) : `I'm sorry, I couldn't find ${product}.`;
    } else {
      text = "Which product's stock would you like to check?";
    }
  }
  res.status(200).json({
    fulfillmentText: text,
    fulfillmentMessages: [{ text: { text: [text] } }],
    source: 'webhook'
  });
}; 