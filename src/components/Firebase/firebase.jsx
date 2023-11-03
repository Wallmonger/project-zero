import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


const app = initializeApp(config);
export const auth = getAuth(app); 


const signupUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);

const loginUser = (email, password) => auth.signInWithEmailAndPassword(email, password);

const signoutUser = () => auth.signOut();
