import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQWXqzQkAEltSCcVwiIXNs5snZcz_p7bo",
  authDomain: "codespark-4f89a.firebaseapp.com",
  projectId: "codespark-4f89a",
  storageBucket: "codespark-4f89a.firebasestorage.app",
  messagingSenderId: "843182391517",
  appId: "1:843182391517:web:7651bc776946cf25b85b34",
  measurementId: "G-ZRRYLBVYE0",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
