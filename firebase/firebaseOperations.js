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

export async function follow() {

}

export async function unfollow() {

}

