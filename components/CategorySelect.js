import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'
import pic from '../assets/adaptive-icon.png'

const CategorySelect = ({category}) => {
  return (
    <View style={styles.rounded}>
      <View style={styles.interior}>
        <Image
        source={pic}
        style={{ width: '70%', height: '70%', borderRadius: 40}}
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
        width: 90,
        height: 150,
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
        width: 85,
        height: 85,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textColorFull 
    },
    text: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColorFull,
        marginTop: 20,
        textAlign: 'center'
    }
})