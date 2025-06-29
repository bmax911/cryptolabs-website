// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArkIqz499Wjr1qRsr1GnA1Ggw0jy-H_fs",
  authDomain: "cryptolabs-webapp.firebaseapp.com",
  projectId: "cryptolabs-webapp",
  storageBucket: "cryptolabs-webapp.firebasestorage.app",
  messagingSenderId: "830837351021",
  appId: "1:830837351021:web:b50c3574d7785e03ad5564",
  measurementId: "G-EZ25XYRVVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);