// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMjib7YGLX5kUDBzKj3LCjIQxZNy4w9WA",
  authDomain: "react-disney-plus-app-caf48.firebaseapp.com",
  projectId: "react-disney-plus-app-caf48",
  storageBucket: "react-disney-plus-app-caf48.appspot.com",
  messagingSenderId: "986741743126",
  appId: "1:986741743126:web:7e1f5e5931a68294badf37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
