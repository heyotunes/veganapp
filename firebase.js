import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPJasRdHzkfDa2pqjwcA06VuUWBYzuRCc",
  authDomain: "truevegan-a32a6.firebaseapp.com",
  projectId: "truevegan-a32a6",
  storageBucket: "truevegan-a32a6.appspot.com",
  messagingSenderId: "805168038072",
  appId: "1:805168038072:web:f7808f4543b99e73dd344d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
