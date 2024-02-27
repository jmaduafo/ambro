import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserPage from '../UserPage'
import { useNavigation } from '@react-navigation/native'
import generalStyles from '../../constant/generalStyles'
import { auth } from '../../firebase/config'

const HomeUserPage = ({ route }) => {

    const { user } = route.params
    const { navigate } = useNavigation()

  return (
    <View style={generalStyles.default}>
      <UserPage navigate={navigate} type={user?.id === auth?.currentUser?.uid && 'user'} user={user}/>
    </View>
  )
}

export default HomeUserPage

const styles = StyleSheet.create({})