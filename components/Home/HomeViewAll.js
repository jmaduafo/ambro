import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ViewAll from '../ViewAll'
import { COLORS } from '../../constant/default'
import generalStyles from '../../constant/generalStyles'
import { useRoute } from '@react-navigation/native'
const HomeViewAll = () => {
    const route = useRoute()
    const { params } = route

  return (
    <SafeAreaView style={[generalStyles.default]}>
      <ViewAll type='home' />
    </SafeAreaView>
  )
}

export default HomeViewAll

const styles = StyleSheet.create({})