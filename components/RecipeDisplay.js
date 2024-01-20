import { Button, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../constant/generalStyles'
import { COLORS, SHADOW } from '../constant/default'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { FireIcon as FireOutline } from 'react-native-heroicons/outline'
import { FireIcon as FireSolid } from 'react-native-heroicons/solid'
import HeaderTitle from './HeaderTitle'
import Checkbox from 'expo-checkbox';
import WebView from 'react-native-webview'

const RecipeDisplay = () => {
    const iframeString = 'https://youtu.be/QpfAyQgphgw?si=L5QIYZCqV1ZHIWvG'
    const tags = {
        vegetarian: true,
        lowCarb: true,
        lowSodium: true,
        glutenFree: false,
        vegan: true,
        dairyFree: false
    }

  return (
    <>
      <ScrollView>
        {/* IMAGE CAROUSEL OR SINGULAR IMAGE SECTION */}
        <View style={{ backgroundColor: 'gray', width: '100%', height: 300}}>

        </View>
        <View style={styles.bottom}>
          {/* IF FIREBASE, RECIPE INFORMATION, OR IF API, RECIPE ABOUT SECTION */}
          <View style={styles.recipeCard}>
            <UserRecipe/>
          </View>
          {/* RECIPE TAGS */}
          <View style={[generalStyles.rowCenter, { gap: 10, marginTop: 20, flexWrap: 'wrap'}]}>
            {/* CUISINE */}
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Mexican</Text>
            </View>
            {/* VEGETARIAN */}
            {tags.vegetarian && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegetarian</Text>
            </View>
            }
            {/* LOW CARB */}
            {tags.lowCarb && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Carb</Text>
            </View>
            }
            {/* LOW SODIUM */}
            {tags.lowSodium && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Low Sodium</Text>
            </View>
            }
            {/* VEGAN */}
            {tags.vegan && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Vegan</Text>
            </View>
            }
            {/* DAIRY FREE */}
            {tags.dairyFree && 
            <View style={generalStyles.tagSection}>      
                <Text style={generalStyles.tag}>Dairy Free</Text>
            </View>
            }
          </View>
          {/* INGREDIENTS SECTION */}
          <View>
            <HeaderTitle title={'Ingredients'} paddingLeft={0} paddingRight={0}/>
            <View>
                {[1, 2, 3, 4, 5, 6].map(list => {
                    return (
                        <View key={list}>
                            <IngredientList measurement={'1 cup'} ingredient={'oranges'}/>
                        </View>
                    )
                })}
            </View>
          </View>
          {/* LINE BREAK */}
          <View style={[generalStyles.lineBreak, { marginTop: 30, marginBottom: 0}]}></View>
          {/* INSTRUCTIONS SECTION */}
          <View>
            <HeaderTitle title={'Instructions'} paddingLeft={0} paddingRight={0}/>
          </View>
          <View>
            {[1, 2, 3, 4].map((list, index) => {
                return (
                    <View key={list}>
                        <InstructionList index={index}/>
                    </View>
                )
            })}
          </View>

          {/* IF API, THEN DISPLAY YOUTUBE VIDEO */}
          <View>
            
        <WebView
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled
          style={{ height: 300, width: '100%', borderRadius: 20, marginTop: 10, marginBottom: 20 }}
          source={{
            uri: iframeString,
          }}
          automaticallyAdjustContentInsets={false}
        />
          
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default RecipeDisplay

// The recipe displayed from the firebase backend
function UserRecipe() {
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
          <View style={styles.userImage}>

          </View>
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
        <Text style={[styles.recipeTitle, { marginBottom: 30}]}>Cranberry Sangria</Text>
        <Text style={generalStyles.defaultParagraph}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.
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
            <Text style={styles.measurement}>{measurement} <Text style={styles.ingredient}>{ingredient}</Text></Text>
        </View>
    )
  }

  // Instructions display with number and text
  function InstructionList({index, instruction}) {
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 20, marginBottom: 20}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 24/2, backgroundColor: COLORS.textColorFull}}>
                <Text style={[generalStyles.defaultParagraph, { color: COLORS.backgroundFull}]}>{index + 1}</Text>
            </View>
            <Text style={[generalStyles.defaultParagraph, { paddingRight: 30}]}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</Text>
        </View>
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