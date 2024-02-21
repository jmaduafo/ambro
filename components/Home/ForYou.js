import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";

import HeaderTitle from "../HeaderTitle";
import CategoryDisplay from "../CategoryDisplay";

import { auth } from "../../firebase/config";
import { getAllForYou } from "../../firebase/firebaseOperations";
import { COLORS } from "../../constant/default";

const ForYou = ({ navigate }) => {
  const [allForYou, setAllForYou] = useState(null);
  const [loading, setLoading] = useState(false);

  useMemo(
    function () {
      setLoading(true);
      getAllForYou(auth?.currentUser?.uid, setAllForYou);
      setLoading(false);
    },
    [loading]
  );

  return (
    <View>
      <HeaderTitle
        title={"for you"}
        select="For You"
        featured={"no"}
        navigate={navigate}
        paddingLeft={30}
        paddingRight={30}
      />
      {loading || !allForYou ? (
        <View>
          <ActivityIndicator color={COLORS.textColorFull} />
        </View>
      ) : (
        <FlatList
          data={allForYou}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginLeft: index === 0 ? 30 : 7,
                marginRight: index + 1 === allForYou?.length ? 30 : 7,
              }}
            >
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
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ForYou;

const styles = StyleSheet.create({});
