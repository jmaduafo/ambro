import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ViewAll from '../ViewAll'
import generalStyles from '../../constant/generalStyles'
import { COLORS } from '../../constant/default'

const SearchViewAll = () => {
  return (
    <SafeAreaView style={[generalStyles.default, { backgroundColor: COLORS.backgroundLight}]}>
      <ViewAll/>
    </SafeAreaView>
  )
}

export default SearchViewAll

const styles = StyleSheet.create({
    
})