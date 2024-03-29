import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import {
  HandThumbUpIcon as HandThumbUpOutline,
  HandThumbDownIcon as HandThumbDownOutline,
} from "react-native-heroicons/outline";

import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
  UserIcon,
} from "react-native-heroicons/solid";

import { timestampToDate, timeAgo } from "../utils/convertToDate";
import { COLORS } from "../constant/default";
import generalStyles from "../constant/generalStyles";
import { db, auth } from "../firebase/config";
import { onSnapshot, collection, query, orderBy, getDoc, doc } from "firebase/firestore";

import {
  likedReview,
  getLikesByUser,
  dislikedReview,
  getDislikesByUser,
} from "../firebase/firebaseOperations";

const ReviewDisplay = ({ item }) => {
  const [ allReviews, setAllReviews ] = useState(null);
  const [ recipeID, setRecipeID ] = useState(null)
  const [ recipeCreator, setRecipeCreator ] = useState(null)
  const [loading, setLoading] = useState(false);

  async function getReviews() {
    try {
      setLoading(true);
      const reviewRef = query(collection(db, "reviews"), orderBy("createdAt"));

      const unsub = onSnapshot(reviewRef, (snap) => {
        let reviews = [];

        snap.forEach((doc) => {
        // ONLY PUSH THE REVIEWS WHERE THE RECIPE ID MATCHES THE ITEM ID
          doc.data().recipe_id === item.id && reviews.push(doc.data());
        });
        
        setRecipeID(reviews[0]?.recipe_id)
        setAllReviews(reviews);
      });

      setLoading(false);
    } catch (err) {
      Alert.alert(err.message);
      setLoading(false);
    }
  }

  async function getRecipeCreator() {
    try {
        setLoading(true);
        const recipeRef = doc(db, "recipes", recipeID);
        const recipeSnap = await getDoc(recipeRef)
        
        setRecipeCreator(recipeSnap.data()?.user_id)

        setLoading(false);
    } catch (err) {
        Alert.alert(err.message);
        setLoading(false);
    }
  }

  useEffect(function () {
    getReviews();
  }, []);

  useEffect(function () {
    if (recipeID) {
        getRecipeCreator();
    }
  }, [recipeID]);

  return (
    <ScrollView style={styles.format}>
      {loading ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="small" color={COLORS.textColorFull} />
        </View>
      ) : allReviews && allReviews?.length ? (
            allReviews?.map((review) => {
            return (
                <Fragment key={review?.id}>
                    <UserReview
                        creator={recipeCreator}
                        userId={review?.user_id}
                        image={review?.user?.profileImage}
                        id={review?.id}
                        name={review?.user?.name}
                        text={review?.reviewText}
                        rating={review?.rating}
                        time={review?.createdAt}
                    />
                </Fragment>
            );
            })
            ) : (
            <View style={{ marginTop: 10 }}>
                <Text
                    style={[
                    generalStyles.defaultParagraph,
                    { textAlign: "center", color: COLORS.textColor75 },
                    ]}
                >
                    Be the first to write a review
                </Text>
            </View>
        )}
      <View style={{ marginBottom: 20 }}></View>
    </ScrollView>
  );
};

export default ReviewDisplay;

