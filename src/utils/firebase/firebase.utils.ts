import { initializeApp } from 'firebase/app'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    getRedirectResult
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp ( firebaseConfig );
const auth = getAuth ( app );
const provider = new GoogleAuthProvider ();

provider.setCustomParameters ( {
    prompt: 'select_account'
} );

export const signWithGoogleRedirect = () => signInWithRedirect ( auth, provider )
export const signWithGooglePopup = () => signInWithPopup ( auth, provider )
export const getRedirectGoogleResult = () => getRedirectResult ( auth )






