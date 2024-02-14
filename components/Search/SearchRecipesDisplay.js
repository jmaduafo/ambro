import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../../constant/generalStyles'
import { COLORS, SHADOW } from '../../constant/default'
import RecipeDisplay from '../RecipeDisplay'
import { useNavigation } from '@react-navigation/native'

const SearchRecipesDisplay = ({navigation, route}) => {

  const { item } = route.params

  return (
    <View style={generalStyles.default}>
      <RecipeDisplay navigation={navigation} isApi={false} item={item} navigationName={'SearchReviewDisplay'}/>
    </View>
  )
}

export default SearchRecipesDisplay

const styles = StyleSheet.create({
  

})