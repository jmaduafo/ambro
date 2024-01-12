import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../HeaderTitle";
import CategorySelect from "../CategorySelect";
import { categories } from "../../utils/popularCategories";
import axios from "axios";
import CategoryDisplay from "../CategoryDisplay";

const PopularCategories = () => {
  const [ selectedCategory, setSelectedCategory ] = useState('Beef')
  const [categoryDisplay, setCategoryDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`

  useEffect(function() {
    setLoading(true)

    async function getData() {
      try{
        const response = await axios.get(url)

        if (response) {
          setCategoryDisplay(response?.data?.meals)
        }
        
        setLoading(false)
      } catch(err) {
        setError(err.message)
      }
    }

    getData()    
    
}, [selectedCategory])

  return (
    <View style={{ paddingBottom: 10, paddingTop: 40 }}>
      {/* <HeaderTitle title={"popular categories"} /> */}
      
      <View>
        {categories?.length ? (
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              // GIVES A DIFFERENT MARGIN LEFT FOR FIRST ITEM AND DIFF. MARGIN RIGHT FOR LAST ITEM
              <View
              style={{
                marginLeft: index === 0 ? 30 : 7.5,
                marginRight: index + 1 === categories?.length ? 30 : 7.5,
              }}
              >
                <CategorySelect
                  image={item.strCategoryThumb}
                  category={item.strCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </View>
        )}
            keyExtractor={(item) => item.idCategory}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ height: 140 }}></View>}
          />
        ) :
        <View style={{ backgroundColor: 'black'}}></View>}
      </View>
      <View style={styles.display}>
        {categoryDisplay?.length ? (
          <FlatList
            data={categoryDisplay?.slice(0, 12)}
            renderItem={({ item, index }) => (
              <View
              style={{
                marginLeft: index === 0 ? 30 : 7,
                marginRight: index + 1 === 12 ? 30 : 7,
              }}
              >
                <CategoryDisplay
                  title={item.strMeal}
                  backgroundImage={item.strMealThumb}
                />
              </View>
        )}
            keyExtractor={(item) => item.idCategory}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            // ItemSeparatorComponent={() => <View style={{ height: 140 }}></View>}
          />
        ) :
        <View style={{ backgroundColor: 'black'}}></View>}
      </View>
    </View>
  );
};

export default PopularCategories;

const styles = StyleSheet.create({
  display: {
    marginTop: 30
  }
});
