import { StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Cover = ({ radius }) => {
  return (
    <LinearGradient
    // Background Linear Gradient
    colors={['rgba(0,0,0,0.0)', 'rgba(0, 0, 0, 0.20)']}
    style={[styles.background, { borderRadius: radius }]}
    />
  )
}

export default Cover

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0
    }
})