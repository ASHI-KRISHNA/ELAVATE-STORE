import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTuwYB4d_V8pTm8eKZRsngDm-QQZaET5M",
  authDomain: "elavate-store.firebaseapp.com",
  projectId: "elavate-store",
  storageBucket: "elavate-store.firebasestorage.app",
  messagingSenderId: "1071772127839",
  appId: "1:1071772127839:web:e4469d8153702885a181ea"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();