import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { setReview, setReply } from '../../firebase/firebaseOperations'
import UserReviewInput from '../UserReviewInput'
import ReviewDisplay from '../ReviewDisplay'
import generalStyles from '../../constant/generalStyles'

const SearchReviewDisplay = ({ navigation, route}) => {
    const { item } = route.params;

    const [rating, setRating] = useState(0);
    const [userReview, setUserReview] = useState("");
    const [userReply, setUserReply] = useState("");
  
    async function setNewReview() {
      setReview(userReview, item, setUserReview, setRating, Alert)
    }
  
    async function setNewReply() {
      setReply(userReply, item, setUserReply, Alert)
    }
  
    return (
      <View style={[generalStyles.default, styles.format]}>
        {/* WHERE USER INPUTS THEIR REVIEW AND POST  */}
        <UserReviewInput
          rating={rating}
          setRating={setRating}
          userReview={userReview}
          setUserReview={setUserReview}
          item={item}
          setNewReview={setNewReview}
        />
        {/* <UserReviewReply
          userReply={userReply}
          setUserReply={setUserReply}
        /> */}
        {/* DISPLAY OF ALL THE REVIEWS */}
        <ReviewDisplay navigation={navigation} item={item} />
      </View>
    );
}

export default SearchReviewDisplay

const styles = StyleSheet.create({
    format: {
        position: "relative"
      }
})