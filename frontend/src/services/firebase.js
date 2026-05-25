// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUX-NDUIUnL4IJjNq3uhbRYjvfwkLu0xQ",
  authDomain: "fitness-bea26.firebaseapp.com",
  projectId: "fitness-bea26",
  storageBucket: "fitness-bea26.firebasestorage.app",
  messagingSenderId: "958079244390",
  appId: "1:958079244390:web:71ef338803739300fb75a7",
  measurementId: "G-305DXMWNQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth, analytics };