function UserReview({ creator, image, name, rating, text, id, userId, time }) {
  const [isShowMore, setIsShowMore] = useState();
  const [reviewText, setReviewText] = useState(text);
  return (
    <View style={styles.reviewContainer}>
      <View style={[generalStyles.center, styles.profilePic]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%", borderRadius: 1000 }}
            resizeMode="cover"
          />
        ) : (
          <UserIcon size={20} color={COLORS.backgroundFull} />
        )}
      </View>
      <View>
        {/* EVALUATE IF THE REVIEW SENT WAS WRITTEN BY THE RECIPE CREATOR */}
        {creator === userId ? (
            <View style={[ generalStyles.rowCenter, { gap: 10 }]}>
                <View style={[generalStyles.rowCenter, { gap: 5 }]}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={[styles.nameText, { fontSize: 11, color: COLORS.textColor60 }]}>&#x2022;</Text>
                    <Text style={[styles.nameText, { fontSize: 11, color: COLORS.textColor60, fontFamily: 'Satoshi-Italic' }]}>Chef</Text>
                </View>
                <View>
                    {time ? 
                    <Text style={[styles.nameText, { fontSize: 11, color: COLORS.textColor60}]}>{timeAgo(time?.seconds)}</Text>
                    :
                    null
                    }
                </View>
            </View>
        ) : (
            <View style={[generalStyles.rowCenter, { gap: 10 }]}>
                <Text style={styles.nameText}>{name}</Text>
                {time ? 
                    <Text style={[styles.nameText, { fontSize: 11, color: COLORS.textColor60}]}>{timeAgo(time?.seconds)}</Text>
                    :
                    null
                }
            </View>
                            
        )}
        <StarRatingDisplay
          rating={rating}
          color={COLORS.textColorFull}
          starSize={14}
          starStyle={{ marginRight: 0 }}
          style={{ marginTop: 2 }}
        />
        <View style={{ marginTop: 5, width: 270 }}>
          {/* SHOWS THE ENTIRE TEXT IF THE TEXT LENGTH IS LESS THAN OR EQUAL TO 120;
                    IF GREATER THAN 120, EITHER SHOW A PORTION OF THE TEXT IF 'SHOW MORE' IS NOT CLICKED OR
                    SHOW THE ENTIRE TEXT IF 'SHOW MORE' IS CLICKED */}
          {reviewText.length <= 120 ? (
            <Text
              style={[
                generalStyles.defaultParagraph,
                { fontSize: 13, width: "100%" },
              ]}
            >
              {reviewText}
            </Text>
          ) : isShowMore ? (
            <Text
              style={[
                generalStyles.defaultParagraph,
                { fontSize: 13, width: "100%" },
              ]}
            >
              {reviewText}
            </Text>
          ) : (
            <Text
              style={[
                generalStyles.defaultParagraph,
                { fontSize: 13, width: "100%" },
              ]}
            >
              {reviewText.substring(0, 120) + "..."}
            </Text>
          )}
        </View>
        {/* EVALUATES IF THE SHOW MORE BUTTON SHOULD BE VISIBLE
                DEPENDING ON THE LENGTH OF THE TEXT */}
        {reviewText.length > 120 ? (
          isShowMore ? (
            <TouchableOpacity
              style={{ width: "100%", padding: 10 }}
              onPress={() => setIsShowMore(false)}
            >
              <Text style={styles.show}>Show Less</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ width: "100%", padding: 10 }}
              onPress={() => setIsShowMore(true)}
            >
              <Text style={styles.show}>Show More</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={{ marginTop: 10 }}></View>
        )}
        <View style={styles.thumbsSection}>
          <ThumbsUp id={id} />
          <ThumbsDown id={id} />
        </View>
      </View>
    </View>
  );
}

function ThumbsUp({ id }) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  function likeReview() {
    likedReview(auth?.currentUser?.uid, id, isLiked);
  }

  useMemo(
    function () {
      getLikesByUser(auth?.currentUser?.uid, id, setCount, setIsLiked);
    },
    [id]
  );

  return (
    <TouchableOpacity onPress={likeReview}>
      {isLiked ? (
        <HandThumbUpSolid
          size={16}
          strokeWidth={1}
          color={COLORS.textColorFull}
        />
      ) : (
        <HandThumbUpOutline
          size={16}
          strokeWidth={1}
          color={COLORS.textColorFull}
        />
      )}
      <Text style={styles.thumbsText}>{count}</Text>
    </TouchableOpacity>
  );
}

function ThumbsDown({ id }) {
  const [isDisliked, setIsDisliked] = useState(false);
  const [count, setCount] = useState(0);

  function dislikeReview() {
    dislikedReview(auth?.currentUser?.uid, id, isDisliked);
  }

  useMemo(
    function () {
      getDislikesByUser(auth?.currentUser?.uid, id, setCount, setIsDisliked);
    },
    [id]
  );

  return (
    <TouchableOpacity onPress={dislikeReview}>
      {isDisliked ? (
        <HandThumbDownSolid
          size={16}
          strokeWidth={1}
          color={COLORS.textColorFull}
        />
      ) : (
        <HandThumbDownOutline
          size={16}
          strokeWidth={1}
          color={COLORS.textColorFull}
        />
      )}
      <Text style={styles.thumbsText}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  format: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    position: "relative",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
    marginTop: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: COLORS.textColorFull,
  },
  nameText: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
    fontSize: 13,
  },
  show: {
    textAlign: "center",
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColor75,
  },
  thumbsSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  thumbsText: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
    fontSize: 11,
    textAlign: "center",
    marginTop: 3,
  },
});
