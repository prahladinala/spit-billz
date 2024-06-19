import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKd4ehYVSXAvteA9CI1vCQOaxkjBZ2faA",
  authDomain: "split-billz.firebaseapp.com",
  projectId: "split-billz",
  storageBucket: "split-billz.appspot.com",
  messagingSenderId: "992838605711",
  appId: "1:992838605711:web:b24866a7e3f07ad926c9fa",
  measurementId: "G-GZ9K1ZQTZL",
};

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
