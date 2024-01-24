import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useMemo, useState } from "react";
import { RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import generalStyles from "../../constant/generalStyles";

import { COLORS } from "../../constant/default";
import {
  measurement,
  courses,
  difficulty,
  heat,
} from "../../utils/cookingTerms";
import { XCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const CreateRecipeForm = () => {
  
  return (
    <View>
      <View>
        <FirstPage
         
        />
      </View>
    </View>
  );
};

export default CreateRecipeForm;

function SecondPage() {
  const [selectedVegetarian, setSelectedVegetarian] = useState("true");
  const [selectedLowCarb, setSelectedLowCarb] = useState("true");
  const [selectedLowSodium, setSelectedLowSodium] = useState("true");
  const [selectedGlutenFree, setSelectedGlutenFree] = useState("true");
  const [selectedDairyFree, setSelectedDairyFree] = useState("true");
  const [selectedVegan, setSelectedVegan] = useState("true");

  const radioButtons = [
    {
      // acts as primary key, should be unique and non-empty string
      label: "Vegetarian",
      function: setSelectedVegetarian,
      value: selectedVegetarian,
    },
    {
      label: "Low Carb",
      function: setSelectedLowCarb,
      value: selectedLowCarb,
    },
    {
      label: "Low Sodium",
      function: setSelectedLowSodium,
      value: selectedLowSodium,
    },
    {
      label: "Gluten Free",
      function: setSelectedGlutenFree,
      value: selectedGlutenFree,
    },
    {
      label: "Dairy Free",
      function: setSelectedDairyFree,
      value: selectedDairyFree,
    },
    {
      label: "Vegan",
      function: setSelectedVegan,
      value: selectedVegan,
    },
  ];
  return (
    <View>
      <Text>Select all that apply</Text>
      <FlatList
        data={radioButtons}
        numColumns={3}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: index % 3 === 2 ? 0 : 30 }}>
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
  );
}

