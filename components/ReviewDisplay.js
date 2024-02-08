import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { HandThumbUpIcon as HandThumbUpOutline, HandThumbDownIcon as HandThumbDownOutline } from 'react-native-heroicons/outline'
import { HandThumbUpIcon as HandThumbUpSolid, HandThumbDownIcon as HandThumbDownSolid } from 'react-native-heroicons/solid'
import { COLORS } from '../constant/default'
import generalStyles from '../constant/generalStyles'

const ReviewDisplay = ({item}) => {
  return (
    <ScrollView style={styles.format}>
      <UserReview/>
    </ScrollView>
  )
}

export default ReviewDisplay

function UserReview() {
    const [ isShowMore, setIsShowMore ] = useState()
    const [ reviewText, setReviewText ] = useState('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem')
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.profilePic}>

            </View>
            <View>
                <Text style={styles.nameText}>Johnny</Text>
                <StarRatingDisplay
                    rating={3.5}
                    color={COLORS.textColorFull}
                    starSize={18}
                    starStyle={{ marginRight: 0 }}
                    style={{ marginTop: 5}}
                />
                <View style={{ marginTop: 10}}>
                    {reviewText.length <= 120 ? <Text style={generalStyles.defaultParagraph}>{reviewText}</Text> : isShowMore ? <Text style={generalStyles.defaultParagraph}>{reviewText}</Text> : <Text style={generalStyles.defaultParagraph}>{reviewText.substring(0, 120) + '...'}</Text>}
                </View>
                {reviewText.length > 120 &&
                isShowMore ?
                <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsShowMore(false)}>
                    <Text style={styles.show}>Show Less</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsShowMore(true)}>
                    <Text style={styles.show}>Show More</Text>
                </TouchableOpacity>
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
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        position: 'relative'
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20
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