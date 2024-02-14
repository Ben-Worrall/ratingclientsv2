import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

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

  const txtDB = getFirestore(app)

  export {txtDB}