function FirstPage(props) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedCourseType, setCourseType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCalories, setSelectedCalories] = useState("");
  const [selectedHeat, setSelectedHeat] = useState(0);
  const [selectedServings, setSelectedServings] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedVegetarian, setSelectedVegetarian] = useState("Yes");
  const [selectedLowCarb, setSelectedLowCarb] = useState("Yes");
  const [selectedLowSodium, setSelectedLowSodium] = useState("Yes");
  const [selectedGlutenFree, setSelectedGlutenFree] = useState("Yes");
  const [selectedDairyFree, setSelectedDairyFree] = useState("Yes");
  const [selectedVegan, setSelectedVegan] = useState("Yes");

  const selection = [
    {
      // acts as primary key, should be unique and non-empty string
      label: "Vegetarian",
      function: setSelectedVegetarian,
      value: selectedVegetarian,
    },
    {
      label: "Low Carb",
      function: setSelectedLowCarb,
      value: selectedLowCarb,
    },
    {
      label: "Low Sodium",
      function: setSelectedLowSodium,
      value: selectedLowSodium,
    },
    {
      label: "Gluten Free",
      function: setSelectedGlutenFree,
      value: selectedGlutenFree,
    },
    {
      label: "Dairy Free",
      function: setSelectedDairyFree,
      value: selectedDairyFree,
    },
    {
      label: "Vegan",
      function: setSelectedVegan,
      value: selectedVegan,
    },
  ];

  const [isRange, setIsRange] = useState(true);

  const allApply = [
    {
      key: 1,
      value: 'Yes'
    },
    {
      key: 2,
      value: 'No'
    },
  ]
  return (
    <ScrollView>
      <View>
        {/* DRECIPE NAME */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Recipe Name</Text>
          <TextInput
            onChangeText={(text) => setSelectedName(text)}
            value={selectedName}
            style={generalStyles.loginSignupInput}
            placeholderTextColor={COLORS.textColor50}
          />
        </View>
        {/* LINE BREAK */}
        <View
          style={[generalStyles.lineBreak, { marginTop: 10, marginBottom: 10 }]}
        ></View>
        {/* INGREDIENTS INPUT */}
        <IngredientsInput/>
        {/* LINE BREAK */}
        <View
          style={[generalStyles.lineBreak, { marginTop: 10, marginBottom: 10 }]}
        ></View>
        {/* INSTRUCTIONS INPUT */}
        <InstructionsInput/>
        {/* LINE BREAK */}
        <View
          style={[generalStyles.lineBreak, { marginTop: 10, marginBottom: 10 }]}
        ></View>
        {/* DURATION */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>
            Duration (in minutes)
          </Text>
          {/* Only accepts numbers */}
          <TextInput
            onChangeText={(text) =>
              setSelectedDuration(text.replace(/[^0-9]/g, ""))
            }
            value={selectedDuration}
            keyboardType="numeric"
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
            placeholder="Select a course"
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
          <Text style={generalStyles.loginSignupLabel}>
            Level of difficulty
          </Text>
          <SelectList
            setSelected={(val) => setSelectedDifficulty(val)}
            data={difficulty}
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder="Select a level"
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
          <View
            style={[
              generalStyles.rowCenter,
              { justifyContent: "center", gap: 20, marginBottom: 20 },
            ]}
          >
            <TouchableOpacity
              style={generalStyles.tagSection}
              onPress={() => {
                setIsRange(true);
              }}
            >
              <Text style={generalStyles.tag}>Range</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={generalStyles.tagSection}
              onPress={() => {
                setIsRange(false);
              }}
            >
              <Text style={generalStyles.tag}>Specific</Text>
            </TouchableOpacity>
          </View>
          {isRange ? (
            <SelectList
              setSelected={(val) => setSelectedCalories(val)}
              data={heat}
              save="value"
              search={false}
              searchicon={() => <View></View>}
              placeholder="Select a range"
              inputStyles={{
                fontFamily: "Satoshi-Regular",
                color: COLORS.textColorFull,
              }}
              boxStyles={{
                borderColor: COLORS.textColorFull,
                backgroundColor: COLORS.backgroundLight,
              }}
            />
          ) : (
            <TextInput
              onChangeText={(text) => setSelectedCalories(text)}
              keyboardType="numeric"
              value={selectedCalories}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          )}
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
            placeholder="Select a heat level"
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
            onChangeText={(text) =>
              setSelectedServings(text.replace(/[^0-9]/g, ""))
            }
            value={selectedServings}
            keyboardType="numeric"
            style={generalStyles.loginSignupInput}
            placeholderTextColor={COLORS.textColor50}
          />
        </View>
        {/* CUISINE TYPE (OPTIONAL) */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>
            Cuisine (ex: Mexican, American) (optional)
          </Text>
          <TextInput
            onChangeText={(text) => setSelectedCuisine(text)}
            value={selectedCuisine}
            style={generalStyles.loginSignupInput}
            placeholderTextColor={COLORS.textColor50}
          />
        </View>
        {/* RELEVANT CATEGORIES AND TAGS (OPTIONAL) */}
        {/* LINE BREAK */}
        <View style={[generalStyles.lineBreak, { marginTop: 10, marginBottom: 10}]}></View>
        {/* ALL THAT APPLY (YES OR NO) SECTION */}
        <Text style={{ fontFamily: 'Satoshi-Medium', fontSize: 18, color: COLORS.textColorFull}}>Select all that apply</Text>
        <View style={[generalStyles.loginSignupInputSection, { marginTop: 20 }]}>
          {
            selection.map((item, index) => {
              return (
                <View key={item.label} style={{ marginBottom: 10}}>
                  {/* Only accepts numbers */}
                  <Text style={generalStyles.loginSignupLabel}>{item.label}?</Text>
                  <SelectList
                    setSelected={(val) => item.function(val)}
                    data={allApply}
                    save="value"
                    search={false}
                    searchicon={() => <View></View>}
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
              )
            })
          }
        </View>
        <TouchableOpacity style={[generalStyles.button, { marginBottom: 20 }]}>
          <Text style={generalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const IngredientsInput = () => {
  const [listedIngredients, setListedIngredients] = useState([]);
  const [listedMeasurements, setListedMesasurements] = useState([]);
  const [ quantity, setQuantity ] = useState('')
  const [ measure, setMeasure ] = useState('')
  const [ itemName, setItemName ] = useState('')
  
  function handleIngredient() {
    let ing = ''

    ing += quantity + ' ' + measure
    
    setListedMesasurements([...listedMeasurements, ing])
    setListedIngredients([...listedIngredients, itemName])

    setQuantity('')
    setMeasure('')
    setItemName('')
  }

  function handleCancel(item, index) {    
    const newMeasure = listedMeasurements.filter(obj => obj !== item)
    const newIngredients = listedIngredients.filter(obj => obj !== listedIngredients[index])

    setListedMesasurements(newMeasure)
    setListedIngredients(newIngredients)
  }

  return (
    <View style={{ marginBottom: 10}}>
      {/* INGREDIENT LIST */}
      <Text style={{ fontFamily: 'Satoshi-Medium', fontSize: 18, color: COLORS.textColorFull}}>Ingredients</Text>
      <View style={{ marginTop: 15}}>
        {listedMeasurements && 
        listedMeasurements.map((item, index) => {
          return (
            <View key={item} style={[generalStyles.rowCenter, { gap: 10, marginBottom: 5}]}>
              <XCircleIcon onPress={() => handleCancel(item, index)} color={COLORS.textColorFull}/>
              <View style={[generalStyles.rowCenter, { gap: 5}]}>
                <Text style={styles.measure}>{item}</Text>
                <Text style={styles.ingredient}>{listedIngredients[index]}</Text>
              </View>
            </View>
          )
        })}
      </View>
      {/* INGREDIENT FORM */}
      <View style={{ marginTop: 20}}>
        <View style={styles.ingredientsContainer}>
          <View style={{ flexBasis: '35%' }}>
            <Text style={[generalStyles.loginSignupLabel, { fontSize: 12}]}>
              Quantity (eg. 3, 3.5)
            </Text>
            <TextInput
              onChangeText={text => setQuantity(text.replace(/[^0-9.]/g, ""))}
              value={quantity}
              keyboardType='numeric'
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
          <View style={{ flexBasis: '60%' }}>
            <Text style={[generalStyles.loginSignupLabel, { fontSize: 12}]}>
                Measurement
              </Text>
              <SelectList
                setSelected={(val) => setMeasure(val)}
                data={measurement}
                save="value"
                search={false}
                searchicon={() => <View></View>}
                placeholder="Select a measurement"
                inputStyles={{
                  fontFamily: "Satoshi-Regular",
                  color: COLORS.textColorFull,
                  
                }}
                boxStyles={{
                  borderColor: COLORS.textColorFull,
                  backgroundColor: COLORS.backgroundLight,
                  paddingTop: 7,
                  paddingBottom: 7
                }}
              />
          </View>
          <View style={{ flexBasis: '100%' }}> 
              <Text style={[generalStyles.loginSignupLabel, { fontSize: 12}]}>
                Item name
              </Text>
              <TextInput
                onChangeText={(text) => setItemName(text)}
                value={itemName}
                style={generalStyles.loginSignupInput}
                placeholderTextColor={COLORS.textColor50}
              />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleIngredient}  style={[generalStyles.button, {borderRadius: 5, marginTop: 20}]}>
            <Text style={generalStyles.tag}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function InstructionsInput() {
  const [ instructionsArray, setInstructionsArray ] = useState([])
  const [ instructionStep, setInstructionStep ] = useState('')

  function handleInstructions() {
    setInstructionsArray([...instructionsArray, instructionStep])
    setInstructionStep('')
  }

  function handleCancel(item) {
    const newInstructions = instructionsArray.filter(obj => obj !== item)

    setInstructionsArray(newInstructions)
  }
  return (
    <View style={{ marginBottom: 10}}>
      <Text style={{ fontFamily: 'Satoshi-Medium', fontSize: 18, color: COLORS.textColorFull}}>Instructions</Text>
      {/* INSTRUCTIONS LIST */}
      <View style={{ marginTop: 15}}>
        {instructionsArray && 
        instructionsArray.map((item, index) => {
          return (
            <View key={item} style={[{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12}]}>
              <XCircleIcon onPress={() => handleCancel(item)} color={COLORS.textColorFull}/>
              <View style={{}}>
                <Text style={[styles.step, { marginBottom: 5}]}>Step {index + 1}</Text>
                <Text style={styles.instructions}>{item}</Text>
              </View>
            </View>
          )
        })}
      </View>
      {/* INSTRUCTIONS FORM */}
      <View style={{ marginTop: 20}}>
        <View>
          <TextInput
            onChangeText={text => setInstructionStep(text)}
            value={instructionStep}
            style={generalStyles.loginSignupInput}
            placeholder='Recipe instructions steps'
            placeholderTextColor={COLORS.textColor50}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleInstructions}  style={[generalStyles.button, {borderRadius: 5, marginTop: 20}]}>
            <Text style={generalStyles.tag}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10
  },
  ingredient: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
    textTransform: 'lowercase'
  },
  measure: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColor50,
  },
  step: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
    fontSize: 16
  },
  instructions: {
    fontFamily: 'Satoshi-Medium',
    color: COLORS.textColorFull,
  },
});
