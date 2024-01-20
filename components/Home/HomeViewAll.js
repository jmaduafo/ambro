import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ViewAll from '../ViewAll'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'

const HomeViewAll = () => {
  return (
    <SafeAreaView style={[generalStyles.default, { backgroundColor: COLORS.backgroundLight}]}>
      <ViewAll type='home'/>
    </SafeAreaView>
  )
}

export default HomeViewAll

const styles = StyleSheet.create({})