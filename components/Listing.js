import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constant/default';
import { auth } from '../firebase/config';
import { getFollowsByUser, totalRecipesByUser, getAllFollows } from '../firebase/firebaseOperations';
import generalStyles from '../constant/generalStyles';

const Listing = (props) => {
    const [ isFollowing, setIsFollowing ] = useState(false)
    const [ followCount, setFollowCount ] = useState(0)
    const [ recipeCount, setRecipeCount ] = useState(0)

    const [ allFollows, setAllFollows ] = useState([])

    useEffect(function() {
        getAllFollows(setAllFollows)
    }, [])

    useMemo(function() {
        if (allFollows?.length) {
            getFollowsByUser( auth?.currentUser?.uid, props.id, setFollowCount, setIsFollowing)
        }
    }, [allFollows])

    useMemo(function() {
        if (props.id) {
            totalRecipesByUser(props.id, setRecipeCount)
        }
    }, [props])

  return (
    <View style={styles.background}>
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
            {props.searchType === 'user' ? 
            <View style={[generalStyles.rowCenter, { gap: 5}]}>
                <Text style={styles.text}>{props.name}</Text>
                <Text style={styles.username}>|</Text>
                <Text style={styles.username}>@{props.username}</Text>
            </View>
             : 
             <Text style={[styles.text, { textTransform: 'lowercase'}]}>{props.name}</Text>
            }
            {props.searchType === 'user' ? 
                isFollowing ? 
                <View style={styles.userDisplay}>
                    <Text style={styles.userText}>Following</Text>
                    <Text style={styles.userText}>&#x2022;</Text>
                    <Text style={styles.userText}>{recipeCount} recipes</Text>
                </View> 
                :
                <View>
                    <Text style={styles.userText}>{recipeCount} recipes</Text>
                </View>
            :
            <View></View>
            }
        </View>
      
    </View>
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
        fontSize: 13,
        color: COLORS.textColorFull,
        fontFamily: 'Satoshi-Regular'
    },
    username: {
        fontSize: 11,
        color: COLORS.textColor75,
        fontFamily: 'Satoshi-Regular'
    },
    userDisplay: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginTop: 0
    },
    userText: {
        fontSize: 12,
        color: COLORS.textColor50,
        fontFamily: 'Satoshi-Regular'
    }
})