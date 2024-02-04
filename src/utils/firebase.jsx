// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWs1A2bKt849laqzif7AkHAwUT_o0tv3Q",
  authDomain: "api-react-rajni.firebaseapp.com",
  projectId: "api-react-rajni",
  storageBucket: "api-react-rajni.appspot.com",
  messagingSenderId: "166157137146",
  appId: "1:166157137146:web:747db27af49436e9f18543",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
