// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-748ee.firebaseapp.com",
  projectId: "mern-estate-748ee",
  storageBucket: "mern-estate-748ee.appspot.com",
  messagingSenderId: "1024443366949",
  appId: "1:1024443366949:web:69cf0686074cf4dfb709cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);