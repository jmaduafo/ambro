import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import generalStyles from '../constant/generalStyles'
import SearchListings from '../components/Search/SearchListings'

const Search = () => {
  return (
    <SafeAreaView style={generalStyles.default}>
      <SearchListings/>
    </SafeAreaView  >
  )
}

export default Search

const styles = StyleSheet.create({
  searchName: {
    fontFamily: 'Boska-'
  }
})