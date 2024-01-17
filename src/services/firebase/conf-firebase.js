// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyB9yib2-L2SeVaQjQfTh5GBa_b4kTkz0Lc",

    authDomain: "beertobeerproject.firebaseapp.com",

    projectId: "beertobeerproject",

    storageBucket: "beertobeerproject.appspot.com",

    messagingSenderId: "159226030615",

    appId: "1:159226030615:web:a2d67d197a7a58b51b8a52",

    measurementId: "G-LBV813Q2TN"

};


firebase.initializeApp(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



