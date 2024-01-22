import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
    let image;
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      image = result.assets[0].uri;

      return { img: image }
    }
  };


  
