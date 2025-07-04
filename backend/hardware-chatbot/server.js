// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./firebase-config');
const dialogflow = require('@google-cloud/dialogflow');
const path = require('path');
const fs = require('fs');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dialogflow client setup
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const sessionClient = new dialogflow.SessionsClient({
  projectId: process.env.DIALOGFLOW_PROJECT_ID,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  }
});

// Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Utility to look up product in Firestore
async function getProductInfo(productName) {
  const name = typeof productName === 'object' && productName.stringValue
    ? productName.stringValue
    : productName;
  const doc = await db.collection('inventory').doc(name).get();
  return doc.exists ? doc.data() : null;
}

app.get('/api/health', (req, res) => res.send('Chatbot server is running!'));

// ==== Dialogflow Webhook Endpoint ====
app.post('/webhook', async (req, res) => {
  const qr = req.body.queryResult || {};
  const displayName = qr.intent?.displayName || '';
  const intent = displayName.toLowerCase();

  console.log('▶️ Incoming Intent:', displayName);
  console.log('▶️ Raw Parameters:', JSON.stringify(qr.parameters, null, 2));

  let text = "Sorry, I didn't get that.";

  // Handle category-based product listing
  if (intent === 'get product by category') {
    let raw = qr.parameters.product_category;
    let category = typeof raw === 'string'
      ? raw
      : (raw?.stringValue || '');
    category = category.toLowerCase().trim();

    console.log(`🔍 Looking up category: "${category}"`);
    if (!category) {
      text = "Please specify a category (e.g., laptops or cameras).";
    } else {
      const snapshot = await db.collection('inventory')
        .where('category', '==', category)
        .get();

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

  // Default Welcome
  } else if (intent === 'default welcome intent') {
    text = "Hey! Welcome to Kritika Enterprises. How can I assist you today?";

  // Product Inquiry
  } else if (intent === 'product inquiry') {
    const product = qr.parameters.product_name;
    if (product) {
      const info = await getProductInfo(product);
      text = info
        ? `The ${product} is available for $${info.price}.`
        : `I'm sorry, I couldn't find ${product}.`;
    } else {
      text = "Which product would you like info on?";
    }

  // Stock Availability
  } else if (intent === 'stock availability') {
    const product = qr.parameters.product_name;
    if (product) {
      const info = await getProductInfo(product);
      text = info
        ? (info.stock > 0
           ? `Yes—we have ${info.stock} units of ${product} in stock.`
           : `No, ${product} is currently out of stock.`)
        : `I'm sorry, I couldn't find ${product}.`;
    } else {
      text = "Which product's stock would you like to check?";
    }
  }

  console.log('↪️ Responding with:', text);
  res.json({
    fulfillmentText: text,
    fulfillmentMessages: [{ text: { text: [text] } }],
    source: 'webhook'
  });
});

// ==== Front-end Chat Proxy Endpoint ====
app.post('/api/chat', async (req, res) => {
  const { text, sessionId = 'default' } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  const sessionPath = sessionClient.projectAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);
  try {
    const [dfResponse] = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: { text: { text, languageCode: 'en' } }
    });
    const reply = dfResponse.queryResult.fulfillmentText;
    res.json({ reply });
  } catch (err) {
    console.error('Dialogflow detectIntent error:', err);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

// Create order endpoint
// app.post('/api/create-order', async (req, res) => {
//   try {
//     const { amount, currency = 'INR', receipt, notes } = req.body;
//     const options = {
//       amount: amount * 100, // amount in paise
//       currency,
//       receipt: receipt || `receipt_${Date.now()}`,
//       notes: notes || {},
//     };
//     const order = await razorpay.orders.create(options);
//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.post('/api/verify-payment', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userInfo } = req.body;

//   // Validate signature
//   const generated_signature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(razorpay_order_id + '|' + razorpay_payment_id)
//     .digest('hex');

//   if (generated_signature === razorpay_signature) {
//     // Store user info and payment details in Firestore
//     await db.collection('payments').add({
//       ...userInfo,
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       createdAt: new Date(),
//     });
//     res.json({ success: true, reference: razorpay_payment_id });
//   } else {
//     res.status(400).json({ success: false, error: 'Invalid signature' });
//   }
// });

// Use __dirname for portability
// const staticPath = path.join(__dirname, '..', '..', 'client_frontend', 'dist');
// console.log('Static path:', staticPath);
// app.use(express.static(staticPath));

// app.get('*', (req, res) => {
//   const indexPath = path.join(__dirname, '..', '..', 'client_frontend', 'dist', 'index.html');
//   console.log('Serving index.html from:', indexPath);
//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath, function (err) {
//       if (err) {
//         console.error('Error sending index.html:', err);
//         res.status(err.status || 500).send('Error loading index.html');
//       }
//     });
//   } else {
//     res.status(404).send('index.html not found');
//   }
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Webhook: POST http://localhost:${port}/webhook`);
  console.log(`Chat API: POST http://localhost:${port}/api/chat`);
}); 