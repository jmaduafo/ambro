import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../HeaderTitle";
import CategorySelect from "../CategorySelect";
import axios from "axios";
import { categories } from "../../utils/popularCategories";

const PopularCategories = () => {
  return (
    <View style={{ paddingBottom: 10, paddingTop: 40 }}>
      {/* <HeaderTitle title={"popular categories"} /> */}
      <View style={{ }}>
        {categories?.length && (
          <>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <>
                {/* ADD SPECIFIC MARGINS DEPENDING ON THE INDEX */}
                <View style={{ marginLeft: index === 0 ? 30 : 7.5, marginRight: index + 1 === categories?.length ? 30 : 7.5}}>
                  <CategorySelect
                    image={item.strCategoryThumb}
                    category={item.strCategory}
                  />
                </View>
              </>
            )}
            keyExtractor={(item) => item.idCategory}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ height: 140 }}></View>}
          />
          </>
        )}
      </View>
    </View>
  );
};

export default PopularCategories;

const styles = StyleSheet.create({});
