// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your own Firebase configuration from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyALcGitAfedXABIau5FiKpz5-0qUWhfMw4",
  authDomain: "cryptolabsapp-100b4.firebaseapp.com",
  projectId: "cryptolabsapp-100b4",
  storageBucket: "cryptolabsapp-100b4.firebasestorage.app",
  messagingSenderId: "311556917035",
  appId: "1:311556917035:web:d9ae0224c01a4e26fae76e",
  measurementId: "G-DS52QMQHZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
