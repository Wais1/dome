// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtbCiSgywFqT1MsgEWbAmYo5tPGmRl3Tg",
  authDomain: "dome-a0352.firebaseapp.com",
  projectId: "dome-a0352",
  storageBucket: "dome-a0352.appspot.com",
  messagingSenderId: "388688629879",
  appId: "1:388688629879:web:51297d470bdba5c561f672"
};

const app = firebase.initializeApp(firebaseConfig);


const db = app.firestore();
const auth = firebase.auth();

export { db, auth }