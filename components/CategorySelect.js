import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'

const CategorySelect = ({image, category, setSelectedCategory}) => {
  return (
    <View style={styles.rounded}>
      <TouchableOpacity onPress={() => {setSelectedCategory(category)}} style={styles.interior}>
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
        shadowColor: SHADOW.color,
        shadowOffset: {width: SHADOW.offsetWidth, height: SHADOW.offsetHeight},
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        paddingLeft: 7,
        paddingRight: 7,        
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