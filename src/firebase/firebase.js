import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwl_KnB6SgTF42GCENoV9vtJhXvlvUg2g",
    authDomain: "cerca-tuyo-738a3.firebaseapp.com",
    projectId: "cerca-tuyo-738a3",
    storageBucket: "cerca-tuyo-738a3.appspot.com",
    messagingSenderId: "140864751162",
    appId: "1:140864751162:web:24e5d0ccc869bfe8445703"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail };