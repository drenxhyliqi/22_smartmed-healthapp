// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHbX3KeqgLBgU-b0pVk7AAYmvL5727308",
  authDomain: "healthcareapp-v2025.firebaseapp.com",
  projectId: "healthcareapp-v2025",
  storageBucket: "healthcareapp-v2025.firebasestorage.app",
  messagingSenderId: "247278658002",
  appId: "1:247278658002:web:33b77c8469c1edd9bf280b",
  measurementId: "G-F3X58J483F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);