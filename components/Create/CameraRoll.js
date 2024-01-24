import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'

const CameraRoll = ({ setImagesArray, array }) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 10}}>
      <Text style={[generalStyles.defaultParagraph, { marginBottom: 10}]}>{array ? array.length : 0} / 5 image{array.length === 1 ? '' : 's'}</Text>
      <FlatList
        data={array}
        renderItem={({item, index}) => (
          <CameraImageArray setImagesArray={setImagesArray} array={array} image={item}/>
        )}
        horizontal
        keyExtractor={item => item}
        ItemSeparatorComponent={() => <View style={{ width: 20}}></View>}
        />

    </View>
  )
}

export default CameraRoll

function CameraImageArray({ setImagesArray, array, image }) {

  function isCanceled() {
    const newArray = array.filter(imageId => imageId !== image)
    setImagesArray(newArray)
  }

  return (
    <View style={styles.imageContainer}>
      <View style={styles.image}>
        <Image
          source={{ uri: image }}
          resizeMode='cover'
          style={{ width: '100%', height: '100%', borderRadius: 10}}
          />
      </View>
      <TouchableOpacity onPress={isCanceled}>
        <XCircleIcon size={20} color={COLORS.textColorFull}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10
  },
  image: {
    width: 120,
    height: 220,
    objectFit: 'cover',
    borderRadius: 10
  }
})