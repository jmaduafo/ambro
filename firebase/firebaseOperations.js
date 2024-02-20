import { auth, db } from "./config";
import { doc, collection, query, where, deleteDoc, setDoc, updateDoc, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore";

// SAVED AND UNSAVE RECIPES 
export async function saveThisRecipe(userId, recipeId, isSaved) {
    try {
        const saveRef = doc(db, 'saves', `${userId}-${recipeId}`)

        // If the recipe is already saved, delete the document
        if (isSaved) {
            await deleteDoc(saveRef)
        } else {
            await setDoc(saveRef, {
                user_id: userId,
                recipe_id: recipeId
            })   
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getSaveByUser(userId, recipeId, setSavedCount, setIsSaved) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const saveRef = query(collection(db, 'saves'), where('recipe_id', '==', recipeId))
    
        const unsub = onSnapshot(saveRef, (snap) => {
            // Collect all of the saves of the recipe
            let saved = []
            snap.forEach(doc => {
                saved.push(doc.data())
            })

            // Returns a boolean of true if the searched user is included in array
            const isSaved = saved?.some(save => save.user_id === userId)

            setSavedCount(saved.length)
            setIsSaved(isSaved)

        })
    } catch (err) {
        console.log(err.message)
    }
}

export async function getIsSaved(userId, recipeId, setIsSaved) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const saveRef = query(collection(db, 'saves'), where('recipe_id', '==', recipeId))
    
        const unsub = onSnapshot(saveRef, (snap) => {
            // Collect all of the saves of the recipe
            let saved = []
            snap.forEach(doc => {
                saved.push(doc.data())
            })

            // Returns a boolean of true if the searched user is included in array
            const isSaved = saved?.some(save => save.user_id === userId)

            setIsSaved(isSaved)

        })
    } catch (err) {
        console.log(err.message)
    }
}

