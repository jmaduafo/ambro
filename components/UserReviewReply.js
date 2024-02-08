import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import { COLORS, SHADOW } from '../constant/default'
import generalStyles from '../constant/generalStyles'

const UserReviewReply = ({ userReply, setUserReply }) => {
  return (
    <View style={styles.userReview}>
        <View style={styles.inputSection}>
            <TextInput
                onChangeText={text => setUserReply(text)}
                value={userReply}
                placeholder={'Reply'}
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

export default UserReviewReply

const styles = StyleSheet.create({
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
        gap: 10,
    },
    input: {
        fontFamily: 'Satoshi-Regular',
        flexBasis: '90%',
        // backgroundColor: 'blue'
    },
    send: {
        flexBasis: '10%',
        // backgroundColor: 'red'
    },
    sendButton: {
        width: 25,
        height: 25,
        backgroundColor: COLORS.textColorFull,
        borderRadius: 20
    }
})