import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../HeaderTitle'
import useFetch from '../../hooks/useFetch'
import axios from 'axios';

const NewRecipes = () => {
  // const url = 'www.themealdb.com/api/json/v1/1/categories.php'

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   useEffect(function() {
//     setLoading(true)

//     async function getData() {
//       try{
//         const response = await axios.get('www.themealdb.com/api/json/v1/1/random.php')

//         if (response && response.data) {
//           setData(response.data)
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
    <View>
      <HeaderTitle title={'latest recipes'} featured={'no'}/>
    </View>
  )
}

export default NewRecipes

const styles = StyleSheet.create({})