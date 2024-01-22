import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AccessCamera from '../components/Create/AccessCamera'
import CreateRecipeForm from '../components/Create/CreateRecipeForm'
import { COLORS } from '../constant/default'
import CameraRoll from '../components/Create/CameraRoll'
import generalStyles from '../constant/generalStyles'
import Modal from '../components/Modal'

const Create = () => {
  
  return (
    <View style={[generalStyles.default, { position: 'relative'}]}>
      {/* <Modal>
        <Text>Hi</Text>
      </Modal> */}
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.view}>
          <AccessCamera/>
          <CameraRoll/>
          <View style={[generalStyles.lineBreak, { marginTop: 10, marginBottom: 10}]}></View>
          <CreateRecipeForm />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.backgroundLight
    },
    view: {
      paddingLeft: 30,
      paddingRight: 30
    }
})