// PRIVATE AND UNPRIVATE USER ACCOUNT 
export async function setPrivate(userId, isPrivate) {
    try {
        const privateRef = doc(db, 'users', userId)

        // If account is already private, set private to false
        if (isPrivate) {
            await updateDoc(privateRef, {
                private: false
            })
        } else {
            await updateDoc(privateRef, {
                private: true
            })   
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getPrivateByUser(userId, setIsPrivate) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const userRef = query(collection(db, 'users'), where('id', '==', userId))
    
        const unsub = onSnapshot(userRef, (snap) => {
            // Collect all of the saves of the recipe
            let user;
            snap.forEach(doc => {
                user = doc.data()
            })

            // Returns a boolean of true if the searched user is included in array
            if (user?.private === true) {
                setIsPrivate(true)
            } else {
                setIsPrivate(false)
            }

        })
    } catch (err) {
        console.log(err.message)
    }
}

// LIKE AND UNLIKE REVIEWS
export async function likedReview(userId, reviewId, isLiked) {
    try {
        const likeRef = doc(db, 'reviewLikes', `${userId}-${reviewId}`)

        // If the recipe is already saved, delete the document
        if (isLiked) {
            await deleteDoc(likeRef)
        } else {
            await setDoc(likeRef, {
                user_id: userId,
                review_id: reviewId
            })   
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getLikesByUser(userId, reviewId, setLikedCount, setIsLiked) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const likeRef = query(collection(db, 'reviewLikes'), where('review_id', '==', reviewId))
    
        const unsub = onSnapshot(likeRef, (snap) => {
            // Collect all of the saves of the recipe
            let likes = []
            snap.forEach(doc => {
                likes.push(doc.data())
            })

            // Returns a boolean of true if the searched user is included in array
            const isLiked = likes?.some(like => like.user_id === userId)

            setLikedCount(likes.length)
            setIsLiked(isLiked)

        })
    } catch (err) {
        console.log(err.message)
    }
}

export async function dislikedReview(userId, reviewId, isDisliked) {
    try {
        const dislikeRef = doc(db, 'reviewDislikes', `${userId}-${reviewId}`)

        // If the recipe is already saved, delete the document
        if (isDisliked) {
            await deleteDoc(dislikeRef)
        } else {
            await setDoc(dislikeRef, {
                user_id: userId,
                review_id: reviewId
            })   
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getDislikesByUser(userId, reviewId, setDislikedCount, setIsDisliked) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const likeRef = query(collection(db, 'reviewDislikes'), where('review_id', '==', reviewId))
    
        const unsub = onSnapshot(likeRef, (snap) => {
            // Collect all of the saves of the recipe
            let dislikes = []
            snap.forEach(doc => {
                dislikes.push(doc.data())
            })

            // Returns a boolean of true if the searched user is included in array
            const isDisliked = dislikes?.some(dislike => dislike.user_id === userId)

            setDislikedCount(dislikes.length)
            setIsDisliked(isDisliked)

        })
    } catch (err) {
        console.log(err.message)
    }
}

// ALLOWS USER TO FOLLOW AND UNFOLLOW ON BUTTON CLICK
export async function follow(userId, followId, isFollowed) {
    try {
        const followRef = doc(db, 'followings', `${userId}-${followId}`)

        // If the recipe is already saved, delete the document
        if (isFollowed) {
            await deleteDoc(followRef)
        } else {
            await setDoc(followRef, {
                user_id: userId,
                follow_id: followId
            })   
        }
    } catch (err) {
        console.log(err.message)
    }
}

// FINDS AND COUNTS ALL THE USERS THAT FOLLOWED A SPECIFIC USER AND SETS A BOOLEAN IF 
// CURRENT USER IS FOLLOWING THE PERSON
export async function getFollowsByUser(userId, followId, setFollowedCount, setIsFollowed) {
    try {
        const followRef = query(collection(db, 'followings'), where('follow_id', '==', followId))
    
        const unsub = onSnapshot(followRef, (snap) => {
            // Collect all of the saves of the recipe
            let follows = []
            snap.forEach(doc => {
                follows.push(doc.data())
            })

            // Returns a boolean of true if the searched user is included in array
            const isFollowed = follows?.some(follow => follow.user_id === userId)

            setFollowedCount(follows.length)
            setIsFollowed(isFollowed)

        })
    } catch (err) {
        console.log(err.message)
    }
}

// COUNTS THE NUMBER OF FOLLOWINGS
export async function getFollowingsCount(userId, setFollowingCount) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const followRef = query(collection(db, 'followings'), where('user_id', '==', userId))
    
        const unsub = onSnapshot(followRef, (snap) => {
            // Collect all of the saves of the recipe
            let follows = []
            snap.forEach(doc => {
                follows.push(doc.data())
            })

            setFollowingCount(follows.length)
        })
    } catch (err) {
        console.log(err.message)
    }
}

// COUNTS THE NUMBER OF FOLLOWERS OF A SPECIFIC USER
export async function getFollowersCount(userId, setFollowedCount) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const followRef = query(collection(db, 'followings'), where('follow_id', '==', userId))
    
        const unsub = onSnapshot(followRef, (snap) => {
            // Collect all of the saves of the recipe
            let follows = []
            snap.forEach(doc => {
                follows.push(doc.data())
            })

            setFollowedCount(follows.length)
        })
    } catch (err) {
        console.log(err.message)
    }
}

// GETS ALL THE FOLLOWS
export async function getAllFollows(setFollowedCount) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const followRef = query(collection(db, 'followings'))
    
        const unsub = onSnapshot(followRef, (snap) => {
            // Collect all of the saves of the recipe
            let follows = []
            snap.forEach(doc => {
                follows.push(doc.data())
            })

            setFollowedCount(follows.length)
        })
    } catch (err) {
        console.log(err.message)
    }
}

// RECIPE COUNT FOR A SPECIFIC USER
export async function totalRecipesByUser(userId, setRecipeCount) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const recipeRef = query(collection(db, 'recipes'), where('user_id', '==', userId))
    
        const unsub = onSnapshot(recipeRef, (snap) => {
            // Collect all of the saves of the recipe
            let recipes = []
            snap.forEach(doc => {
                recipes.push(doc.data())
            })

            setRecipeCount(recipes.length)
        })
    } catch (err) {
        console.log(err.message)
    }
}

