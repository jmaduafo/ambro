import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Cover from './Cover'
import { COLORS } from '../constant/default'
import { HeartIcon, ClockIcon } from 'react-native-heroicons/outline'

const CategoryDisplay = ({ title, duration, backgroundImage, profileImage, username}) => {
  return (
    <View style={[styles.background]}>
        <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover', zIndex: -1}}>
            <Image 
            source={{ uri: backgroundImage }}
            resizeMode='cover'
            style={{ width: '100%', height: '100%', borderRadius: 30 }}/>
        </View>
      <Cover radius={30}/>
      <View style={styles.label}>
        <View style={{ flex: 4 }}>
            {username && username.length && 
            <View style={styles.user}>
                <View style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover'}}>
                <Image 
                    source={{ uri: profileImage }}
                    resizeMode='contain'
                    style={{ width: '100%', height: '100%'}}/>
                </View>
                <Text style={styles.userText}>{username}</Text>
            </View>
            }
            <Text style={styles.title}>{title && title.length > 23 ? title.substring(0, 23) + '...' : title}</Text>
            {duration &&
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <ClockIcon color={COLORS.backgroundFull} size={14}/>
                <Text style={styles.duration}>{duration}</Text>
            </View>
            }
        </View>
        <View style={{ flex: 1 }}>
            <HeartIcon color={COLORS.backgroundFull} size={24}/>
        </View>
        
      </View>
    </View>
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