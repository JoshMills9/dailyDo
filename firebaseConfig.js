import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCKUMiy-kmGl2G3SPhJYXVhEH9Lg_qDkeM",
    authDomain: "dailydo-9012b.firebaseapp.com",
    projectId: "dailydo-9012b",
    storageBucket: "dailydo-9012b.appspot.com",
    messagingSenderId: "979939403317",
    appId: "1:979939403317:web:2a4200b462e71bf1fd737c",
    measurementId: "G-NSMFQRWH16"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

