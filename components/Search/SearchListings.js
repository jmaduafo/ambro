import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import SearchEngine from '../SearchEngine'
import { COLORS } from '../../constant/default'
import Listing from '../Listing'
import pic from '../../assets/icon.png'

const SearchListings = ({ navigation }) => {
  return (
    <>
      <SearchEngine marginTop={20} marginBottom={10} placeholderText={'Search'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Categories</Text>
            <View>
                <Listing name='Beef' image={pic} navigation={navigation} destination='Profile'/>
                <Listing name='Soup' navigation={navigation} destination='Profile'/>
                <Listing name='Corn' navigation={navigation} destination='Profile'/>
            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Recipes</Text>
            <View>
                <Listing name='Tres Leches' image={pic} navigation={navigation} destination='SearchRecipe'/>
                <Listing name='Snickerdoodles' navigation={navigation} destination='SearchRecipe'/>
                <Listing name='Alfredo Pasta' navigation={navigation} destination='SearchRecipe'/>
                <Listing name='Chili Sauce' navigation={navigation} destination='SearchRecipe'/>
            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Users</Text>
            <View>
                <Listing name='jelly45' image={pic} searchType='user' navigation={navigation} destination='SearchUser'/>
                <Listing name='tacotuesday' searchType='user' navigation={navigation} destination='SearchUser'/>
                <Listing name='hallypie' searchType='user' navigation={navigation} destination='SearchUser'/>
            </View>
        </View>      
      </ScrollView>
    </>
    
  )
}

export default SearchListings

const styles = StyleSheet.create({
    searchSection: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 15,
        marginBottom: 15
    },
    searchTitle: {
        fontFamily: 'Satoshi-Medium',
        letterSpacing: -1,
        fontSize: 16,
        color: COLORS.textColorFull,
        marginBottom: 5
    }
})