import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const OnboardingSlide = ({image, title, description}) => {
  return (
    <View style={styles.background}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View>
            <View style={styles.image}>
                <Image
                source={image}
                style={{ width: '100%', height: '100%'}}
                resizeMode='contain'
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    </View>
  )
}

export default OnboardingSlide

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.backgroundFull,
        paddingBottom: 100,
        paddingLeft: 40,
        paddingRight: 40
    },
    text: {
        color: COLORS.textColorFull
    },
    image: {
        width: 330,
        height: 400,
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