import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'
import pic from '../assets/test.png'

const UserPage = () => {
  return (
    <>
      <View style={styles.top}>
        <ImageBackground
        source={pic}
        resizeMode='cover'
        style={{ width: '100%', height: '100%'}}/>
      </View>
      <View style={styles.bottom}>
        <View style={styles.userIntro}>
          <View style={{ width: 80, height: 80, borderRadius: '50%'}}>
            <Image
              source={pic}
              resizeMode='cover'
              style={{ width: '100%', height: '100%', borderRadius: '50%'}}/>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons}>
              <Text>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>

            <ActivityIndicator size={'small'} color={COLORS.textColor75}/>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default UserPage

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: COLORS.textColorFull,
  },
  bottom: {
    backgroundColor: COLORS.backgroundFull,
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
    flex: 3,
    position: 'relative'
  },
  userIntro: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    position: 'absolute',
    top: -30,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30
  },
  buttons: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: COLORS.textColorFull,
    borderRadius: 15
  },
})