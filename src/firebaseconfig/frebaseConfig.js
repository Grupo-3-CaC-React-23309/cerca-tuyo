// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwl_KnB6SgTF42GCENoV9vtJhXvlvUg2g",
  authDomain: "cerca-tuyo-738a3.firebaseapp.com",
  projectId: "cerca-tuyo-738a3",
  storageBucket: "cerca-tuyo-738a3.appspot.com",
  messagingSenderId: "140864751162",
  appId: "1:140864751162:web:24e5d0ccc869bfe8445703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
