import { Button, Pressable, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../constant/generalStyles'
import { COLORS, SHADOW } from '../constant/default'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { FireIcon as FireOutline, ChatBubbleOvalLeftEllipsisIcon as CommentIcon, HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import { FireIcon as FireSolid, HeartIcon as HeartSolid, UserIcon } from 'react-native-heroicons/solid'
import HeaderTitle from './HeaderTitle'
import Checkbox from 'expo-checkbox';
import WebView from 'react-native-webview'
import axios from 'axios'
import Cover from './Cover'
import { auth } from '../firebase/config'
import { saveThisRecipe, getSaveByUser, getRatingCount, getReviewsCount, totalRecipesByUser } from '../firebase/firebaseOperations'

const RecipeDisplay = ({ navigation, isApi, item, navigationName, userNavigationName }) => {
    // Receives data from third party API
    const [ apiData, setApiData ] = useState({})
    // Set loading state when getting data from third party API
    const [ loading, setLoading ] = useState(false)

    const [ measurementData, setMeasurementData ] = useState([])
    const [ ingredientsData, setIngredientsData ] = useState([])

    const [ reviewCount, setReviewCount ] = useState(0)
    const [ ratingCount, setRatingCount ] = useState(0)
    const [ recipeCount, setRecipeCount ] = useState(0)

    // RETRIEVES DATA FROM THE THIRD PARTY API
    async function getApiData(id) {
        setLoading(true)

        try{
          const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          const response = await axios.get(url)
  
          if (response) {
            setApiData(response?.data?.meals[0])
            console.log(apiData)

            // if (apiData) {
            //   try {
            //     let measureArray = []
            //     let ingredientArray = []
    
            //     Object.keys(apiData)?.forEach(obj => {
            //       {obj.includes('strMeasure') && apiData[obj]?.length &&  measureArray.push(obj)}
            //       {obj.includes('strIngredient') && apiData[obj]?.length && ingredientArray.push(obj)}
            //     })
    
            //     setIngredientsData(ingredientArray)
            //     setMeasurementData(measureArray)
    
            //   } catch(err) {
            //     Alert.alert(err.message)
            //   }
            // }
          }
          setLoading(false)
        } catch(err) {
          Alert.alert(err.message)
          setLoading(false)
        }
        
    }

    // useEffect(function() {
    //   if (isApi && item?.idMeal) {
        
    //   } else {
    //     totalRecipesByUser(item?.user_id, setRecipeCount)
    //     getReviewsCount(item, setReviewCount, Alert)
    //     getRatingCount(item, setRatingCount, Alert)
    //   } 
    // }, [])

    useMemo(function() {
      if (!isApi) {
        totalRecipesByUser(item?.user_id, setRecipeCount)
        getReviewsCount(item, setReviewCount, Alert)
        getRatingCount(item, setRatingCount, Alert)
      } else {
        getApiData(item?.idMeal)
      }
    }, [isApi, auth, item])

  return (
    <>
      <ScrollView>
        {/* IMAGE CAROUSEL IF FROM FIREBASE BACKEND OR 
        SINGULAR IMAGE SECTION IF FROM THIRD PARTY API*/}
        {isApi && apiData ?
        <View style={[ styles.image ]}>
          <Image
            source={{ uri: apiData?.strMealThumb }}
            style={{ width: '100%', height: '100%'}}
            resizeMode='cover'
            />
        </View>
        :
        <View style={styles.reviewHeartContainer}>
          <View style={[styles.image, { position: 'absolute'}]}>
            <ImageBackground
              source={{ uri: item?.images[0] }}
              style={{ width: '100%', height: '100%'}}
              resizeMode='cover'
            />
          </View>
          <Cover/>
          <View style={{ padding: 10 }}>
            {/* REVIEW/COMMENT ICON */}
            <View>
              <TouchableOpacity style={styles.reviewHeartClick} onPress={() => navigation.navigate(navigationName, {item: item})}>
                <CommentIcon size={36} strokeWidth={.7} color={COLORS.backgroundFull}/>
              </TouchableOpacity>
              <Text style={styles.reviewHeartText}>{reviewCount}</Text>
            </View>
            {/* HEART ICON */}
            <View>
              <HeartClick item={item}/>
            </View>
          </View>
        </View>

        }
        <View style={styles.bottom}>
          {/* IF FIREBASE, DISPLAY RECIPE ITEM FROM BACKEND, AND IF API, DISPLAY RECIPE FROM
          THIRD PARTY API */}
          <View style={styles.recipeCard}>
            {isApi && apiData ? 
            <APIRecipe data={apiData} name={'hello'} description={'hi'}/>
            :
            <UserRecipe recipeCount={recipeCount} rating={ratingCount} navigation={navigation} item={item} userNavigationName={userNavigationName}/>
            } 
          </View>
          {/* RECIPE TAGS */}
          <View style={[generalStyles.rowCenter, { gap: 10, marginTop: 20, flexWrap: 'wrap'}]}>
            {/* COURSE TYPE */}
            {!isApi && item?.courseType &&
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>{item?.courseType}</Text>
            </View>
            }
            {/* CUISINE */}
            {isApi && apiData ?
              <View style={generalStyles.tagSection}>      
                  <Text style={generalStyles.tag}>{apiData?.strArea}</Text>
              </View>
              :
              (
                item?.cuisine?.length ?
                  <View style={generalStyles.tagSection}>      
                    <Text style={generalStyles.tag}>{item?.cuisine}</Text>
                  </View>
                  :
                  null
              )
            }
            {/* CATEGORY */}
            {isApi && apiData && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>{apiData?.strCategory}</Text>
            </View>
            }
            {/* VEGETARIAN */}
            {!isApi && item?.vegetarian &&
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegetarian</Text>
            </View>
            }
            {/* LOW CARB */}
            {!isApi && item?.lowCarb && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Carb</Text>
            </View>
            }
            {/* LOW SODIUM */}
            {!isApi && item?.lowSodium && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Sodium</Text>
            </View>
            }
            {/* VEGAN */}
            {!isApi && item?.vegan && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegan</Text>
            </View>
            }
            {/* DAIRY FREE */}
            {!isApi && item?.dairyFree && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Dairy Free</Text>
            </View>
            }
          </View>
          {/* INGREDIENTS SECTION */}
          <View>
            <HeaderTitle title={'Ingredients'} paddingLeft={0} paddingRight={0}/>
            <View>
              {isApi && apiData && measurementData?.length ?
                measurementData?.map((measure, index) => {
                  if (apiData[measure] !== ' ' || apiData[measure] !== '') {
                    return (
                        <View key={`${measure}${index}`}>
                            <IngredientList measurement={apiData[measure]} ingredient={apiData[`strIngredient${index + 1}`]}/>
                        </View>
                    )
                  }
                })
              :
                item?.ingredientsItems?.map((list, index) => {
                    return (
                        <View key={list}>
                            <IngredientList measurement={item?.ingredientsMeasurements[index]} ingredient={list}/>
                        </View>
                    )
                })
              }
            </View>
          </View>
          {/* LINE BREAK */}
          <View style={[generalStyles.lineBreak, { marginTop: 30, marginBottom: 0}]}></View>
          {/* INSTRUCTIONS SECTION */}
          <View>
            <HeaderTitle title={'Instructions'} paddingLeft={0} paddingRight={0}/>
          </View>
          <View>
            {isApi && apiData ?
              <View>
                  <InstructionList isApi={isApi} instruction={apiData?.strInstructions}/>
              </View>
            :
            item?.instructions?.map((list, index) => {
                return (
                    <View key={list}>
                        <InstructionList index={index} instruction={list} isApi={isApi}/>
                    </View>
                )
            })
            }
          </View>

          {/* IF API AND YOUTUBE SOURCE ISN'T AN EMPTY STRING, THEN DISPLAY YOUTUBE VIDEO */}
          {/* <View>
            {isApi && apiData && 
            <WebView
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled
              style={{ height: 300, width: '100%', borderRadius: 20, marginTop: 10, marginBottom: 20 }}
              source={{
                uri: apiData?.strYoutube,
              }}
              originWhitelist={['*']}
              automaticallyAdjustContentInsets={false}
            />
            } 
          </View> */}
        </View>
      </ScrollView>
    </>
  )
}

export default RecipeDisplay

function HeartClick({ item }) {
  const [ isSaved, setIsSaved] = useState(false)

  const [ savedCount, setSavedCount ] = useState(0)
  
  // SAVES OR UNSAVES RECIPE ON HEART CLICK
  async function saveRecipe() {
    saveThisRecipe(auth?.currentUser?.uid, item?.id, isSaved)  
  }

  // GETS ALL THE SAVED COUNTS AND BOOLEAN BASED ON IF SAVED IS CLICKED OR NOT
  useMemo(function() {
    getSaveByUser(auth?.currentUser?.uid, item?.id, setSavedCount, setIsSaved)
    totalRecipesByUser(item?.user_ID)
  }, [auth, item])

  return (
    <>
      <TouchableOpacity style={[styles.reviewHeartClick, { marginTop: 5}]} onPress={saveRecipe}>
        {isSaved ? <HeartSolid size={36} strokeWidth={1} color={COLORS.backgroundFull}/> : <HeartOutline size={36} strokeWidth={.7} color={COLORS.backgroundFull}/>}
      </TouchableOpacity>
      <Text style={styles.reviewHeartText}>{savedCount}</Text>
    </>
  )
}
// THE RECIPE DISPLAYED FROM THE FIREBASE BACKEND
function UserRecipe({navigation, item, rating, recipeCount, userNavigationName}) {
  
    const info = [
      {
        title: 'duration',
        result: `${item?.duration} mins`
      },
      {
        title: 'difficulty',
        result: item?.difficulty
      },
      {
        title: 'calories',
        result: item?.calories
      },
      {
        title: 'heat',
        result: item?.heatLevel
      },
    ]
  
    // DISPLAYS THE HEAT ICONS DEPENDING ON HOW SPICY THE RECIPE IS
    function fireCount(quantity) {
      if (quantity === 1) {
        return (
          <View style={generalStyles.rowCenter}>
            <FireSolid size={17} color={COLORS.textColorFull} />
            <FireOutline size={17} color={COLORS.textColorFull} />
            <FireOutline size={17} color={COLORS.textColorFull} />
          </View>
        )
      } else if (quantity === 2) {
        return (
          <View style={generalStyles.rowCenter}>
            <FireSolid size={17} color={COLORS.textColorFull} />
            <FireSolid size={17} color={COLORS.textColorFull} />
            <FireOutline size={17} color={COLORS.textColorFull} />
          </View>
        )
      } else if (quantity === 3) {
        return (
          <View style={generalStyles.rowCenter}>
            <FireSolid size={17} color={COLORS.textColorFull} />
            <FireSolid size={17} color={COLORS.textColorFull} />
            <FireSolid size={17} color={COLORS.textColorFull} />
          </View>
        )
      } else {
        return <Text style={styles.recipeInfoResult}>None</Text>
      }
    }

    return (
      <>
        {/* USERNAME WITH PROFILE IMAGE AND NUMBER OF RECIPES BY USER */}
        <View style={[generalStyles.rowCenter, { gap: 10}]}>
          {/* USER PROFILE IMAGE */}
          <Pressable style={[generalStyles.center, styles.userImage]} onPress={() => navigation.navigate(userNavigationName, { user: item?.user})}>
            {item?.user?.profileImage 
            ? 
            <Image
              source={{ uri: item?.user?.profileImage}}
              resizeMode='cover'
              style={{ width: '100%', height: '100%', borderRadius: 100}}
              />
            :
            <UserIcon color={COLORS.backgroundFull}/>}
          </Pressable>
          {/* USERNAME AND NUMBER OF RECIPES POSTED BY USER */}
          <View>
            <Text style={styles.userName}>@{item?.user?.username ? item?.user?.username : ''}</Text>
            <Text style={styles.userRecipeCount}>{recipeCount} recipes</Text>
          </View>
        </View>
        <View style={{ marginTop: 10}}>
          <Text style={styles.recipeTitle}>{item?.recipeName} <Text style={styles.servings}>| {item?.servings} servings</Text></Text>
        </View>
        {/* RATINGS SECTION */}
        <View style={[generalStyles.rowCenter, { gap: 10, marginTop: 5}]}> 
          <StarRatingDisplay
            rating={rating}
            color={isNaN(rating) ? COLORS.textColor60 : COLORS.textColorFull}
            starSize={20}
            style={{ borderRadius: 40 }}
          />
          {isNaN(rating) ? <Text style={styles.noReviews}>No reviews</Text> : <Text style={styles.ratingText}>{rating?.toFixed(1)}</Text>}
        </View>
        {/* DURATION, DIFFICULTY, CALORIES, AND HEAT LEVEL SECTION */}
        <View style={styles.recipeAdditionalInfoSection}>
          {info.map((data, index) => {
            return (
              // Adding a fragment to place the unique key
              <Fragment key={data?.title}>
                <View>
                  <Text style={styles.recipeInfoTitle}>{data?.title}</Text>
                  {index + 1 === info.length ? fireCount(+data?.result) : <Text style={styles.recipeInfoResult}>{data?.result}</Text>}
                </View>
                {index + 1 !== info.length && <View style={styles.separator}></View>}
              </Fragment>
            )
          })}
        </View> 
      </>
    )
  }
  
  // THE RECIPE FOR THE THIRD PARTY API
  function APIRecipe({ name, description}) {
    return (
      <View>
        <Text style={[styles.recipeTitle, { marginBottom: 30}]}>{name}</Text>
        <Text style={generalStyles.defaultParagraph}>
        {description}
        </Text>
      </View>
    )
  }

  // INGREDIENTS CHECKLIST
  function IngredientList({measurement, ingredient}) {
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={[generalStyles.rowCenter, { gap: 10, marginBottom: 5}]}>
            <Checkbox
              style={{ borderRadius: 5}}
              value={isSelected}
              onValueChange={setSelection}
              color={COLORS.textColorFull}
            />
            <Text style={[styles.measurement, { textDecorationLine: isSelected ? 'line-through' : 'none', textDecorationColor: COLORS.textColorFull}]}>{measurement} <Text style={[styles.ingredient]}>{ingredient}</Text></Text>
        </View>
    )
  }

  // INSTRUCTIONS DISPLAY WITH NUMBER AND TEXT
  function InstructionList({index, instruction, isApi}) {
    return (
      <>
      {isApi && instruction.length ? 
        <View style={{ marginBottom: 20}}>
            <Text style={[generalStyles.defaultParagraph, { paddingRight: 30}]}>{instruction}</Text>
        </View>
      :
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 20, marginBottom: 20}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 24/2, backgroundColor: COLORS.textColorFull}}>
                <Text style={[generalStyles.defaultParagraph, { color: COLORS.backgroundFull}]}>{index + 1}</Text>
            </View>
            <Text style={[generalStyles.defaultParagraph, { paddingRight: 30}]}>{instruction}</Text>
        </View>
      }
      </>
    )
  }

