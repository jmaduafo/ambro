import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function uploadToRecipeStorage(uri, base, id, fileName,setCurrentImage) {
    const fetchResponse = await fetch(uri)
    const blob = await fetchResponse.blob()
  
    // 'base' example: ('recipes', 'users')
    // 'id' -> the id of the recipe
    const storageRef = ref(storage, `images/${base}/${id}/${fileName}`);
    
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
        setCurrentImage(downloadURL)
        console.log(downloadURL)
    })
    }
    );
}

export async function uploadToUserStorage(uri, base, id, fileName, userType, currentImages, setCurrentImages) {
    const fetchResponse = await fetch(uri)
    const blob = await fetchResponse.blob()
  
    // 'base' example: ('recipes', 'users')
    // 'userType' example: ('background', 'profile')
    // 'id' -> the id of the user
    const storageRef =  ref(storage, `images/${base}/${id}/${userType}/${fileName}`);
  
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