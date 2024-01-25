import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import AccessCamera from "../components/Create/AccessCamera";
import CreateRecipeForm from "../components/Create/CreateRecipeForm";
import { COLORS } from "../constant/default";
import generalStyles from "../constant/generalStyles";
import { SelectList } from "react-native-dropdown-select-list";
import {
  measurement,
  courses,
  difficulty,
  heat,
  tagsOptions,
} from "../utils/cookingTerms";
import { PlusCircleIcon, XCircleIcon } from "react-native-heroicons/solid";

const Create = () => {
  const [loading, setLoading] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedCourseType, setCourseType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCalories, setSelectedCalories] = useState("");
  const [selectedHeat, setSelectedHeat] = useState(0);
  const [selectedServings, setSelectedServings] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  // INGREDIENTS STATE
  const [listedIngredients, setListedIngredients] = useState([]);
  const [listedMeasurements, setListedMesasurements] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [measure, setMeasure] = useState("");
  const [itemName, setItemName] = useState("");

  // INSTRUCTIONS STATE
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [instructionStep, setInstructionStep] = useState("");

  // TAGS STATE
  const [tagsArray, setTagsArray] = useState([]);
  const [tag, setTag] = useState("");

  // SAY YES TO ALL THAT APPLY SECTION
  const [selectedVegetarian, setSelectedVegetarian] = useState("Yes");
  const [selectedLowCarb, setSelectedLowCarb] = useState("Yes");
  const [selectedLowSodium, setSelectedLowSodium] = useState("Yes");
  const [selectedGlutenFree, setSelectedGlutenFree] = useState("Yes");
  const [selectedDairyFree, setSelectedDairyFree] = useState("Yes");
  const [selectedVegan, setSelectedVegan] = useState("Yes");

  const [message, setMessage] = useState("");

  // BOOLEAN STATE FOR CALORIES BUTTONS
  const [isRange, setIsRange] = useState(true);

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

  const allApply = [
    {
      key: 1,
      value: "Yes",
    },
    {
      key: 2,
      value: "No",
    },
  ];

  function handleSubmit() {}
  return (
    <View style={[generalStyles.default, { position: "relative", paddingTop: 20 }]}>
      {/* <Modal>
        <Text>Hi</Text>
      </Modal> */}
      <SafeAreaView>
        <ScrollView style={[styles.view, { paddingBottom: 80 }]}>
          <AccessCamera
            imagesArray={imagesArray}
            setImagesArray={setImagesArray}
          />
          <View
            style={[
              generalStyles.lineBreak,
              { marginTop: 10, marginBottom: 10 },
            ]}
          ></View>
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
              style={[
                generalStyles.lineBreak,
                { marginTop: 10, marginBottom: 10 },
              ]}
            ></View>
            {/* INGREDIENTS INPUT */}
            <IngredientsInput
              setListedIngredients={setListedIngredients}
              setListedMesasurements={setListedMesasurements}
              setMeasure={setMeasure}
              setQuantity={setQuantity}
              setItemName={setItemName}
              listedIngredients={listedIngredients}
              listedMeasurements={listedMeasurements}
              measure={measure}
              quantity={quantity}
              itemName={itemName}
            />
            {/* LINE BREAK */}
            <View
              style={[
                generalStyles.lineBreak,
                { marginTop: 10, marginBottom: 10 },
              ]}
            ></View>
            {/* INSTRUCTIONS INPUT */}
            <InstructionsInput
              instructionStep={instructionStep}
              instructionsArray={instructionsArray}
              setInstructionStep={setInstructionStep}
              setInstructionsArray={setInstructionsArray}
            />
            {/* LINE BREAK */}
            <View
              style={[
                generalStyles.lineBreak,
                { marginTop: 10, marginBottom: 10 },
              ]}
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
              <Text style={generalStyles.loginSignupLabel}>
                Heat level (0 - 3)
              </Text>
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
              <Text style={generalStyles.loginSignupLabel}>
                How many servings?
              </Text>
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
            <TagsInput
              setTag={setTag}
              tag={tag}
              setTagsArray={setTagsArray}
              tagsArray={tagsArray}
            />
            {/* LINE BREAK */}
            <View
              style={[
                generalStyles.lineBreak,
                { marginTop: 10, marginBottom: 10 },
              ]}
            ></View>
            {/* ALL THAT APPLY (YES OR NO) SECTION */}
            <Text
              style={{
                fontFamily: "Satoshi-Medium",
                fontSize: 18,
                color: COLORS.textColorFull,
              }}
            >
              Select all that apply
            </Text>
            <View
              style={[generalStyles.loginSignupInputSection, { marginTop: 20 }]}
            >
              {selection.map((item, index) => {
                return (
                  <View key={item.label} style={{ marginBottom: 10 }}>
                    {/* Only accepts numbers */}
                    <Text style={generalStyles.loginSignupLabel}>
                      {item.label}?
                    </Text>
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
                );
              })}
            </View>
            {/* SUBMIT RECIPE FORM */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={[generalStyles.button, { marginBottom: 20 }]}
            >
              <Text style={generalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Create;

// INGREDIENTS SECTION COMPONENT
const IngredientsInput = ({
  setListedIngredients,
  listedIngredients,
  listedMeasurements,
  setListedMesasurements,
  setQuantity,
  quantity,
  setMeasure,
  measure,
  setItemName,
  itemName,
}) => {
  function handleIngredient() {
    if (quantity.length && measure.length && itemName.length) {
      let ing = "";

      ing += quantity + " " + measure;

      setListedMesasurements([...listedMeasurements, ing]);
      setListedIngredients([...listedIngredients, itemName]);

      setQuantity("");
      setMeasure("");
      setItemName("");
    }
  }

  function handleCancel(item, index) {
    const newMeasure = listedMeasurements.filter((obj) => obj !== item);
    const newIngredients = listedIngredients.filter(
      (obj) => obj !== listedIngredients[index]
    );

    setListedMesasurements(newMeasure);
    setListedIngredients(newIngredients);
  }

  return (
    <View style={{ marginBottom: 10 }}>
      {/* INGREDIENT LIST */}
      <Text
        style={{
          fontFamily: "Satoshi-Medium",
          fontSize: 18,
          color: COLORS.textColorFull,
        }}
      >
        Ingredients
      </Text>
      <View style={{ marginTop: 15 }}>
        {listedMeasurements &&
          listedMeasurements.map((item, index) => {
            return (
              <View
                key={item}
                style={[generalStyles.rowCenter, { gap: 10, marginBottom: 5 }]}
              >
                <XCircleIcon
                  onPress={() => handleCancel(item, index)}
                  color={COLORS.textColorFull}
                />
                <View style={[generalStyles.rowCenter, { gap: 5 }]}>
                  <Text style={styles.measure}>{item}</Text>
                  <Text style={styles.ingredient}>
                    {listedIngredients[index]}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
      {/* INGREDIENT FORM */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.ingredientsContainer}>
          <View style={{ flexBasis: "35%" }}>
            <Text style={[generalStyles.loginSignupLabel, { fontSize: 12 }]}>
              Quantity (eg. 3, 3.5)
            </Text>
            <TextInput
              onChangeText={(text) => setQuantity(text.replace(/[^0-9.]/g, ""))}
              value={quantity}
              keyboardType="numeric"
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
          <View style={{ flexBasis: "60%" }}>
            <Text style={[generalStyles.loginSignupLabel, { fontSize: 12 }]}>
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
                paddingBottom: 7,
              }}
            />
          </View>
          <View style={{ flexBasis: "100%" }}>
            <Text style={[generalStyles.loginSignupLabel, { fontSize: 12 }]}>
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
          <TouchableOpacity
            onPress={handleIngredient}
            style={[
              generalStyles.button,
              generalStyles.rowCenter,
              {
                justifyContent: "center",
                gap: 10,
                borderRadius: 5,
                marginTop: 20,
              },
            ]}
          >
            <PlusCircleIcon color={COLORS.backgroundFull} />
            <Text style={generalStyles.tag}>Add Ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// INSTRUCTIONS SECTION COMPONENT
function InstructionsInput({
  instructionStep,
  setInstructionStep,
  setInstructionsArray,
  instructionsArray,
}) {
  function handleInstructions() {
    if (instructionStep.length) {
      setInstructionsArray([...instructionsArray, instructionStep]);
      setInstructionStep("");
    }
  }

  function handleCancel(item) {
    const newInstructions = instructionsArray.filter((obj) => obj !== item);

    setInstructionsArray(newInstructions);
  }
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontFamily: "Satoshi-Medium",
          fontSize: 18,
          color: COLORS.textColorFull,
        }}
      >
        Instructions
      </Text>
      {/* INSTRUCTIONS LIST */}
      <View style={{ marginTop: 15 }}>
        {instructionsArray &&
          instructionsArray.map((item, index) => {
            return (
              <View
                key={item}
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                    marginBottom: 12,
                  },
                ]}
              >
                <XCircleIcon
                  onPress={() => handleCancel(item)}
                  color={COLORS.textColorFull}
                />
                <View style={{}}>
                  <Text style={[styles.step, { marginBottom: 5 }]}>
                    Step {index + 1}
                  </Text>
                  <Text style={styles.instructions}>{item}</Text>
                </View>
              </View>
            );
          })}
      </View>
      {/* INSTRUCTIONS FORM */}
      <View style={{ marginTop: 20 }}>
        <View>
          <TextInput
            onChangeText={(text) => setInstructionStep(text)}
            value={instructionStep}
            style={generalStyles.loginSignupInput}
            placeholder="Recipe instructions steps"
            placeholderTextColor={COLORS.textColor50}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleInstructions}
            style={[
              generalStyles.button,
              generalStyles.rowCenter,
              {
                justifyContent: "center",
                gap: 10,
                borderRadius: 5,
                marginTop: 20,
              },
            ]}
          >
            <PlusCircleIcon color={COLORS.backgroundFull} />
            <Text style={generalStyles.tag}>Add Instruction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// TAGS SECTION COMPONENT
function TagsInput({ setTag, tag, setTagsArray, tagsArray }) {
  function handleTags() {
    if (tag.length) {
      setTagsArray([...tagsArray, tag]);
      setTag("");
    }
  }

  function handleCancel(item) {
    const newTag = tagsArray.filter((obj) => obj !== item);

    setTagsArray(newTag);
  }
  return (
    <View>
      {/* TAGS LIST */}
      <View
        style={[
          generalStyles.rowCenter,
          { flexWrap: "wrap", gap: 15, marginBottom: 15 },
        ]}
      >
        {tagsArray &&
          tagsArray.map((item, index) => {
            return (
              <View key={item} style={[generalStyles.rowCenter, { gap: 10 }]}>
                <XCircleIcon
                  onPress={() => handleCancel(item)}
                  color={COLORS.textColorFull}
                />
                <Text style={styles.instructions}>{item}</Text>
              </View>
            );
          })}
      </View>
      {/* TAGS FORM */}
      <View style={generalStyles.loginSignupInputSection}>
        <Text style={generalStyles.loginSignupLabel}>
          Relevant categories & tags (optional)
        </Text>
        <TextInput
          onChangeText={(text) => setTag(text.toLowerCase())}
          value={tag}
          style={generalStyles.loginSignupInput}
          placeholderTextColor={COLORS.textColor50}
        />
        <TouchableOpacity
          onPress={handleTags}
          style={[
            generalStyles.button,
            generalStyles.rowCenter,
            {
              justifyContent: "center",
              gap: 10,
              borderRadius: 5,
              marginTop: 20,
            },
          ]}
        >
          <PlusCircleIcon color={COLORS.backgroundFull} />
          <Text style={generalStyles.tag}>Add Tag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  view: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  ingredient: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
    textTransform: "lowercase",
  },
  measure: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColor50,
  },
  step: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
    fontSize: 16,
  },
  instructions: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
  },
});
