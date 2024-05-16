import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase from firebase/database

const firebaseConfig = {
    apiKey: "AIzaSyAUXfAdtk7JYrWkGRT9vhKUpoRrjzqkT6s",
    authDomain: "aturbabyincubator-f5b13.firebaseapp.com",
    databaseURL: "https://aturbabyincubator-f5b13-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aturbabyincubator-f5b13",
    storageBucket: "aturbabyincubator-f5b13.appspot.com",
    messagingSenderId: "812262145388",
    appId: "1:812262145388:web:d0ad6d846d6e270ba0c749"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Correctly use getDatabase
