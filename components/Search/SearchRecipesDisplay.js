import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../../constant/generalStyles'
import { COLORS, SHADOW } from '../../constant/default'
import RecipeDisplay from '../RecipeDisplay'

const SearchRecipesDisplay = () => {
  return (
    <View style={generalStyles.default}>
      <RecipeDisplay/>
    </View>
  )
}

export default SearchRecipesDisplay

const styles = StyleSheet.create({
  

})