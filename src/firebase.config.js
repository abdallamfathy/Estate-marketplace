import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo4TYptdAw7Fu9bkxjrBLG0JNJ5qW0Wno",
  authDomain: "house-marketplace-app-dad00.firebaseapp.com",
  projectId: "house-marketplace-app-dad00",
  storageBucket: "house-marketplace-app-dad00.appspot.com",
  messagingSenderId: "815664519474",
  appId: "1:815664519474:web:632d7b89a7de2085eddf2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();