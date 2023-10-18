// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCRSVN6rIpkPQKLz77NFcES36Fpe665T9k",
  authDomain: "nextberries-cb5b9.firebaseapp.com",
  databaseURL: "https://nextberries-cb5b9-default-rtdb.firebaseio.com",
  projectId: "nextberries-cb5b9",
  storageBucket: "nextberries-cb5b9.appspot.com",
  messagingSenderId: "44749615279",
  appId: "1:44749615279:web:0b3e110f248c8e8b3ae45a",
  measurementId: "G-9QZ27VRVHL"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
