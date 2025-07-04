const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Initialize Firebase Admin with service account
// const serviceAccount = require('../../firestore_seeder/serviceAccountKey.json');
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db }; 