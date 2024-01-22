import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { CameraIcon } from 'react-native-heroicons/outline'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'
import { Button } from 'react-native'

const AccessCamera = () => {
  const [ modalVisible, setModalVisible ] = useState(false)
  return (
    <>
    <TouchableOpacity style={styles.cameraButton}>
        <CameraIcon color={COLORS.textColorFull} strokeWidth={1}/>
        <Text style={styles.cameraText}>Camera</Text>
    </TouchableOpacity>
    <Button title='show' onPress={() => setModalVisible(true)}/>
    <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        ><SafeAreaView>
          <Text>jajadhsjh</Text>
          <Button title='hide' onPress={() => setModalVisible(false)}/>
          </SafeAreaView>
        </Modal>
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