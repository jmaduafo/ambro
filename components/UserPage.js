import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { COLORS } from '../constant/default'
import pic from '../assets/test.png'
import { UserIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { HeartIcon, ViewColumnsIcon, EllipsisVerticalIcon, LockClosedIcon } from 'react-native-heroicons/outline'
import { categories } from '../utils/popularCategories'
import MasonryList from 'react-native-masonry-list'
import generalStyles from '../constant/generalStyles'
import { totalRecipesByUser, follow, getFollowingsCount, getAllFollows,
  getFollowsByUser, getAllRecipesByUser, getAllSavesByUser, getPrivateByUser } from '../firebase/firebaseOperations'
import { auth } from '../firebase/config'

const UserPage = ({ navigate, user, type }) => {

  const [ select, setSelect ] = useState('Recipe')
  const [ categoryArray, setCategoryArray ] = useState()

  const [ isFollowed, setIsFollowed ] = useState(false)
  const [ isPrivate, setIsPrivate ] = useState(false)
  
  const [ allFollows, setAllFollows ] = useState(null)

  const [ followersCount, setFollowersCount ] = useState(0)
  const [ followingCount, setFollowingCount ] = useState(0)
  const [ recipeCount, setRecipeCount ] = useState(0)

  const [ allRecipes, setAllRecipes ] = useState(null)
  const [ recipeArray, setRecipeArray ] = useState([])

  const [ allSaves, setAllSaves ] = useState(null)
  const [ savesArray, setSavesArray] = useState([])

  const [ loading, setLoading ] = useState(false)

  useMemo(function() {
    getAllFollows(setAllFollows)
    totalRecipesByUser(user.id, setRecipeCount)
    getPrivateByUser(user.id, setIsPrivate)
    getAllRecipesByUser(user.id, setAllRecipes)
    getAllSavesByUser(user.id, setAllSaves)
  }, [])

  useMemo(function() {
    if (allFollows) {
      getFollowingsCount(user.id, setFollowingCount)
      getFollowsByUser(auth?.currentUser?.uid, user.id, setFollowersCount, setIsFollowed)
    }
  }, [allFollows])
  
  function handleFollow() {
    follow(auth?.currentUser?.uid, user.id, isFollowed)
  }

  // MASONRY LIST DATA ARRAY
  function recipesArray() {
    if (allRecipes) {
      let array = []
      allRecipes?.forEach(recipe => {
        array.push({source: recipe?.images[0], dimensions: { width: 1080, height: 1920 }})
      })

      setRecipeArray(array)
    }
  }

  function saveArray() {
    if (allSaves) {
      let array = []
      allSaves?.forEach(save => {
        array.push({source: save?.images[0], dimensions: { width: 1080, height: 1920 }})
      })

      setSavesArray(array)
    }
  }

  useEffect(function() {
    recipesArray()
    saveArray()
  }, [allSaves, allRecipes])

  return (
    <>
      {/* BACKGROUND IMAGE */}
      <View style={styles.top}>
       {user?.profileBackgroundImage ?
        <ImageBackground
        source={{ uri: user?.profileBackgroundImage }}
        resizeMode='cover'
        style={{ width: '100%', height: '100%'}}/>
        :
        <ImageBackground
        source={pic}
        resizeMode='cover'
        style={{ width: '100%', height: '100%'}}/>
      }
      </View>
      {/* USER INFO WITH USERNAME, PRONOUNS, AND BUTTONS */}
      <View style={styles.bottom}>
          {/* PROFILE IMAGE */}
          <View style={styles.userIntro}>
            <View style={{ flexBasis: '30%'}}>
              <View style={[generalStyles.center, { backgroundColor: COLORS.textColorFull, width: 80, height: 80, borderRadius: 80/2 }]}>
                {user?.profileImage ? 
                <Image
                  source={{ uri: user?.profileImage }}
                  resizeMode='cover'
                  style={{ width: '100%', height: '100%', borderRadius: 100000}}/>
                  :
                  <UserIcon size={36} color={COLORS.backgroundFull}/>
                }
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
            <Text style={styles.followStatsText}><Text style={styles.stat}>{recipeCount}</Text> recipe{recipeCount === 1 ? '' : 's'}</Text>
            <Text style={styles.followStatsText}><Text style={styles.stat}>{followersCount}</Text> follower{followersCount === 1 ? '' : 's'}</Text>
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
                <ViewColumnsIcon size={24} color={select === 'Recipe' ? COLORS.textColorFull : COLORS.textColor40}/>
              </View>
            </Pressable>
            <Pressable style={styles.press} onPress={() => setSelect('Saves')}>
              <View style={styles.selectClick} >
                <HeartIcon size={24} color={select !== 'Recipe' ? COLORS.textColorFull : COLORS.textColor40}/>
              </View>
            </Pressable>
          </View>
          {/* LINE BREAK */}
          <View style={[generalStyles.lineBreak, { marginTop: 10}]}></View>
          {/* MASONRY LIST DISPLAY USER POSTS OR SAVED POSTS */}
          <View style={{ flex: 1}}>
            { loading ?
              <View>
                <ActivityIndicator color={COLORS.textColorFull}/> 
              </View>
              :
              (
                isPrivate && user.id !== auth?.currentUser?.uid && !isFollowed  ?
                <View style={[styles.privateSection, { marginTop: 50 }]}>
                  <View style={[generalStyles.center, { backgroundColor: COLORS.textColorFull, width: 75, height: 75, borderRadius: 1000}]}>
                    <LockClosedIcon size={50} strokeWidth={1} color={COLORS.backgroundFull}/>
                  </View>
                  <Text style={styles.privateText}>Follow this account to see {user?.name}'s recipes</Text>
                </View>
                :
                (
                  !recipeArray.length && select === 'Recipe' ?
                    <View style={[generalStyles.center, { flexDirection: 'column', marginTop: 50}]}>
                      <Text style={styles.createRecipeText}>No recipes created yet</Text>
                      <TouchableOpacity style={[generalStyles.rowCenter, styles.createRecipeButton]}>
                        <PlusCircleIcon size={28} color={COLORS.backgroundFull}/>
                        <Text style={styles.createRecipeButtonText}>Create a Recipe</Text>
                      </TouchableOpacity>
                    </View>
                    : 
                    !savesArray.length && select === 'Saves' ?
                      <View style={[generalStyles.center, { marginTop: 50 }]}>
                        <Text style={styles.createRecipeText}>No recipes saved yet</Text>
                      </View>
                      :
                      select === 'Recipe' ?
                      <MasonryList images={recipeArray} columns={3} backgroundColor={COLORS.backgroundFull} imageContainerStyle={{ borderRadius: 5}}/>
                        :
                      <MasonryList images={savesArray} columns={3} backgroundColor={COLORS.backgroundFull} imageContainerStyle={{ borderRadius: 5}}/>
                    )
                )
            }
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
  },
  privateSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  privateText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColorFull,
    marginTop: 20,
    textAlign: 'center',
    width: '45%'
  },
  createRecipeText: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
    fontSize: 15,
    marginBottom: 10
  },
  createRecipeButton: {
    backgroundColor: COLORS.textColorFull,
    borderRadius: 30,
    padding: 5,
    gap: 15,
    width: '45%'
  },
  createRecipeButtonText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.backgroundFull,
    fontSize: 14
  },
})