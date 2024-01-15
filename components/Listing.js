import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constant/default';

const Listing = ({navigation, ...props}) => {
  
  return (
    <Pressable style={styles.background} onPress={() => navigation.navigate(props.destination)}>
        {props.image ? 
        <View style={styles.searchImage}>
            <Image
                source={props.image}
                resizeMode='contain'
                style={{width: '100%', height: '100%', borderRadius: 10}}
            />
        </View>
        :
        props.searchType === 'user' ?
        <View style={styles.searchAlt}>
            <AntDesign name="user" size={24} color={COLORS.backgroundFull}/>
        </View>
        :
        <View style={styles.searchAlt}>
            <Ionicons name="search-outline" size={24} color={COLORS.backgroundFull}/>
        </View>
        }
        <View>
            <Text style={styles.text}>{props.searchType === 'user' ? props.name : props.name.toLowerCase()}</Text>
            {props.searchType === 'user' && 
            <View style={styles.userDisplay}>
                <Text style={styles.userText}>Following</Text>
                <Text style={styles.userText}>&#x2022;</Text>
                <Text style={styles.userText}>32 recipes</Text>
            </View>}
        </View>
      
    </Pressable>
  )
}

export default Listing

const styles = StyleSheet.create({
    background: {
        // backgroundColor: COLORS.backgroundLight,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 5,
        // borderColor: COLORS.textColor40,
        // borderWidth: 1
    },
    searchImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        objectFit: 'cover',
    },
    searchAlt: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textColorFull,
        width: 40,
        height: 40,
        borderRadius: '50%'
    },
    text: {
        fontSize: 14,
        color: COLORS.textColorFull,
        fontFamily: 'Satoshi-Regular'
    },
    userDisplay: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        marginTop: 0
    },
    userText: {
        fontSize: 12,
        color: COLORS.textColor50,
        fontFamily: 'Satoshi-Regular'
    }
})