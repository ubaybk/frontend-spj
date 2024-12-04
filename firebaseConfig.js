import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzxcYHKCUZG_OCWc_ZBvTd8bktFGaHg6Q",
    authDomain: "restapispj.firebaseapp.com",
    databaseURL: "https://restapispj-default-rtdb.firebaseio.com",
    projectId: "restapispj",
    storageBucket: "restapispj.firebasestorage.app",
    messagingSenderId: "597279202842",
    appId: "1:597279202842:web:edc36f803c1e9776773ba3",
    measurementId: "G-YYNS9E45KE"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  export default db