import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchRecipesDisplay from '../Search/SearchRecipesDisplay';
import SearchListings from '../Search/SearchListings';
import SearchUserPage from '../Search/SearchUserPage';

import {createNativeStackNavigator} from '@react-navigation/native-stack'

const SearchStack = createNativeStackNavigator()

const SearchGroup = () => {
  return (
    <SearchStack.Navigator>
        <SearchStack.Screen name='SearchListings' component={SearchListings} options={{ headerShown: false}}/>
        <SearchStack.Screen name='SearchRecipesDisplay' component={SearchRecipesDisplay} options={{ headerShown: false}}/>
        <SearchStack.Screen name='SearchUserPage' component={SearchUserPage} options={{ headerShown: false}}/>
      </SearchStack.Navigator>
  )
}

export default SearchGroup

const styles = StyleSheet.create({})