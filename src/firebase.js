// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLMGOa2T8kVAafZnrw0lvV_ulF8G2XjHM",
  authDomain: "ratingclients.firebaseapp.com",
  projectId: "ratingclients",
  storageBucket: "ratingclients.appspot.com",
  messagingSenderId: "531205172736",
  appId: "1:531205172736:web:f3ee1d308221930420b2e5",
  measurementId: "G-NLXK2W4BSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore()