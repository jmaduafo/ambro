// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, 
    STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
let app;
export let auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export const db = getFirestore(app)
export const provider = new GoogleAuthProvider(app)

const storage = getStorage();

export async function uploadToStorage(uri, base, id, fileName, setOnProgress, userType) {
  const fetchResponse = await fetch(uri)
  const blob = await fetchResponse.blob()

  // Base example ('recipes', 'users')
  let storageRef;
  
  if (base === 'recipes') {
    storageRef = ref(storage, `images/${base}/${id}/${fileName}`);
  } else if (base === 'users') {
    // userType example (can either be 'backgroundImage' or 'profileImage')
    // images/users/JHhs9828223/backgroundImage/Hhgshgsshdh.png -> saves the users background image
    storageRef = ref(storage, `images/${base}/${id}/${userType}/${fileName}`);
  }
    

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise(( resolve, reject) => {
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      //  && setOnProgress(progress)
    }, 
    (error) => {
      // Handle unsuccessful uploads
      reject(error)
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve({
          downloadURL,
          metadata: uploadTask.snapshot.metadata
        })
      })
    }
  );
  })
}