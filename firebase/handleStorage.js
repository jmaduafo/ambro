import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function uploadToStorage(uri, base, id, fileName, userType, currentImages, setCurrentImages) {
    const fetchResponse = await fetch(uri)
    const blob = await fetchResponse.blob()
  
    // 'base' example: ('recipes', 'users')
    let storageRef;
    
    if (base === 'recipes') {
      storageRef = ref(storage, `images/${base}/${id}/${fileName}`);
    } else if (base === 'users') {
      // userType example (can either be 'backgroundImage' or 'profileImage')
      // ex: images/users/JHhs9828223/backgroundImage/Hhgshgsshdh.png -> saves the users background image
      storageRef = ref(storage, `images/${base}/${id}/${userType}/${fileName}`);
    }
  
    const uploadTask = uploadBytesResumable(storageRef, blob);
  
    uploadTask.on('state_changed', 
    (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, 
    (error) => {
    // Handle unsuccessful uploads
    console.log(error.message)
    }, 
    () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setCurrentImages([...currentImages, downloadURL])
    })
    }
    );
  }