export async function getAllRecipes(setAllRecipes) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const recipeRef = query(collection(db, 'recipes'))
    
        const unsub = onSnapshot(recipeRef, (snap) => {
            // Collect all of the saves of the recipe
            let recipes = []
            snap.forEach(doc => {
                recipes.push(doc.data())
            })

            setAllRecipes(recipes)
            
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ALL RECIPES CREATED BY A SPECIFIC USER
export async function getAllRecipesByUser(userId, setAllRecipes) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const recipeRef = query(collection(db, 'recipes'), where('user_id', '==', userId))
    
        const unsub = onSnapshot(recipeRef, (snap) => {
            // Collect all of the saves of the recipe
            let recipes = []
            snap.forEach(doc => {
                recipes.push(doc.data())
            })

            setAllRecipes(recipes)
        })
    } catch (err) {
        console.log(err.message)
    }
}

// ALL RECIPES SAVED BY A SPECIFIC USER
export async function getAllSavesByUser(userId, setSavedRecipes) {
    // Get all saves of the user in the saves collection
    try {
        // Find where the recipe id matches the passed in recipe id
        const saveRef = query(collection(db, 'saves'), where('user_id', '==', userId))
    
        const unsub = onSnapshot(saveRef, (snap) => {
            // Collect all of the saves of the recipe
            let saves = []
            snap.forEach(doc => {
                saves.push(doc.data())
            })

            saves?.map(s => {
                const recipeRef = query(collection(db, 'recipes'), where('id', '==', s.recipe_id))

                const unsub = onSnapshot(recipeRef, (snapshot) => {
                    let array = []

                    snapshot.forEach(doc => {
                        array.push(doc.data())
                    })

                    setSavedRecipes(array)
                })

            })
        })
    } catch (err) {
        console.log(err.message)
    }
}

export async function getAllUsers(setAllUsers) {
    try {
        // Find where the recipe id matches the passed in recipe id
        const userRef = query(collection(db, 'users'))
    
        const unsub = onSnapshot(userRef, (snap) => {
            // Collect all of the saves of the recipe
            let users = []
            snap.forEach(doc => {
                users.push(doc.data())
            })

            setAllUsers(users)
            
        })
    } catch (err) {
        console.log(err.message)
    }
}

// CALCULATES THE RATINGS ON FIRST LOAD
export async function getRatingCount(item, setRatingCount, Alert) {
    try {
        const ratingCountRef = query(collection(db, 'reviews'), where('recipe_id', '==', item?.id))

        const unsub  = onSnapshot(ratingCountRef, (snap) => {
            let ratings = []

            snap.forEach(doc => {
                ratings.push(doc.data().rating)
            })

            // ACCUMULATES RATINGS OF ALL USERS
            const totalRatings = ratings?.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
            );

            const totalReviews = ratings?.length 

            // DIVIDE TOTAL SUM OF ALL RATINGS BY THE NUMBER OF REVIEWS TO
            // GET THE AVERAGE
            const averageRating = totalRatings / totalReviews

            setRatingCount(averageRating)
        })
    } catch (err) {
        Alert.alert(err.message)
    }
    
}

// GETS THE NUMBER OF REVIEWS BY ITS RECIPE_ID ON FIRST LOAD
export async function getReviewsCount(item, setReviewCount, Alert) {
    try {
        const reviewCountRef = query(collection(db, 'reviews'), where('recipe_id', '==', item?.id))

        const unsub  = onSnapshot(reviewCountRef, (snap) => {
            let reviews = []

            snap.forEach(doc => {
                reviews.push(doc.data())
            })

            setReviewCount(reviews?.length)
        })
    } catch (err) {
        Alert.alert(err.message)
    }
  }

// ADDS A NEW REVIEW AND ONLY DISPLAYS THE REVIEWS BY THE RECIPE ID
export async function setReview(userReview, rating, item, setUserReview, setRating, Alert) {
    if (userReview.length && item?.id) {
        try {
            const reviewRef = collection(db, 'reviews')
        
            // ADDS THE REVIEW OF THE PERSON CURRENTLY COMMENTING
            const review = await addDoc(reviewRef, {
                reviewText: userReview,
                recipe_id: item?.id,
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

                    setUserReview('')
                    setRating(0)

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

// ADDS A NEW REPLY AND ONLY DISPLAYS THE REVIEWS BY THE RECIPE ID  
export async function setReply(userReply, item, setUserReply, Alert) {
    if (userReply.length && item.id) {
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
  
                      setUserReply('')  
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
