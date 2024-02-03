import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { CameraIcon, ArrowUpOnSquareIcon } from 'react-native-heroicons/outline'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'
import { Button } from 'react-native'
import CameraRoll from './CameraRoll'
import * as ImagePicker from "expo-image-picker";
import Modal from '../Modal'
import { uploadToStorage } from '../../firebase/config'

const AccessCamera = ({ setImagesArray, imagesArray, message, setOnProgress, onProgress }) => {

  const pickImage = async () => {
    if (imagesArray.length < 5) {
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
                  let fullUriAndName = ''

                  const fileName = result.assets[0].uri.split('/').pop()

                  fullUriAndName += fileName + ' ' + result.assets[0].uri
                  
                  // Append to images array when image is added
                  setImagesArray([...imagesArray, fullUriAndName]); 
                  // Clear any previous errors 
              } 
          } 
    }
  };

  const [ permission, requestPermission ] = ImagePicker.useCameraPermissions()

  const takePhoto = async () => {

    if (imagesArray.length < 5) {
      // No permissions request is necessary for launching the image library
          requestPermission()

          if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) { 
    
              // If permission is denied, show an alert 
              Alert.alert( 
                  "Permission Denied", 
                  `Sorry, we need camera  
                   roll permission to capture an image.` 
              ); 
          } else { 
    
              // Launch the image library and get 
              // the selected image 
              const result = 
                  await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    quality: 1
                  }); 
    
              if (!result.canceled) { 
                  let fullUriAndName = ''

                  const fileName = result.assets[0].uri.split('/').pop()

                  fullUriAndName += fileName + ' ' + result.assets[0].uri

                  
                  // Append to images array when image is added
                  setImagesArray([...imagesArray, fullUriAndName]); 
                  // Clear any previous errors 
              } 
          } 
    }
  };

  return (
    <>
    <TouchableOpacity style={[styles.cameraButton, { marginBottom: 10 }]} onPress={takePhoto}>
        <CameraIcon color={COLORS.textColorFull} strokeWidth={1}/>
        <Text style={styles.cameraText}>Take a photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
        <ArrowUpOnSquareIcon color={COLORS.textColorFull} strokeWidth={1}/>
        <Text style={styles.cameraText}>Upload an image</Text>
    </TouchableOpacity>
    {/* <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        ><SafeAreaView>
          <Text>jajadhsjh</Text>
          <Button title='hide' onPress={() => setModalVisible(false)}/>
          </SafeAreaView>
        </Modal> */}
      {
      message && message.length &&
      <View style={{ marginTop: 10}}>
        <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{message}</Text>
      </View>
      }
      {imagesArray.length ? <CameraRoll setImagesArray={setImagesArray} array={imagesArray}/> : <View style={{ marginTop: 20, marginBottom: 20}}><Text style={[generalStyles.defaultParagraph, { textAlign: 'center'}]}>No images selected yet</Text></View>}
    </>
  )
}

export default AccessCamera

const styles = StyleSheet.create({
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: COLORS.textColorFull,
        borderWidth: 1,
        borderRadius: 10
    },
    cameraText: {
        fontFamily: 'Satoshi-Regular',
        fontSize: 16,
        color: COLORS.textColorFull
    }
})