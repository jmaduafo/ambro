import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../HeaderTitle";
import CategoryDisplay from "../CategoryDisplay";
import { auth, db } from "../../firebase/config";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { COLORS } from "../../constant/default";
import { useNavigation } from "@react-navigation/native";

const NewRecipes = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [allRecipes, setAllRecipes] = useState(null)

  async function getLatestRecipes() {
    setLoading(true)

    // Order recipes in descending order by the timestamp to get the latest recipes 
    const recipeRef = query(collection(db, "recipes"), orderBy('createdAt', 'desc'), limit(12));

    const unsub = onSnapshot(recipeRef, (snap) => {
      let recipes = []

      snap.forEach(doc => {
        recipes.push(doc.data())
      })

      setAllRecipes(recipes)
    })

    setLoading(false)
  }

  useEffect(function () {
    getLatestRecipes();
  }, []);

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
      {loading || !allRecipes? (
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
                username={item?.user?.username}
                item={item}
                navigate={navigate}
                isApi={false}
                backgroundImage={item.images[0]}
                recipeID={item.id}
              />
            </View>
          )}
          keyExtractor={item => item.id }
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NewRecipes;

const styles = StyleSheet.create({});
