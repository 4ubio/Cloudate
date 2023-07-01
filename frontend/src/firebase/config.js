import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
  
const FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cloudate-2.firebaseapp.com",
    projectId: "cloudate-2",
    storageBucket: "cloudate-2.appspot.com",
    messagingSenderId: "412994089925",
    appId: "1:412994089925:web:75b5477d5969e87f96d1ac"
};

const FirebaseApp = initializeApp(FirebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);