import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import StarRating from 'react-native-star-rating-widget'
import { COLORS, SHADOW } from '../constant/default'
import generalStyles from '../constant/generalStyles'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'


const UserReviewInput = ({ rating, setRating, userReview, setUserReview}) => {
  return (
    <View style={styles.userReview}>
        <Text style={styles.topText}>Rate this recipe</Text>
        <View style={[generalStyles.center, { gap: 20}]}>
            <StarRating
                rating={rating}
                onChange={setRating}
                starSize={26}
                color={COLORS.textColorFull}
                starStyle={{ marginRight: 0}}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
            />
            <Text>{rating.toFixed(1)}</Text>
        </View>
        <View style={styles.inputSection}>
            <TextInput
                onChangeText={text => setUserReview(text)}
                value={userReview}
                placeholder={'Write a review'}
                placeholderTextColor={COLORS.textColor50}
                style={styles.input}
                multiline
                editable
            />
            <TouchableOpacity style={[styles.send, { flexDirection: 'row', justifyContent: 'flex-end'}]}>
                <View style={[generalStyles.center, styles.sendButton]}>
                    <PaperAirplaneIcon size={16} color={COLORS.backgroundFull}/>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default UserReviewInput

const styles = StyleSheet.create({
    topText: {
        fontFamily: 'Satoshi-Regular',
        textAlign: 'center',
        marginBottom: 5
    },
    userReview: {
        position: "fixed",
        padding: 30,
        paddingTop: 20,
        paddingBottom: 20,
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        backgroundColor: COLORS.backgroundLight,
    },
    inputSection: {
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight },
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 30,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10
    },
    input: {
        fontFamily: 'Satoshi-Regular',
        flexBasis: '90%',
    },
    send: {
        flexBasis: '10%',
    },
    sendButton: {
        width: 25,
        height: 25,
        backgroundColor: COLORS.textColorFull,
        borderRadius: 20
    }
})