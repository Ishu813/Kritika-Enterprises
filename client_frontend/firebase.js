// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👉 Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV77q9X1xp303p_mdDoK_syTIX2f_Grlc",
  authDomain: "temp-80751.firebaseapp.com",
  projectId: "temp-80751",
  storageBucket: "temp-80751.firebasestorage.app",
  messagingSenderId: "511109344984",
  appId: "1:511109344984:web:97abcb6aeac1c1b493b1ad",
  measurementId: "G-6BVY2KHFXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app); // 👉 Initialize Firestore

//export { analytics, db }; // 👉 Export db to use in your frontend
