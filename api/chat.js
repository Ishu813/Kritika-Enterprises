const { SessionsClient } = require('@google-cloud/dialogflow');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new SessionsClient({
  projectId,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { text, sessionId = 'default' } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  try {
    const [dfResponse] = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: { text: { text, languageCode: 'en' } }
    });
    const reply = dfResponse.queryResult.fulfillmentText;
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Dialogflow detectIntent error:', err);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
}; 