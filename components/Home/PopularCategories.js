import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderTitle from '../HeaderTitle'
import CategorySelect from '../CategorySelect'
import axios from 'axios';
import { categories } from '../../utils/popularCategories';

const PopularCategories = () => {

  return (
    <View style={{ paddingBottom: 10 }}>
      <HeaderTitle title={'popular categories'}/>
      {
        categories?.length && 
        <FlatList
        data={categories}
        renderItem={({item}) => <CategorySelect image={item.strCategoryThumb} category={item.strCategory}/>}
        keyExtractor={item => item.idCategory}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={() => <View style={{ height: 140 }}></View>}
        />
      }
    </View>
  )
}

export default PopularCategories

const styles = StyleSheet.create({})