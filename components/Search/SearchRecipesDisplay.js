import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import generalStyles from '../../constant/generalStyles'
import { COLORS, SHADOW } from '../../constant/default'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { FireIcon as FireOutline } from 'react-native-heroicons/outline'
import { FireIcon as FireSolid } from 'react-native-heroicons/solid'

const SearchRecipesDisplay = () => {
  return (
    <View style={generalStyles.default}>
      <ScrollView>
        {/* IMAGE CAROUSEL OR SINGULAR IMAGE SECTION */}
        <View>

        </View>
        <View style={styles.bottom}>
          {/* RECIPE INFORMATION OR RECIPE ABOUT SECTION */}
          <View style={styles.recipeCard}>
            <UserRecipe/>
          </View>
          {/* RECIPE TAGS */}
          {/* INGREDIENTS SECTION */}
          {/* LINE BREAK */}
          <View style={[generalStyles.lineBreak, { marginTop: 30, marginBottom: 30}]}></View>
          {/* INSTRUCTIONS SECTION */}

          {/* IF API, THEN DISPLAY YOUTUBE VIDEO */}
          <View></View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SearchRecipesDisplay

// The recipes displayed from the firebase backend
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
        <View style={styles.rowCenter}>
          <FireSolid size={17} color={COLORS.textColorFull} />
          <FireOutline size={17} color={COLORS.textColorFull} />
          <FireOutline size={17} color={COLORS.textColorFull} />
        </View>
      )
    } else if (quantity === 2) {
      return (
        <View style={styles.rowCenter}>
          <FireSolid size={17} color={COLORS.textColorFull} />
          <FireSolid size={17} color={COLORS.textColorFull} />
          <FireOutline size={17} color={COLORS.textColorFull} />
        </View>
      )
    } else if (quantity === 3) {
      return (
        <View style={styles.rowCenter}>
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
      <View style={[styles.rowCenter, { gap: 10}]}>
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
      <View style={[styles.rowCenter, { gap: 10, marginTop: 5}]}>
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
    padding: 15,
    borderRadius: 30
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
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
  }

})