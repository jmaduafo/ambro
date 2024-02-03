import { StyleSheet, Text, View, Image, Alert, Pressable } from 'react-native'
import React from 'react'
import Cover from './Cover'
import { COLORS } from '../constant/default'
import { HeartIcon, ClockIcon } from 'react-native-heroicons/outline'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PhotoIcon, UserIcon } from 'react-native-heroicons/solid'

const CategoryDisplay = ({ item, navigate, title, duration, backgroundImage, recipeID, fileNames, profileImage, userFile, userID, username, isApi}) => {

    function handleUserImage() {
        if (userID && userFile) {
            const storage = getStorage();
            const userRef = ref(storage, 'users', userID, 'profileImage', userFile);
    
            // Get the download URL
            getDownloadURL(userRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                return <Image 
                        source={{ uri: url }}
                        resizeMode='cover'
                        style={{ width: '100%', height: '100%', borderRadius: 30 }}
                        />
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                return (
                    <View style={{ width: '100%', height: '100%', borderRadius: 10000, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <UserIcon size={12} color={COLORS.textColorFull}/>
                    </View>
                )
            });
        }
    }

    function handleRecipeImage() {
        if (recipeID && fileNames) {
            const storage = getStorage();
            const recipeRef = ref(storage, 'recipes', recipeID, fileNames[0]);
    
            // Get the download URL
            getDownloadURL(recipeRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                return <Image 
                        source={{ uri: url }}
                        resizeMode='cover'
                        style={{ width: '100%', height: '100%', borderRadius: 30 }}
                        />
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                return (
                    <View style={{ width: '100%', height: '100%', borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <PhotoIcon size={26} color={COLORS.textColorFull}/>
                    </View>
                )
            });
        }
    }
  return (
    <Pressable style={[styles.background]} onPress={() => navigate('HomeRecipeDetail', { item: item, isApi: isApi })}>
        {/* BACKGROUND IMAGE */}
        <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover', zIndex: -1}}>
            {isApi && backgroundImage ? 
            <Image  
                source={{ uri: backgroundImage }}
                resizeMode='cover'
                style={{ width: '100%', height: '100%', borderRadius: 30 }}/>
            :
            handleRecipeImage()
            }
        </View>
        <Cover radius={30}/>
        {/* USER CREDENTIALS WITH USERNAME AND PROFILE PIC */}
        <View style={styles.label}>
            <View style={{ flex: 4 }}>
                {username && username.length && 
                <View style={styles.user}>
                    <View style={{ width: 20, height: 20, borderRadius: 20/2, objectFit: 'cover'}}>
                    {/* USER IMAGE */}
                    {handleUserImage()}
                    </View>
                    <Text style={styles.userText}>{username}</Text>
                </View>
                }
                <Text style={styles.title}>{title && title.length > 23 ? title.substring(0, 23) + '...' : title}</Text>
                {duration &&
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <ClockIcon color={COLORS.backgroundFull} size={14}/>
                    <Text style={styles.duration}>{duration} mins</Text>
                </View>
                }
            </View>
            {/* HEART ICON */}
            <View style={{ flex: 1 }}>
                <HeartIcon color={COLORS.backgroundFull} size={24}/>
            </View>
            
        </View>
    </Pressable>
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