// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpFKa7Oa0JKVsH6mR8PZGhXiSPSMdUxz0",
  authDomain: "noteapp-ae7d3.firebaseapp.com",
  projectId: "noteapp-ae7d3",
  storageBucket: "noteapp-ae7d3.appspot.com",
  messagingSenderId: "821431022792",
  appId: "1:821431022792:web:be4f37a496029e8042e1fd",
  measurementId: "G-0KECFG8C0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
    return app; 
};

export const db = getFirestore(app);