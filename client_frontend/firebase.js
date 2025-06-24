// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const auth = getAuth(app);
//const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // 👉 Initialize Firestore

export { auth, db, googleProvider }; // 👉 Export db to use in your frontend
