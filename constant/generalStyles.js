import { StyleSheet } from 'react-native'
import { COLORS } from "./default"

const generalStyles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#FFEED9'
    },
    loginSignupSection: {
        paddingLeft: 30,
        paddingRight: 30
    },
    loginSignupTitle: {
        paddingTop: 160,
        marginBottom: 80,
        fontFamily: 'Boska-Medium',
        fontSize: 26,
        color: COLORS.textColorFull
    },
    loginSignupInputSection: {
        marginBottom: 15
    },
    loginSignupLabel: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColorFull,
        fontSize: 14,
        marginBottom: 10
    },
    loginSignupInput: {
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 10,
        borderColor: COLORS.textColorFull,
        borderWidth: 1,
        color: COLORS.textColor75,
        fontFamily: 'Satoshi-Regular',
        fontSize: 13,
        padding: 15,
        paddingTop: 8,
        paddingBottom: 8
    },
    loginSignupBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    loginSignUpButton: {
        backgroundColor: COLORS.textColorFull,
        borderRadius: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 40
    },
    loginSignupBottomText: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColor75,
        fontSize: 14
    },
    loginSignUpButtonText: {
        fontFamily: 'Satoshi-Regular',
        fontSize: 16,
        color: COLORS.backgroundFull
    }
})

export default generalStyles