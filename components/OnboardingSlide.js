import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const OnboardingSlide = ({image, title, description}) => {
  return (
    <View style={styles.background}>
        <Image
        source={image}
        style={styles.image}
        resizeMode='contain'
        />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

export default OnboardingSlide

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
        backgroundColor: COLORS.backgroundFull,
        paddingLeft: 40,
        paddingRight: 40
    },
    text: {
        color: COLORS.textColorFull
    },
    image: {
        width: 330,
        height: 400
    },
    title: {
        fontFamily: 'Boska-Medium',
        fontSize: 28,
        color: COLORS.textColorFull,
        marginTop: -10,
        marginBottom: 15,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Satoshi-Regular',
        fontSize: 16,
        color: COLORS.textColorFull,
        textAlign: 'center'
    },
})