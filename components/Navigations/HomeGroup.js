import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../../screens/Home'
import HomeViewAll from '../Home/HomeViewAll'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

const HomeStack = createNativeStackNavigator()

const HomeGroup = () => {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name='Home' component={Home} options={{ headerShown: false}}/>
        <HomeStack.Screen name='HomeViewAll' component={HomeViewAll} options={{ headerShown: false}}/>
      </HomeStack.Navigator>
  )
}

export default HomeGroup

const styles = StyleSheet.create({})