const styles = StyleSheet.create({
    reviewHeartContainer: {
      backgroundColor: 'gray',
      width: '100%',
      height: 300,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      position: 'relative'
    },
    reviewHeartText: {
      color: COLORS.backgroundFull,
      fontFamily: 'Satoshi-Medium',
      fontSize: 11,
      textAlign: 'center',
      
    },
    bottom: {
        paddingRight: 30,
        paddingLeft: 30,
        marginTop: 20
      },
      recipeCard: {
        backgroundColor: COLORS.backgroundLight,
        shadowColor: SHADOW.color,
        shadowOffset: { width: SHADOW.offsetWidth, height: SHADOW.offsetHeight},
        shadowRadius: SHADOW.radius,
        shadowOpacity: SHADOW.opacity,
        padding: 20,
        borderRadius: 30
      },
      image: {
        backgroundColor: 'gray',
        width: '100%',
        height: 300
      },
      apiBgImage: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'norepeat',
      },
    //   USER RECIPE COMPONENT STYLING
      userImage: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        backgroundColor: 'black'
      },
      userName: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 13,
        color: COLORS.textColor75
      },
      userRecipeCount: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 11,
        color: COLORS.textColor50
      },
      recipeTitle: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 18,
        color: COLORS.textColorFull
      },
      servings: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColor50,
        fontSize: 13,
      },
      ratingText: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
      },
      noReviews: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColor75,
        fontSize: 13
      },
      recipeAdditionalInfoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 15
      }, 
      recipeInfoTitle: {
        fontFamily: 'Satoshi-Regular',
        color: COLORS.textColor40,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 5
      },
      recipeInfoResult: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
        textAlign: 'center',
        fontSize: 13,
      },
      separator: {
        width: 1,
        height: 30,
        backgroundColor: COLORS.textColor10
      },
    //   INGREDIENTS STYLING
      measurement: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColor50,
      },
      ingredient: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
        textTransform:'lowercase'
      },
})