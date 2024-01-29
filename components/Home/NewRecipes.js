import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../HeaderTitle";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import RecipeDisplay from "../RecipeDisplay";
import CategoryDisplay from "../CategoryDisplay";
import { auth, db } from "../../firebase/config";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../../constant/default";

const NewRecipes = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [allRecipes, setAllRecipes] = useState()

  function getLatestRecipes() {
    setLoading(true)
    const recipeRef = query(collection(db, "recipes"), orderBy('createdAt', 'desc'), limit(12));

    async function getRecipes() {
      const recipeSnap = await getDocs(recipeRef);

      let array = [];
      recipeSnap.forEach((doc) => {
        array.push({... doc.data()});
      });

      setAllRecipes(array);
      
    }
    getRecipes();
    setLoading(false)
  }

  useEffect(function () {
    getLatestRecipes();
  }, [allRecipes]);

  if (loading) <ActivityIndicator size={"small"} color={COLORS.textColorFull} />

  return (
    <View style={{ marginBottom: 20}}>
      <HeaderTitle
        title={"latest recipes"}
        select="Latest"
        featured={"no"}
        navigate={navigate}
        paddingLeft={30}
        paddingRight={30}
      />
      {loading || !allRecipes?.length ? (
        <View>
          <ActivityIndicator size={"small"} color={COLORS.textColorFull} />
        </View>
      ) : (
        <FlatList
          data={allRecipes}
          renderItem={({ item, index }) => (
            <View style={{ marginLeft: index === 0 ? 30 : 7, marginRight: index + 1 === allRecipes?.length ? 30 : 7}}>
              <CategoryDisplay 
              title={item.recipeName} 
              duration={item.duration}
              backgroundImage={item.recipeImages[0]}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          horizontal
        
        />
      )}
    </View>
  );
};

export default NewRecipes;

const styles = StyleSheet.create({});
