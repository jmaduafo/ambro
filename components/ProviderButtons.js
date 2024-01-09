import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SHADOW } from '../constant/default'

const ProviderButtons = ({text, image}) => {
  return (
    <View style={styles.button}>
        <Image
        source={image}
        resizeMode='contain'
        style={{ width: 40, height: 40 }}/>
        <Text style={{ fontSize: 14, color: '#404040'}}>{text}</Text>
    </View>
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