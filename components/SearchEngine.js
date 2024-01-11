import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'
import { Ionicons } from '@expo/vector-icons';

const SearchEngine = ({ marginTop, placeholderText }) => {
  return (
    <View style={[ styles.searchSection, { marginTop: marginTop } ]}>
        <TextInput
            placeholder={placeholderText}
            placeholderTextColor={COLORS.textColor50}
            style={styles.searchInput}/>
        <Pressable style={styles.searchButton}>
        <Ionicons name="search-outline" size={24} color={COLORS.textColorFull} />
        </Pressable>
    </View>
  )
}

export default SearchEngine

const styles = StyleSheet.create({
    searchSection: {
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 10 
    },
    searchInput: {
        color: COLORS.textColor75,
        fontFamily: 'Satoshi-Regular',
        backgroundColor: COLORS.backgroundLight,
        padding: 10,
        fontSize: 13,
        borderRadius: 15,
        flex: 5,
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius
    },
    searchButton: {
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 40,
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius
    },
})