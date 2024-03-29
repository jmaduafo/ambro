import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { SHADOW } from '../constant/default'

const ProviderButtons = ({text, image, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Image
        source={image}
        resizeMode='contain'
        style={{ width: 30, height: 30 }}/>
        <Text style={{ fontSize: 14, color: '#404040'}}>{text}</Text>
    </Pressable>
  )
}

export default ProviderButtons

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        padding: 10
    }

})