import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5xT097SkbpX-j34FJCNFFg1R5u-kCvxw",
  authDomain: "svelte-auth-7d198.firebaseapp.com",
  projectId: "svelte-auth-7d198",
  appId: "1:271426098220:web:6e36004ee9db17be06ad89",
  databaseURL:
    "https://svelte-auth-7d198-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const db = firebase.database();
