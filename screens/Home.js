import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Root from '../components/Root'
import { COLORS } from '../constant/default'
import PopularCategories from '../components/Home/PopularCategories'
import TopDisplay from '../components/Home/TopDisplay'
import NewRecipes from '../components/Home/NewRecipes'

const Home = () => {
  return (
    <View style={ styles.background }>
      <SafeAreaView style={{ display: 'flex' }}>
        <View style={{ paddingLeft: 30, paddingLeft: 30, paddingTop: 50}}>
          <Text style={[ styles.openingText, { marginBottom: -10 } ]}>Good morning,</Text>
          <Text style={ styles.openingText }>Kaycee</Text>
        </View>
      </SafeAreaView>
      <View style={ styles.mainSection }>
        <PopularCategories/>
        <TopDisplay/>
        <NewRecipes/>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.textColorFull,
    flex: 1
  },
  openingText: {
    fontFamily: 'Boska-Medium',
    fontSize: 36,
    color: COLORS.backgroundFull
  },
  mainSection: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.backgroundFull,
    marginTop: 50,
    padding: 30,
    paddingRight: 0,
    paddingTop: 10,
    flex: 1
  }
})