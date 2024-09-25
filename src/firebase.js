// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace this with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAGmS04XytbrekgGBM86AlAX4RFHV_uuSI",
  authDomain: "obljikh.firebaseapp.com",
  projectId: "obljikh",
  storageBucket: "obljikh.appspot.com",
  messagingSenderId: "183304367589",
  appId: "1:183304367589:web:ef5c5344f4f6a61440130c",
  measurementId: "G-ZYT9Z84EZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore database instance
const db = getFirestore(app);

export { db };
