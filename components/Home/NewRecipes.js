import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../HeaderTitle'
import useFetch from '../../hooks/useFetch'
import axios from 'axios';

const NewRecipes = ({ navigate }) => {
  // const url = 'www.themealdb.com/api/json/v1/1/categories.php'

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <View>
      <HeaderTitle title={'latest recipes'} featured={'no'} navigate={navigate} paddingLeft={30} paddingRight={30}/>
    </View>
  )
}

export default NewRecipes

const styles = StyleSheet.create({})