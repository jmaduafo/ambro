import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderTitle from '../HeaderTitle'
import CategorySelect from '../CategorySelect'
import axios from 'axios';
import { categories } from '../../utils/popularCategories';

const PopularCategories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   useEffect(function() {
//     setLoading(true)

//     async function getData() {
//       try{
//         const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')

//         if (response && response?.data) {
//           setData(response?.data?.categories)
//           console.log(data)
//         }
//       } catch(err) {
//         console.log(err.message)
//       }
        
//     }

//     getData()

//     setLoading(false)
    
// }, [])

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