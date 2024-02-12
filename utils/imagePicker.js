import * as ImagePicker from 'expo-image-picker';

// Handles profile pic image picker
export const profileImagePicker = async (setImageURI, Alert) => {
  // No permissions request is necessary for launching the image library
  const { status } = await ImagePicker. 
      requestMediaLibraryPermissionsAsync(); 

  if (status !== "granted") { 

      // If permission is denied, show an alert 
      Alert.alert( 
          "Permission Denied", 
          `Sorry, we need camera  
            roll permission to upload images.` 
      ); 
  } else { 

      // Launch the image library and get 
      // the selected image 
      const result = 
          await ImagePicker.launchImageLibraryAsync(); 

      if (!result.canceled) { 
          // Append to images array when image is added
          setImageURI(result.assets[0].uri); 
          // Clear any previous errors 
      } 
  }
};


  // Handles background pic image picker
export const backgroundImagePicker = async (setBackgroundImageURI, Alert) => {
    // No permissions request is necessary for launching the image library
    const { status } = await ImagePicker. 
      requestMediaLibraryPermissionsAsync(); 

  if (status !== "granted") { 

      // If permission is denied, show an alert 
      Alert.alert( 
          "Permission Denied", 
          `Sorry, we need camera  
            roll permission to upload images.` 
      ); 
  } else { 

      // Launch the image library and get 
      // the selected image 
      const result = 
          await ImagePicker.launchImageLibraryAsync(); 

      if (!result.canceled) { 

          // Append to images array when image is added
          setBackgroundImageURI(result.assets[0].uri); 
          // Clear any previous errors 
      } 
  }
  };

