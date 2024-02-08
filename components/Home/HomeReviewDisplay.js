import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import ReviewDisplay from "../ReviewDisplay";
import generalStyles from "../../constant/generalStyles";
import { COLORS, SHADOW } from "../../constant/default";
import UserReviewInput from "../UserReviewInput";
import UserReviewReply from "../UserReviewReply";

const HomeReviewDisplay = ({ navigation, route }) => {
  const { item } = route.params;

  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  return (
    <View style={[generalStyles.default, styles.format]}>
      {/* WHERE USER INPUTS THEIR REVIEW AND POST  */}
      <UserReviewInput
        rating={rating}
        setRating={setRating}
        userReview={userReview}
        setUserReview={setUserReview}
      />
      {/* <UserReviewReply
        userReply={userReview}
        setUserReply={setUserReview}
      /> */}
      {/* DISPLAY OF ALL THE REVIEWS */}
      <ReviewDisplay navigation={navigation}  />
    </View>
  );
};

export default HomeReviewDisplay;

const styles = StyleSheet.create({
  format: {
    position: "relative"
  }
});
