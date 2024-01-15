import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'

const CategorySelect = ({image, category, setSelectedCategory, selectedCategory}) => {
  return (
    <View style={[styles.rounded, selectedCategory === category && styles.shadow]}>
      <TouchableOpacity onPress={() => {setSelectedCategory(category)}} style={[styles.interior]}>
        <Image
        source={image}
        style={{ width: '50%', height: '50%'}}
        resizeMode='contain'
        />
      </TouchableOpacity>
      <Text style={styles.text}>{category.length > 8 ? category.substring(0, 8) + '...' : category}</Text>
    </View>
  )
}

export default CategorySelect

const styles = StyleSheet.create({
    rounded: {
        borderRadius: 40,
        backgroundColor: COLORS.backgroundLight,
        width: 80,
        height: 130,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 7,
        paddingRight: 7,  
        shadowColor: SHADOW.color,
        shadowOffset: {width: SHADOW.offsetWidth, height: SHADOW.offsetHeight},
        shadowOpacity: 0.05,
        shadowRadius: SHADOW.radius,      
    },
    shadow: {
      shadowOpacity: 0.15
    },
    interior: {
        borderRadius: 40,
        width: 75,
        height: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textColorFull 
    },
    text: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColorFull,
        marginTop: 10,
        textAlign: 'center'
    }
})