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

export async function follows(userId, followId, isFollowed) {
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

export async function getFollowsByUser(userId, followId, setFollowedCount, setIsFollowed) {
    try {
        // Find where the recipe id matches the passed in recipe id
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

