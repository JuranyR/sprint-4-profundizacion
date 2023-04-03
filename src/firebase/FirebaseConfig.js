// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDkBZAwuOxQ92qHM2D7S-OxfP4x9qM5URI",
  authDomain: "sprint4-96c55.firebaseapp.com",
  projectId: "sprint4-96c55",
  storageBucket: "sprint4-96c55.appspot.com",
  messagingSenderId: "608757572756",
  appId: "1:608757572756:web:42524576d1263058f78081"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const dataBase = getFirestore(app);
