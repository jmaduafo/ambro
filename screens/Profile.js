import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import UserProfile from '../components/Profile/UserProfile'
import { COLORS } from '../constant/default'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const Profile = ({ props }) => {
  // let item = props.route.params
  const navigation = useNavigation()
  return (
    <View style={styles.background}>
      <UserProfile />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.backgroundFull,
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
})