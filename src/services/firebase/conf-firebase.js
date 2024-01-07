// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwlz5fnSVn1Nan3K-KclpOvPxzu2BTaEI",
    authDomain: "front-end1-6c987.firebaseapp.com",
    projectId: "front-end1-6c987",
    storageBucket: "front-end1-6c987.appspot.com",
    messagingSenderId: "173402594782",
    appId: "1:173402594782:web:6939ce69197d93161ad14f",
    measurementId: "G-0QPC73ZS0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



