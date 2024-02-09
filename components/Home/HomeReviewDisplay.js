import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import ReviewDisplay from "../ReviewDisplay";
import generalStyles from "../../constant/generalStyles";
import { COLORS, SHADOW } from "../../constant/default";
import UserReviewInput from "../UserReviewInput";
import UserReviewReply from "../UserReviewReply";
import { db, auth } from "../../firebase/config";
import { collection, doc, query, where, addDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const HomeReviewDisplay = ({ navigation, route }) => {
  const { item } = route.params;

  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [userReply, setUserReply] = useState("");

  async function setReview() {
    if (userReview.length) {
        try {
            const reviewRef = collection(db, 'reviews')
        
            // ADDS THE REVIEW OF THE PERSON CURRENTLY COMMENTING
            const review = await addDoc(reviewRef, {
                reviewText: userReview,
                recipe_id: item.id,
                user_id: auth?.currentUser?.uid,
                rating: rating,
                createdAt: serverTimestamp()
            })
        
            const findReviewRef = doc(db, 'reviews', review?.id)
            const userRef = query(collection(db, 'users'), where('id', '==', auth?.currentUser?.uid))
        
            const unsub = onSnapshot(userRef, (snapshot) => {
                try {
                    let userInfo;
    
                    snapshot.forEach(doc => {
                        userInfo = doc.data()
                    })
    
                    async function updateReview() {
                        // UPDATES RECENTLY ADDED REVIEW AND ADDS CURRENT USER INFO WITH
                        // THE REVIEW ID
                        await updateDoc(findReviewRef, {
                            user: userInfo,
                            id: review?.id
                        })
                    }
    
                    updateReview()
                    Alert.alert('Review sent successfully!')

                } catch (err) {
                    Alert.alert(err.message)
                }
            })       

        } catch(err) {
            Alert.alert(err.message)
        }
    } else {
        Alert.alert("You cannot send an empty review")
    }

  }

  async function setReply(review_id) {
    if (userReply.length) {
        try {
            const replyRef = collection(db, 'replies')
        
            // ADDS THE REVIEW OF THE PERSON CURRENTLY COMMENTING
            const reply = await addDoc(replyRef, {
                replyText: userReply,
                review_id: review_id,
                user_id: auth?.currentUser?.uid,
                createdAt: serverTimestamp()
            })
        
            const findReviewRef = doc(db, 'replies', reply?.id)
            const userRef = query(collection(db, 'users'), where('id', '==', auth?.currentUser?.uid))
        
            const unsub = onSnapshot(userRef, (snapshot) => {
                try {
                    let userInfo;
    
                    snapshot.forEach(doc => {
                        userInfo = doc.data()
                    })
    
                    async function updateReply() {
                        // UPDATES RECENTLY ADDED REVIEW AND ADDS CURRENT USER INFO WITH
                        // THE REVIEW ID
                        await updateDoc(findReviewRef, {
                            user: userInfo,
                            id: reply?.id
                        })
                    }
    
                    updateReply()
                    Alert.alert('Reply sent successfully!')

                } catch (err) {
                    Alert.alert(err.message)
                }
            })       

        } catch(err) {
            Alert.alert(err.message)
        }
    } else {
        Alert.alert("You cannot send an empty reply")
    }
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
        setReview={setReview}
      />
      {/* <UserReviewReply
        userReply={userReply}
        setUserReply={setUserReply}
      /> */}
      {/* DISPLAY OF ALL THE REVIEWS */}
      <ReviewDisplay navigation={navigation} item={item} />
    </View>
  );
};

export default HomeReviewDisplay;

const styles = StyleSheet.create({
  format: {
    position: "relative"
  }
});
