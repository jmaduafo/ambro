import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const Login = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: COLORS.backgroundFull
    }
})