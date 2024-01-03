import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const OnboardingButton = ({text}) => {
  return (
    <Text style={styles.customizeText}>{text}</Text>
  )
}

export default OnboardingButton

const styles = StyleSheet.create({
    customizeText: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColorFull,
        fontSize: 16,
        marginTop: 10
    }
})