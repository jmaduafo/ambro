import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import SearchEngine from '../SearchEngine'
import { COLORS } from '../../constant/default'
import Listing from '../Listing'
import pic from '../../assets/icon.png'
import { useNavigation } from '@react-navigation/native';

const SearchListings = () => {
    const { navigate } = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundLight}}>
      <SearchEngine marginTop={20} marginBottom={10} placeholderText={'Search'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Categories</Text>
            <View>
                <Pressable onPress={() => navigate('SearchRecipesDisplay')}>
                    <Listing name='Beef' image={pic} />
                </Pressable>
                <Listing name='Soup'/>
                <Listing name='Corn'/>
            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Recipes</Text>
            <View>
                <Listing name='Tres Leches' image={pic} />
                <Listing name='Snickerdoodles'/>
                <Listing name='Alfredo Pasta'/>
                <Listing name='Chili Sauce'/>
            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Users</Text>
            <View>
                <Listing name='jelly45' image={pic} searchType='user'/>
                <Listing name='tacotuesday' searchType='user'/>
                <Listing name='hallypie' searchType='user'/>
            </View>
        </View>      
      </ScrollView>
    </SafeAreaView>
    
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