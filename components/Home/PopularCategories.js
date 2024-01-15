import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../HeaderTitle";
import CategorySelect from "../CategorySelect";
import { categories } from "../../utils/popularCategories";
import axios from "axios";
import CategoryDisplay from "../CategoryDisplay";
import { COLORS } from "../../constant/default";

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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='small' color={COLORS.textColor75}/>
        </View>
        }
      </View>
      <View style={styles.display}>
        {categoryDisplay?.length && !loading ? (
          <FlatList
            data={categoryDisplay}
            renderItem={({ item, index }) => (
              <View
              style={{
                marginLeft: index === 0 ? 30 : 7,
                marginRight: index + 1 === categoryDisplay?.length ? 30 : 7,
              }}
              >
                <CategoryDisplay
                  title={item.strMeal}
                  backgroundImage={item.strMealThumb}
                />
              </View>
        )}
            keyExtractor={(item) => item.idMeal}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            // ItemSeparatorComponent={() => <View style={{ height: 140 }}></View>}
          />
        ) :
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='small' color={COLORS.textColor75}/>
        </View>
        }
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
