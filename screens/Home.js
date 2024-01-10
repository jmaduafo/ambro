import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'
import PopularCategories from '../components/Home/PopularCategories'
import TopDisplay from '../components/Home/TopDisplay'
import NewRecipes from '../components/Home/NewRecipes'
import SearchEngine from '../components/SearchEngine'


const Home = ({navigation}) => {
  return (
    <View style={ styles.background }>
      <SafeAreaView>
        <View style={styles.intro}>
          <View>
            <Text style={[ styles.openingText, { marginTop: 20, marginBottom: -10 } ]}>Good morning,</Text>
            <Text style={ styles.openingText }>Kaycee</Text>
          </View>
          <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.profile}>
            </View>
          </TouchableOpacity>
        </View>
        <SearchEngine marginTop={20} />
      </SafeAreaView>
      <View style={ styles.mainSection }>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <PopularCategories/>
          <TopDisplay/>
          <NewRecipes/>
        </ScrollView>
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
  intro: {
    display: 'flex',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  openingText: {
    fontFamily: 'Boska-Medium',
    fontSize: 36,
    color: COLORS.backgroundFull
  },
  mainSection: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.backgroundFull,
    marginTop: 20,
    padding: 30,
    paddingRight: 0,
    paddingTop: 0,
    flex: 1
  }
})