import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitle from '../HeaderTitle'
import CategorySelect from '../CategorySelect'

const PopularCategories = () => {
  return (
    <View>
      <HeaderTitle title={'popular categories'}/>
      <CategorySelect category={'Vegetarian'}/>
    </View>
  )
}

export default PopularCategories

const styles = StyleSheet.create({})