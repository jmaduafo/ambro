import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecipeDisplay from '../RecipeDisplay'
import generalStyles from '../../constant/generalStyles'
import { useRoute } from '@react-navigation/native'

const HomeRecipeDetail = ({ navigation, route }) => {

  const { item, isApi } = route.params;

  return (
    <View style={generalStyles.default}>
      <RecipeDisplay navigation={navigation} isApi={isApi} item={item}/>
    </View>
  )
}

export default HomeRecipeDetail

const styles = StyleSheet.create({})