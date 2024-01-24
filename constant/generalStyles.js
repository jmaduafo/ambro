import { StyleSheet } from 'react-native'
import { COLORS } from "./default"

const generalStyles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: COLORS.backgroundFull
    },
    defaultParagraph: {
        color: COLORS.textColorFull,
        fontFamily: 'Satoshi-Regular'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineBreak: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.textColor10,
    },
    error: {
        padding: 10,
        backgroundColor: 'rgba(255, 0, 0, .5)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ff0000',
        marginBottom: 20
    },
    errorText: {
        color: COLORS.backgroundLight,
        fontFamily: 'Satoshi-Regular',
    },
    loginSignupSection: {
        paddingLeft: 30,
        paddingRight: 30
    },
    loginSignupTitle: {
        paddingTop: 110,
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
        paddingLeft: 10,
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
        color: COLORS.backgroundFull,
    },
    button: {
        backgroundColor: COLORS.textColorFull,
        borderRadius: 40,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonText: {
        fontFamily: 'Satoshi-Regular',
        fontSize: 16,
        color: COLORS.backgroundFull,
        textAlign: 'center'
    },
    //   TAG STYLING
    tagSection: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        backgroundColor: COLORS.textColorFull,
      },
      tag: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.backgroundFull,
        textAlign: 'center',
        fontSize: 12
      },
})

export default generalStyles