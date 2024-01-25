import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { CameraIcon } from 'react-native-heroicons/outline'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'
import { Button } from 'react-native'
import CameraRoll from './CameraRoll'
import * as ImagePicker from "expo-image-picker";

const AccessCamera = ({ setImagesArray, imagesArray }) => {

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
    
                  // Append to images array when image is added
                  setImagesArray([...imagesArray, result.assets[0].uri]); 
                  // Clear any previous errors 
              } 
          } 
    }
  };

  return (
    <>
    <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
        <CameraIcon color={COLORS.textColorFull} strokeWidth={1}/>
        <Text style={styles.cameraText}>Add an image</Text>
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