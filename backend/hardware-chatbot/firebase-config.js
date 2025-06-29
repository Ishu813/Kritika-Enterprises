const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
// const serviceAccount = require('../../firestore_seeder/serviceAccountKey.json');
const serviceAccount = require('./kayee-ai-fjvy-f0b95a89f33b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db }; 