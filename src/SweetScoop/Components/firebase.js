
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
    apiKey: "AIzaSyBxUTPxF1bdOdIrvpkEu-hujoRgFuzZBcY",
    authDomain: "sweet-scoop-12da3.firebaseapp.com",
    projectId: "sweet-scoop-12da3",
    storageBucket: "sweet-scoop-12da3.firebasestorage.app",
    messagingSenderId: "149542246651",
    appId: "1:149542246651:web:7347949b76c5604bc6385e",
    measurementId: "G-P5H6T9ZGQ6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app); 

export { auth };