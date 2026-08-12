// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "ai-interview-h.firebaseapp.com",
  projectId: "ai-interview-h",
  storageBucket: "ai-interview-h.firebasestorage.app",
  messagingSenderId: "194424094211",
  appId: "1:194424094211:web:0058977c5aec149f4dd836",
  measurementId: "G-J34LM5XYCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);


const provider = new GoogleAuthProvider();

export { auth, provider }