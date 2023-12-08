// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmDPaTnP9KsGgJRrb6H5lBs2m3bNs3Ngw",
  authDomain: "netflixgpt-1dcb1.firebaseapp.com",
  projectId: "netflixgpt-1dcb1",
  storageBucket: "netflixgpt-1dcb1.appspot.com",
  messagingSenderId: "563421474143",
  appId: "1:563421474143:web:3eaeccf82c5565f51edaea",
  measurementId: "G-NKN4544W91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();