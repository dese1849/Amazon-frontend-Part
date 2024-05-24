// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc58BWKOoaROBeUOgFO4qqOKoSxUfyVhM",
  authDomain: "clone-1d9f7.firebaseapp.com",
  projectId: "clone-1d9f7",
  storageBucket: "clone-1d9f7.appspot.com",
  messagingSenderId: "635460154369",
  appId: "1:635460154369:web:e3839524cd59c315d83c00",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = app.firestore();
