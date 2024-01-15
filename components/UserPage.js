import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constant/default'
import pic from '../assets/test.png'
import { HeartIcon, ListBulletIcon, EllipsisVerticalIcon } from 'react-native-heroicons/outline'
import { categories } from '../utils/popularCategories'
import MasonryList from 'react-native-masonry-list'
import generalStyles from '../constant/generalStyles'

const UserPage = ({ username, pronouns, bio, type, numberOfRecipes, numberOfFollowers, numberOfFollowing}) => {

  const [ select, setSelect ] = useState('Recipe')
  const [ categoryArray, setCategoryArray ] = useState()

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
      <View style={styles.top}>
        {/* <Pressable style={{ paddingLeft: 20, paddingRight: 20, marginTop: 40, zIndex: 20, width: '100%', position: 'absolute', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <EllipsisVerticalIcon color={COLORS.backgroundFull} strokeWidth={1.5}/>
        </Pressable> */}
        <ImageBackground
        source={pic}
        resizeMode='cover'
        style={{ width: '100%', height: '100%'}}/>
      </View>
      <View style={styles.bottom}>
        <ScrollView>
          {/* USER INFO WITH USERNAME, PRONOUNS, AND BUTTONS */}
          <View style={styles.userIntro}>
            <View style={{ flexBasis: '30%' }}>
              <View style={{ width: 80, height: 80, borderRadius: '50%'}}>
                <Image
                  source={pic}
                  resizeMode='cover'
                  style={{ width: '100%', height: '100%', borderRadius: '50%'}}/>
              </View>
            </View>
            <View style={{ flexBasis: '70%'}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.nameTitle}>kaycee</Text>
                  <Text style={styles.pronouns}>she/her/hers</Text>
                </View>
                <View>
                  <Pressable onPress={() => {}}>
                    <EllipsisVerticalIcon color={COLORS.textColorFull} strokeWidth={1.5}/>
                  </Pressable>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                {/* if 'type' equals 'user', don't show follow button; if null, show follow button */}
                {type && type === 'user' && <TouchableOpacity style={styles.buttons}>
                  <Text style={styles.buttonsText}>Follow</Text>
                </TouchableOpacity>}
                <TouchableOpacity style={styles.buttons}>
                  <Text style={styles.buttonsText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.followStats}>
            <Text style={styles.followStatsText}><Text style={styles.stat}>93</Text> recipes</Text>
            <Text style={styles.followStatsText}><Text style={styles.stat}>2.1K</Text> followers</Text>
            <Text style={styles.followStatsText}><Text style={styles.stat}>12</Text> following</Text>
          </View>
          <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20}}>
            <Text style={generalStyles.defaultParagraph}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis.</Text>
          </View>
          {/* LINE BREAK */}
          <View style={styles.lineBreak}></View>
          {/* SELECT USER POSTS OR SAVED POSTS */}
          <View style={styles.selectContainer}>
            <Pressable style={styles.press} onPress={() => setSelect('Recipe')}>
              <View style={styles.selectClick} >
                {/* <ListBulletIcon color={COLORS.textColorFull} size={16} strokeWidth={1}/> */}
                <Text style={select === 'Recipe' ? styles.selectText : styles.noSelectText}>Recipes</Text>
              </View>
                {select === 'Recipe' && <View style={styles.selectLine}></View>}
            </Pressable>
            <Pressable style={styles.press} onPress={() => setSelect('Saves')}>
              <View style={styles.selectClick} >
                {/* <HeartIcon fill={COLORS.textColorFull} size={18} color={COLORS.textColorFull} strokeWidth={1}/> */}
                <Text style={select !== 'Recipe' ? styles.selectText : styles.noSelectText}>Saves</Text>
              </View>
              {select !== 'Recipe' && <View style={styles.selectLine}></View>}
            </Pressable>
          </View>
          {/* DISPLAY USER POSTS OR SAVED POSTS */}
          <View style={{ marginTop: 10}}>
            <MasonryList images={categoryArray} rerender={true} columns={3}/>
          </View>
        </ScrollView>
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
    backgroundColor: COLORS.backgroundLight,
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
    // position: 'absolute',
    // top: -30,
    // flexDirection: 'row',
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  nameTitle: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
    marginBottom: 0
  },
  pronouns: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColor75,
    marginBottom: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 40
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
    fontSize: 16,
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
  lineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.textColor20,
    marginTop: 20
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