import { Button, Pressable, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { Fragment, useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../constant/generalStyles'
import { COLORS, SHADOW } from '../constant/default'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { FireIcon as FireOutline } from 'react-native-heroicons/outline'
import { FireIcon as FireSolid } from 'react-native-heroicons/solid'
import HeaderTitle from './HeaderTitle'
import Checkbox from 'expo-checkbox';
import WebView from 'react-native-webview'
import axios from 'axios'

const RecipeDisplay = ({ navigation, isApi, item }) => {
    const [ apiData, setApiData] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ measurementData, setMeasurementData ] = useState([])
    const [ ingredientsData, setIngredientsData ] = useState([])
    const [ iFrame, setIFrame] = useState('https://youtu.be/QpfAyQgphgw?si=L5QIYZCqV1ZHIWvG')

    const tags = {
        vegetarian: true,
        lowCarb: true,
        lowSodium: true,
        glutenFree: false,
        vegan: true,
        dairyFree: false
    }
  
    useEffect(function() {
      setLoading(true)
      
      if (isApi) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`

        async function getData() {
          try{
            const response = await axios.get(url)
    
            if (response) {
              setApiData(response?.data?.meals[0])

              console.log(apiData)

              let measureArray = []
              let ingredientArray = []

              Object.keys(apiData).forEach(obj => {
                {obj.includes('strMeasure') && measureArray.push(obj)}
                {obj.includes('strIngredient') && ingredientArray.push(obj)}
              })

              setIngredientsData(ingredientArray)
              setMeasurementData(measureArray)

              console.log(measurementData)
              console.log(ingredientsData)
              
            }
            
            setLoading(false)
          } catch(err) {
            Alert.alert(err.message)
            setLoading(false)
          }

        }
        getData()    
      }

  
    }, [item])

  return (
    <>
      <ScrollView>
        {/* IMAGE CAROUSEL OR SINGULAR IMAGE SECTION */}
        {isApi && apiData ?
        <View style={[ styles.image ]}>
          <Image
            source={{ uri: apiData?.strMealThumb }}
            style={{ width: '100%', height: '100%'}}
            resizeMode='cover'
            />
        </View>
        :
        <View style={{ backgroundColor: 'gray', width: '100%', height: 300}}>

        </View>

        }
        <View style={styles.bottom}>
          {/* IF FIREBASE, RECIPE INFORMATION, AND IF API, RECIPE ABOUT SECTION */}
          <View style={styles.recipeCard}>
            {isApi ? 
            <APIRecipe name={apiData?.strMeal} description={'hi'}/>
            :
            <UserRecipe navigation={navigation}/>
            } 
          </View>
          {/* RECIPE TAGS */}
          <View style={[generalStyles.rowCenter, { gap: 10, marginTop: 20, flexWrap: 'wrap'}]}>
            {/* CUISINE */}
            <View style={generalStyles.tagSection}>      
                {isApi ? <Text style={generalStyles.tag}>{apiData?.strArea}</Text> : <Text style={generalStyles.tag}>Mexican</Text>}
            </View>
            {/* CATEGORY */}
            {isApi && apiData && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>{apiData?.strCategory}</Text>
            </View>
            }
            {/* VEGETARIAN */}
            {!isApi && tags.vegetarian && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegetarian</Text>
            </View>
            }
            {/* LOW CARB */}
            {!isApi && tags.lowCarb && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Carb</Text>
            </View>
            }
            {/* LOW SODIUM */}
            {!isApi && tags.lowSodium && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Sodium</Text>
            </View>
            }
            {/* VEGAN */}
            {!isApi && tags.vegan && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegan</Text>
            </View>
            }
            {/* DAIRY FREE */}
            {!isApi && tags.dairyFree && 
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
                [1, 2, 3, 4, 5, 6].map(list => {
                    return (
                        <View key={list}>
                            <IngredientList measurement={'1 cup'} ingredient={'oranges'}/>
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
            // apiData?.strInstructions?.split()?.map((list, index) => {
            //    return (
              <View>
                  <InstructionList isApi={isApi} instruction={apiData?.strInstructions}/>
              </View>
            //     )
            // })
            :
            [1, 2, 3, 4].map((list, index) => {
                return (
                    <View key={list}>
                        <InstructionList index={index}/>
                    </View>
                )
            })
            }
          </View>

          {/* IF API AND YOUTUBE SOURCE ISN'T AN EMPTY STRING, THEN DISPLAY YOUTUBE VIDEO */}
          <View>
        {isApi && apiData && apiData?.strYoutube?.length && 
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
          
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default RecipeDisplay

// The recipe displayed from the firebase backend
function UserRecipe({navigate}) {
    const info = [
      {
        title: 'duration',
        result: '20 mins'
      },
      {
        title: 'difficulty',
        result: 'Low'
      },
      {
        title: 'calories',
        result: '< 500'
      },
      {
        title: 'heat',
        result: 1
      },
    ]
  
    // Displays the heat icons depending on how spicy the recipe is
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
        <View style={[generalStyles.rowCenter, { gap: 10}]}>
          <Pressable style={styles.userImage} onPress={() => navigate('SearchUserPage')}>

          </Pressable>
          <View>
            <Text style={styles.userName}>@jmaduafo</Text>
            <Text style={styles.userRecipeCount}>34 recipes</Text>
          </View>
        </View>
        <View style={{ marginTop: 10}}>
          <Text style={styles.recipeTitle}>Cranberry Sangria <Text style={styles.servings}>| 3 servings</Text></Text>
        </View>
        <View style={[generalStyles.rowCenter, { gap: 10, marginTop: 5}]}>
          <StarRatingDisplay
            rating={4.6}
            color={COLORS.textColorFull}
            starSize={20}
            style={{ borderRadius: 40 }}
          />
          <Text style={styles.ratingText}>4.1</Text>
        </View>
        <View style={styles.recipeAdditionalInfoSection}>
          {info.map((data, index) => {
            return (
              // Adding a fragment to place the unique key
              <Fragment key={data.title}>
                <View>
                  <Text style={styles.recipeInfoTitle}>{data.title}</Text>
                  {index + 1 === info.length ? fireCount(data.result) : <Text style={styles.recipeInfoResult}>{data.result}</Text>}
                </View>
                {index + 1 !== info.length && <View style={styles.separator}></View>}
              </Fragment>
            )
          })}
        </View>
      </>
    )
  }
  
  // The recipe from the third party API
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

  // Ingredients checklist
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

  // Instructions display with number and text
  function InstructionList({index, instruction, isApi}) {
    const [isSelected, setSelection] = useState(false);

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
      },
})