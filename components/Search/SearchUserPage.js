import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserPage from '../UserPage'
import generalStyles from '../../constant/generalStyles'

const SearchUserPage = () => {
  return (
    <View style={generalStyles.default}>
      <UserPage/>
    </View>
  )
}

export default SearchUserPage

const styles = StyleSheet.create({})