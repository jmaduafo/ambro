import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import generalStyles from "../constant/generalStyles";
import { categories } from "../utils/popularCategories";
import MasonryList from "react-native-masonry-list";
import { COLORS, SHADOW } from "../constant/default";

const ViewAll = ({ type }) => {
  const view = ["for you", "latest", "earliest"];

  const [select, setSelect] = useState("for you");
  const [categoryArray, setCategoryArray] = useState();

  // MASONRY LIST DATA ARRAY
  function categoriesArray() {
    const array = [];
    categories?.forEach((cat) => {
      array.push({
        source: cat.strCategoryThumb,
        dimensions: { width: 1080, height: 1920 },
      });
    });

    setCategoryArray(array);
  }

  useEffect(function () {
    categoriesArray();
  }, []);

  return (
    <>
      {type === "home" ? (
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <FlatList
            data={view}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setSelect(item);
                }}
              >
                <View
                  style={[
                    generalStyles.tagSection,
                    {
                      marginLeft: index === 0 ? 30 : 3,
                      marginRight: index + 1 === view.length ? 30 : 3,
                      shadowColor: select === item ? SHADOW.color : 'transparent',
                        shadowRadius: select === item ? SHADOW.radius : 0,
                        shadowOffset: select === item ? {width: SHADOW.width, height: SHADOW.height} : {width: 0, height: 0},
                        shadowOpacity: select === item ? .2 : 0,
                        backgroundColor:
                          select === item
                            ? COLORS.backgroundFull
                            : COLORS.textColorFull,
                    },
                  ]}
                >
                  <Text
                    style={[
                      generalStyles.tag,
                      {
                        textTransform: "capitalize",
                        color:
                          select === item
                            ? COLORS.textColorFull
                            : COLORS.backgroundFull,
                        fontSize: 14
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10, height: 40 }}></View>}
          />
        </View>
      ) : (
        <View style={styles.padding}>
          <Text style={styles.title}>Alfredo Pasta</Text>
          <Text style={styles.result}>3 results</Text>
        </View>
      )}

      <View style={{ flex: 1, marginTop: 10 }}>
        <MasonryList
          images={categoryArray}
          columns={3}
          backgroundColor={COLORS.backgroundFull}
          imageContainerStyle={{ borderRadius: 5 }}
        />
      </View>
    </>
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
  },
  title: {
    fontFamily: "Satoshi-Medium",
    fontSize: 20,
    color: COLORS.textColorFull,
  },
  result: {
    fontFamily: "Satoshi-Regular",
    fontSize: 13,
    color: COLORS.textColor50,
  },
});
