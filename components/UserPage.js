import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { COLORS } from '../constant/default'
import pic from '../assets/test.png'
import { HeartIcon, ListBulletIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline'
import { categories } from '../utils/popularCategories'
import MasonryList from 'react-native-masonry-list'
import generalStyles from '../constant/generalStyles'
import { totalRecipesByUser, follow, getFollowingsCount, getAllFollows, getFollowsByUser } from '../firebase/firebaseOperations'
import { auth } from '../firebase/config'

const UserPage = ({ navigate, user, type, allRecipes, allSaves}) => {

  const [ select, setSelect ] = useState('Recipe')
  const [ categoryArray, setCategoryArray ] = useState()

  const [ isFollowed, setIsFollowed ] = useState(false)

  const [ followersCount, setFollowersCount ] = useState(0)
  const [ followingCount, setFollowingCount ] = useState(0)
  const [ recipeCount, setRecipeCount ] = useState(0)

  const [ allFollows, setAllFollows ] = useState(null)

  useEffect(function() {
    getAllFollows(setAllFollows)
  }, [])

  useMemo(function() {
    totalRecipesByUser(user.id, setRecipeCount)

    if (allFollows) {
      getFollowingsCount(user.id, setFollowingCount)
    }

    if (allFollows) {
      getFollowsByUser(auth?.currentUser?.uid, user.id, setFollowersCount, setIsFollowed)
    }
  }, [user])

  
  function handleFollow() {
    follow(auth?.currentUser?.uid, user.id, isFollowed)
  }
  
  useMemo(function() {
  }, [user])

  // MASONRY LIST DATA ARRAY
  function categoriesArray() {
    const array = []
    categories?.forEach(cat => {
      array.push({source: cat.strCategoryThumb, dimensions: { width: 1080, height: 1920 }})
    })

    setCategoryArray(array)
  }

  useEffect(function() {
    categoriesArray()
  }, [])
  return (
    <>
      {/* BACKGROUND IMAGE */}
      <View style={styles.top}>
        {/* <Pressable style={{ paddingLeft: 20, paddingRight: 20, marginTop: 40, zIndex: 20, width: '100%', position: 'absolute', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <EllipsisVerticalIcon color={COLORS.backgroundFull} strokeWidth={1.5}/>
        </Pressable> */}
        {/* <ImageBackground
        source={{ uri: user.profileBackgroundImage ? user.profileBackgroundImage : pic }}
        resizeMode='cover'
        style={{ width: '100%', height: '100%'}}/> */}
      </View>
      {/* USER INFO WITH USERNAME, PRONOUNS, AND BUTTONS */}
      <View style={styles.bottom}>
          {/* PROFILE IMAGE */}
          <View style={styles.userIntro}>
            <View style={{ flexBasis: '30%' }}>
              <View style={{ width: 80, height: 80, borderRadius: 80/2 }}>
                {/* <Image
                  source={{ uri: user.profileImage ? user.profileImage : pic }}
                  resizeMode='cover'
                  style={{ width: '100%', height: '100%', borderRadius: 100000}}/> */}
              </View>
            </View>
            {/* USERNAME, PRONOUNS, BUTTONS */}
            <View style={{ flexBasis: '70%'}}>
            {user.username ? 
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.nameTitle}>{user.name}</Text>
                  <Text style={styles.username}>@{user.username}</Text>
                  {user.pronouns && <Text style={styles.pronouns}>{user.pronouns}</Text>}
                </View>
                {type === 'user' ?
                <View>
                  <Pressable onPress={() => {navigate('Settings')}}>
                    <EllipsisVerticalIcon color={COLORS.textColorFull} strokeWidth={1.5}/>
                  </Pressable>
                </View>
                :
                <View></View>
                }
              </View> :
              <ActivityIndicator color={COLORS.textColorFull}/>
              }
              <View style={styles.buttonsContainer}>
                {/* if 'type' equals 'user', don't show follow button; if null, show follow button */}
                {type !== 'user' ?
                  <TouchableOpacity style={[styles.buttons, {backgroundColor: isFollowed ? COLORS.textColorFull : 'transparent'}]} onPress={handleFollow}>
                    {isFollowed ? <Text style={[styles.buttonsText, { color: COLORS.backgroundFull}]}>Following</Text> : <Text style={styles.buttonsText}>Follow</Text>}
                  </TouchableOpacity>
                  :
                  null}
                {type && type === 'user' ?
                  <TouchableOpacity style={styles.buttons} onPress={() => navigate('Edit Profile')}>
                    <Text style={styles.buttonsText}>Edit Profile</Text>
                  </TouchableOpacity>
                  :
                  null
                }
              </View>
            </View>
          </View>
          {/* FOLLOW AND RECIPES STATS */}
          <View style={styles.followStats}>
            <Text style={styles.followStatsText}><Text style={styles.stat}>{recipeCount}</Text> recipes</Text>
            <Text style={styles.followStatsText}><Text style={styles.stat}>{followersCount}</Text> followers</Text>
            <Text style={styles.followStatsText}><Text style={styles.stat}>{followingCount}</Text> following</Text>
          </View>
          {/* USER BIO */}
          <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20}}>
            <Text style={generalStyles.defaultParagraph}>
              {user.bio ? user.bio : 'No bio yet'}</Text>
          </View>
          {/* LINE BREAK */}
          <View style={[generalStyles.lineBreak, { marginTop: 20}]}></View>
          {/* SELECT USER POSTS OR SAVED POSTS */}
          <View style={styles.selectContainer}>
            <Pressable style={styles.press} onPress={() => setSelect('Recipe')}>
              <View style={styles.selectClick} >
                <Text style={select === 'Recipe' ? styles.selectText : styles.noSelectText}>Recipes</Text>
              </View>
                {select === 'Recipe' && <View style={styles.selectLine}></View>}
            </Pressable>
            <Pressable style={styles.press} onPress={() => setSelect('Saves')}>
              <View style={styles.selectClick} >
                <Text style={select !== 'Recipe' ? styles.selectText : styles.noSelectText}>Saves</Text>
              </View>
              {select !== 'Recipe' && <View style={styles.selectLine}></View>}
            </Pressable>
          </View>
          {/* MASONRY LIST DISPLAY USER POSTS OR SAVED POSTS */}
          <View style={{ flex: 1, marginTop: 10}}>
            <MasonryList images={categoryArray} columns={3} backgroundColor={COLORS.backgroundFull} imageContainerStyle={{ borderRadius: 5}}/>
          </View>
      </View>
    </>
  )
}

export default UserPage

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: COLORS.textColorFull,
  },
  bottom: {
    backgroundColor: COLORS.backgroundFull,
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
    flex: 3,
    position: 'relative'
  },
  userIntro: {
    // width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  nameTitle: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
    marginBottom: 0
  },
  username: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColor75,
    fontSize: 12
  },
  pronouns: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColor75,
    fontSize: 12

  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10
  },
  buttons: {
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderColor: COLORS.textColorFull,
    borderWidth: 1
  },
  buttonsText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColorFull,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    marginTop: 7
  },
  selectText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColorFull,
    letterSpacing: -.5,
    fontSize: 15,
    marginBottom: 3
  },
  noSelectText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColor50,
    letterSpacing: -.5,
    fontSize: 15,
    marginBottom: 3
  },
  selectClick: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  selectLine: {
    width: '30%',
    height: 1.5,
    backgroundColor: COLORS.textColorFull,
    borderRadius: 10,
  },
  press: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  followStatsText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColor50,
    letterSpacing: -.5,
    fontSize: 14,
  },
  stat: {
    color: COLORS.textColor75,
    fontSize: 16,
  }
})