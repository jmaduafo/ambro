import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { SelectList } from "react-native-dropdown-select-list";
import generalStyles from '../../constant/generalStyles';

import { COLORS } from '../../constant/default';
import { measurement, courses, difficulty, heat } from '../../utils/cookingTerms';

const CreateRecipeForm = () => {
  return (
    <View>
      <View>
        <FirstPage/>
      </View>
    </View>
  )
}

export default CreateRecipeForm

function SecondPage() {
  const [selectedVegetarian, setSelectedVegetarian] = useState('true');
  const [selectedLowCarb, setSelectedLowCarb] = useState('true');
  const [selectedLowSodium, setSelectedLowSodium] = useState('true');
  const [selectedGlutenFree, setSelectedGlutenFree] = useState('true');
  const [selectedDairyFree, setSelectedDairyFree] = useState('true');
  const [selectedVegan, setSelectedVegan] = useState('true');

  const radioButtons = [
    {
         // acts as primary key, should be unique and non-empty string
        'label': 'Vegetarian',
        'function': setSelectedVegetarian,
        'value': selectedVegetarian,
    },
    {
        'label': 'Low Carb',
        'function': setSelectedLowCarb,
        'value': selectedLowCarb,
    },
    {
        'label': 'Low Sodium',
        'function': setSelectedLowSodium,
        'value': selectedLowSodium,
    },
    {
        'label': 'Gluten Free',
        'function': setSelectedGlutenFree,
        'value': selectedGlutenFree,
    },
    {
        'label': 'Dairy Free',
        'function': setSelectedDairyFree,
        'value': selectedDairyFree,
    },
    {
        'label': 'Vegan',
        'function': setSelectedVegan,
        'value': selectedVegan,
    },
]
    return (
      <View>
          <Text>Select all that apply</Text>
          <FlatList
            data={radioButtons}
            numColumns={3}
            renderItem={({item, index}) => (
              <View style={{ marginRight: index % 3 === 2 ? 0 : 30}}>
                <Text style={generalStyles.loginSignupLabel}>{item.label}?</Text>
                <RadioButton.Group
                    onValueChange={(value) => item.function(value)}
                    value={item.value}
                  >
                <View style={generalStyles.rowCenter}>
                  <RadioButton value="true" color={COLORS.textColorFull} />
                  <Text style={generalStyles.defaultParagraph}>Yes</Text>
                </View>
                <View style={generalStyles.rowCenter}>
                  <RadioButton value="false" color={COLORS.textColorFull} />
                  <Text style={generalStyles.defaultParagraph}>No</Text>
                </View>
              </RadioButton.Group>
            </View>
            )}
            keyExtractor={(item) => item.label}
            
            />
        </View>
    )
}

function FirstPage() {
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedCourseType, setCourseType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCalories, setSelectedCalories] = useState('');
  const [selectedHeat, setSelectedHeat] = useState(0);
  const [selectedServings, setSelectedServings] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [isRange, setIsRange] = useState(true);



  return (
    <ScrollView>
      <View>
      {/* DURATION */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Duration (in minutes)</Text>
        {/* Only accepts numbers */}
        <TextInput
              onChangeText={text => setSelectedDuration(text.replace(/[^0-9]/g, ''))}
              value={selectedDuration}
              keyboardType='numeric'
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
      </View>
      {/* COURSE TYPE */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Course type</Text>
        <SelectList
            setSelected={(val) => setCourseType(val)}
            data={courses}
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder='Select a course'
            inputStyles={{
              fontFamily: "Satoshi-Regular",
              color: COLORS.textColorFull,
            }}
            boxStyles={{
              borderColor: COLORS.textColorFull,
              backgroundColor: COLORS.backgroundLight,
            }}
          />
      </View>
      {/* LEVEL OF DIFFICULTY */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Level of difficulty</Text>
        <SelectList
            setSelected={(val) => setSelectedDifficulty(val)}
            data={difficulty}
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder='Select a level'
            inputStyles={{
              fontFamily: "Satoshi-Regular",
              color: COLORS.textColorFull,
            }}
            boxStyles={{
              borderColor: COLORS.textColorFull,
              backgroundColor: COLORS.backgroundLight,
            }}
          />
      </View>
      {/* CALORIES RANGE */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Calories</Text>
        <View style={[generalStyles.rowCenter, { justifyContent: 'center', gap: 20, marginBottom: 20 }]}>
          <TouchableOpacity style={generalStyles.tagSection} onPress={() => {setIsRange(true)}}>
            <Text style={generalStyles.tag}>Range</Text>
          </TouchableOpacity>
          <TouchableOpacity style={generalStyles.tagSection} onPress={() => {setIsRange(false)}}>
            <Text style={generalStyles.tag}>Specific</Text>
          </TouchableOpacity>
        </View>
        {isRange ?
          <SelectList
          setSelected={(val) => setSelectedCalories(val)}
          data={heat}
          save="value"
          search={false}
          searchicon={() => <View></View>}
          placeholder='Select a range'
          inputStyles={{
            fontFamily: "Satoshi-Regular",
            color: COLORS.textColorFull,
          }}
          boxStyles={{
            borderColor: COLORS.textColorFull,
            backgroundColor: COLORS.backgroundLight,
          }}
        />
        : 
        <TextInput
              onChangeText={text => setSelectedCalories(text)}
              keyboardType='numeric'
              value={selectedCalories}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          }
      </View>
      {/* HEAT LEVEL FROM 0 TO 3 */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Heat level (0 - 3)</Text>
        {/* Only accepts numbers */}
        <SelectList
            setSelected={(val) => setSelectedHeat(val)}
            data={heat}
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder='Select a heat level'
            inputStyles={{
              fontFamily: "Satoshi-Regular",
              color: COLORS.textColorFull,
            }}
            boxStyles={{
              borderColor: COLORS.textColorFull,
              backgroundColor: COLORS.backgroundLight,
            }}
          />
      </View>
      {/* NUMBER OF SERVINGS */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>How many servings?</Text>
        {/* Only accepts numbers */}
        <TextInput
              onChangeText={text => setSelectedServings(text.replace(/[^0-9]/g, ''))}
              value={selectedServings}
              keyboardType='numeric'
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
      </View>
      {/* CUISINE TYPE (OPTIONAL) */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>Cuisine (optional)</Text>
        <TextInput
              onChangeText={text => setSelectedCuisine(text)}
              value={selectedCuisine}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
      </View>
      {/* RELEVANT CATEGORIES AND TAGS (OPTIONAL) */}

      {/* LINE BREAK */}
      <View style={[generalStyles.lineBreak, {marginTop: 10, marginBottom: 10}]}></View>
      {/* RADIO BUTTONS FOR TRUE OR FALSE SECTION */}      
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({})