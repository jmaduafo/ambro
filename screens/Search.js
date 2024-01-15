import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import generalStyles from '../constant/generalStyles'
import SearchListings from '../components/Search/SearchListings'
import SearchUserPage from '../components/Search/SearchUserPage'
import { COLORS } from '../constant/default'
import { StatusBar } from 'expo-status-bar';

const Search = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundLight}}>
      {/* Pass navigation to components to access navigation properties */}
      <SearchListings navigation={navigation}/>
      {/* <SearchUserPage navigation={navigation}/> */}
    </SafeAreaView  >
  )
}

export default Search

const styles = StyleSheet.create({
  searchName: {
    
  }
})