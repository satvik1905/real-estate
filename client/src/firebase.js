// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "men-estate-d5096.firebaseapp.com",
  projectId: "men-estate-d5096",
  storageBucket: "men-estate-d5096.appspot.com",
  messagingSenderId: "216525196047",
  appId: "1:216525196047:web:3ba1c91db37ed480fe0c7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
