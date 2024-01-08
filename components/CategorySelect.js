import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'

const CategorySelect = ({category}) => {
  return (
    <View style={styles.rounded}>
      <View style={styles.interior}>
        <Image
            resizeMode='contain'/>
      </View>
      <Text style={styles.text}>{category.length > 15 ? category.substring(0, 15) + '...' : category}</Text>
    </View>
  )
}

export default CategorySelect

const styles = StyleSheet.create({
    rounded: {
        borderRadius: 40,
        backgroundColor: COLORS.backgroundLight,
        width: 100,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        shadowColor: SHADOW.color,
        shadowOffset: {width: SHADOW.offsetWidth, height: SHADOW.offsetHeight},
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        paddingLeft: 5,
        paddingRight: 5
    },
    interior: {
        borderRadius: 40,
        width: 95,
        height: 95,
        backgroundColor: COLORS.textColorFull 
    },
    text: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColorFull,
        marginTop: 20,
        textAlign: 'center'
    }
})