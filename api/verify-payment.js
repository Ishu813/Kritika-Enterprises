const crypto = require('crypto');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userInfo } = req.body;
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generated_signature === razorpay_signature) {
    await db.collection('payments').add({
      ...userInfo,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      createdAt: new Date(),
    });
    res.status(200).json({ success: true, reference: razorpay_payment_id });
  } else {
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
}; 