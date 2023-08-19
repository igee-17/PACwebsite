// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeLsOasXSoR2BV2CKwvG0KBLCzWFy6bIg",
  authDomain: "pac-website-ee788.firebaseapp.com",
  projectId: "pac-website-ee788",
  storageBucket: "pac-website-ee788.appspot.com",
  messagingSenderId: "135437435413",
  appId: "1:135437435413:web:6653886fc0ff0487b3041c",
  measurementId: "G-TWY3LNQ21T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
