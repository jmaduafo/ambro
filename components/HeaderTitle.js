import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const HeaderTitle = ({title}) => {
  return (
    <View style={styles.position}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
    position: {
        marginBottom: 20,
        marginTop: 40
    },
    text: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 18,
        textTransform: 'capitalize',
        color: COLORS.textColorFull,
        letterSpacing: -1
    }
})