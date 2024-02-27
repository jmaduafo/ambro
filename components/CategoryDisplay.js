import { StyleSheet, Text, View, Image, Alert, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import Cover from './Cover'
import { COLORS } from '../constant/default'
import { HeartIcon as OutlineHeart, ClockIcon } from 'react-native-heroicons/outline'
import { UserIcon, HeartIcon as SolidHeart } from 'react-native-heroicons/solid'
import { saveThisRecipe, getIsSaved } from '../firebase/firebaseOperations'
import { auth } from '../firebase/config'
import ExpoFastImage from 'expo-fast-image'

const CategoryDisplay = ({ item, navigate, title, duration, backgroundImage, recipeID, isApi}) => {
    return (        
    <Pressable style={[styles.background]} onPress={() => navigate('HomeRecipeDetail', { item: item, isApi: isApi })}>
        {/* BACKGROUND IMAGE */}
        <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover', zIndex: -1}}>
            {/* <ExpoFastImage  
                uri={backgroundImage}
                cacheKey={isApi ? title : recipeID}
                style={{ width: '100%', height: '100%', borderRadius: 30 }}/> */}
            <Image  
                source={{ uri: backgroundImage}}
                resizeMode='cover'
                style={{ width: '100%', height: '100%', borderRadius: 30 }}/>
        </View>
        <Cover radius={30}/>
        <View style={styles.label}>
            <View style={{ flex: 4 }}>
                <Text style={styles.title}>{title && title.length > 23 ? title.substring(0, 23) + '...' : title}</Text>
                {duration &&
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <ClockIcon color={COLORS.backgroundFull} size={14}/>
                    <Text style={styles.duration}>{duration} mins</Text>
                </View>
                }
            </View>
            {/* HEART ICON */}
            {
                !isApi ?
                    <SaveRecipe recipeID={recipeID}/>
                    :
                    null
            }
        </View>
    </Pressable>
  )
}

function SaveRecipe(recipeID) {
    const [ isSaved, setIsSaved ] = useState(false)

    useMemo(function() {
        getIsSaved(auth?.currentUser?.uid, recipeID?.recipeID, setIsSaved)
    }, [])

    function saveRecipe() {
        saveThisRecipe(auth?.currentUser?.uid, recipeID?.recipeID, isSaved)
    }
    
    return (
        <TouchableOpacity onPress={saveRecipe}>
            {isSaved ? <SolidHeart color={COLORS.backgroundFull} size={24}/> : <OutlineHeart strokeWidth={1.5} color={COLORS.backgroundFull} size={24}/>}
        </TouchableOpacity>
    )
}

export default CategoryDisplay

const styles = StyleSheet.create({
    background: {
        width: 180,
        height: 280,
        borderRadius: 30,
        backgroundColor: COLORS.textColor20,
        display: 'flex',
        flexDirection: 'row',
        backgroundPosition: 'center',
        backgroundRepeat: 'norepeat',
        backgroundSize: 'cover'
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    userText: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.backgroundFull,
        fontSize: 13
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 5,
        width: '100%',
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.backgroundFull,
        fontSize: 15
    },
    duration: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.backgroundFull,
        fontSize: 12
    }
})