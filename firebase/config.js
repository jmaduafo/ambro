// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, 
    STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyCw5vSTYDJ0dX5NyQ8itGSKCuGm_HLdtSE",
  authDomain: "ambre-50f69.firebaseapp.com",
  projectId: "ambre-50f69",
  storageBucket: "ambre-50f69.appspot.com",
  messagingSenderId: "539938737850",
  appId: "1:539938737850:web:cf925e43a64741e477fc83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider(app)