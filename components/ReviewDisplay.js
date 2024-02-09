import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { HandThumbUpIcon as HandThumbUpOutline, HandThumbDownIcon as HandThumbDownOutline } from 'react-native-heroicons/outline'
import { HandThumbUpIcon as HandThumbUpSolid, HandThumbDownIcon as HandThumbDownSolid } from 'react-native-heroicons/solid'
import { COLORS } from '../constant/default'
import generalStyles from '../constant/generalStyles'
import { db, auth } from '../firebase/config'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

const ReviewDisplay = ({ item }) => {
    const [ allReviews, setAllReviews ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    
    async function getReviews() {
        try {
            setLoading(true)
            const reviewRef = query(collection(db, 'reviews'), orderBy('createdAt'))
    
            const unsub  = onSnapshot(reviewRef, (snap) => {
                let reviews = []
    
                snap.forEach(doc => {
                    reviews.push(doc.data())
                })
    
                setAllReviews(reviews)
            })
    
            setLoading(false)
        } catch (err) {
            Alert.alert(err.message)
            setLoading(false)
        }
    }

    useEffect(function() {
        getReviews()
    }, [])

  return (
    <ScrollView style={styles.format}>
        {loading ? 
            <View style={{ marginTop: 20 }}>
                <ActivityIndicator size='small' color={COLORS.textColorFull}/>
            </View>
            :
            (allReviews !== null 
                ?
                allReviews?.map(review => {
                if (review.recipe_id === item.id) {
                    return (  
                        <Fragment key={review?.id}>
                            <UserReview reviewCount={reviewCount} name={review?.user?.name} text={review?.reviewText} rating={review?.rating}/>
                        </Fragment>
                    )
                }
                })
                :
                <View style={{ marginTop: 20 }}>
                    <Text>Be the first to write a review</Text>
                </View>
            )
        }
        <View style={{ marginBottom: 20 }}></View>
    </ScrollView>
  )
}

export default ReviewDisplay

function UserReview({ name, rating, text, reviewCount }) {
    const [ isShowMore, setIsShowMore ] = useState()
    const [ reviewText, setReviewText ] = useState(text)
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.profilePic}>

            </View>
            <View>
                <Text style={styles.nameText}>{name}</Text>
                <StarRatingDisplay
                    rating={rating}
                    color={COLORS.textColorFull}
                    starSize={18}
                    starStyle={{ marginRight: 0 }}
                    style={{ marginTop: 5}}
                />
                <View style={{ marginTop: 10, paddingRight: 50}}>
                    {reviewText.length <= 120 ? <Text style={generalStyles.defaultParagraph}>{reviewText}</Text> : isShowMore ? <Text style={generalStyles.defaultParagraph}>{reviewText}</Text> : <Text style={generalStyles.defaultParagraph}>{reviewText.substring(0, 120) + '...'}</Text>}
                </View>
                {reviewText.length > 120 ?
                    isShowMore ?
                    <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={() => setIsShowMore(false)}>
                        <Text style={styles.show}>Show Less</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ width: '100%', padding: 10 }} onPress={() => setIsShowMore(true)}>
                        <Text style={styles.show}>Show More</Text>
                    </TouchableOpacity>
                :
                <View style={{ marginTop: 10 }}></View>
                }
                <View style={styles.thumbsSection}>
                    <ThumbsUp/>
                    <ThumbsDown/>
                </View>
            </View>
        </View>
    )
}

function ThumbsUp() {
    const [ isLiked, setIsLiked ] = useState(false)
    const [ count, setCount] = useState(0)

    return (
        <TouchableOpacity onPress={() => setIsLiked(prev => !prev)}>
            {isLiked ? <HandThumbUpSolid size={18} strokeWidth={1} color={COLORS.textColorFull}/> : <HandThumbUpOutline size={18} strokeWidth={1} color={COLORS.textColorFull}/>}
            <Text style={styles.thumbsText}>0</Text>
        </TouchableOpacity>
    )
}

function ThumbsDown() {
    const [ isDisliked, setIsDisliked ] = useState(false)
    const [ count, setCount] = useState(0)

    return (
        <TouchableOpacity onPress={() => setIsDisliked(prev => !prev)}>
           {isDisliked ? <HandThumbDownSolid size={18} strokeWidth={1} color={COLORS.textColorFull}/> : <HandThumbDownOutline size={18} strokeWidth={1} color={COLORS.textColorFull}/>}
           <Text style={styles.thumbsText}>0</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    format: {
        paddingLeft: 30,
        paddingRight: 30,
        position: 'relative'
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 20,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        backgroundColor: 'gray'
    },
    nameText: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
        fontSize: 15
    },
    show: {
        textAlign: 'center',
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColor75,
    },
    thumbsSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15
    },
    thumbsText: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 3
    }
})