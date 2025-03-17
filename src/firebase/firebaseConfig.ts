import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAMdvARMmi-HN5uL9xt_RgICRt03yAy98",
  authDomain: "todolist-f184c.firebaseapp.com",
  projectId: "todolist-f184c",
  storageBucket: "todolist-f184c.firebasestorage.app",
  messagingSenderId: "864338541267",
  appId: "1:864338541267:web:67d6d7338813b35610f226",
  measurementId: "G-X12K5VP601",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
