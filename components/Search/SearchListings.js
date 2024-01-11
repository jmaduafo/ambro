import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import SearchEngine from '../SearchEngine'
import { COLORS } from '../../constant/default'

const SearchListings = () => {
  return (
    <>
      <SearchEngine marginTop={20} placeholderText={'Search'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Categories</Text>
            <View>

            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Recipes</Text>
            <View>

            </View>
        </View>
        <View style={styles.searchSection}>
            <Text style={styles.searchTitle}>Users</Text>
            <View>

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
        marginTop: 20
    },
    searchTitle: {
        fontFamily: 'Satoshi-Medium',
        letterSpacing: -1,
        fontSize: 16,
        color: COLORS.textColorFull
    }
})