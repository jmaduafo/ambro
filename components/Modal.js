import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../constant/default'

const Modal = ({children}) => {
  return (
    <View style={styles.background}>
      <View style={styles.modal}>
        {children}
      </View>
    </View>
  )
}

export default Modal

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.textColor20,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 100
    },
    modal: {
        backgroundColor: COLORS.backgroundLight,
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowRadius: SHADOW.radius,
        shadowOpacity: SHADOW.opacity,
        padding: 20,
        borderRadius: 20,
        width: '75%'
    }
})