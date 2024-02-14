import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import AccessCamera from "../components/Create/AccessCamera";
import { COLORS } from "../constant/default";
import generalStyles from "../constant/generalStyles";
import { SelectList } from "react-native-dropdown-select-list";
import {
  measurement,
  courses,
  difficulty,
  heat,
} from "../utils/cookingTerms";
import { PlusCircleIcon, XCircleIcon, PencilIcon } from "react-native-heroicons/solid";
import Modal from "../components/Modal";
import { auth, db } from "../firebase/config";
import { doc, collection, addDoc, serverTimestamp, query, where, updateDoc, getDocs } from "firebase/firestore";
import { uploadToRecipeStorage } from "../firebase/handleStorage";
import { useNavigation } from "@react-navigation/native";

const Create = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedCourseType, setCourseType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCalories, setSelectedCalories] = useState("");
  const [selectedHeat, setSelectedHeat] = useState('');
  const [selectedServings, setSelectedServings] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState("");

  // INGREDIENTS STATE
  const [listedIngredients, setListedIngredients] = useState([]);
  const [listedMeasurements, setListedMeasurements] = useState([]);
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

  const [imageMessage, setImageMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [ingredientsMessage, setIngredientsMessage] = useState("");
  const [instructionsMessage, setInstructionsMessage] = useState("");
  const [applyMessage, setApplyMessage] = useState("");
  const [error, setError] = useState("");

  const [ onProgress, setOnProgress] = useState(0)
  const [ currentImage, setCurrentImage ] = useState(null)
  const [ currentImages, setCurrentImages ] = useState([])

  // BOOLEAN STATE FOR CALORIES BUTTONS
  const [isRange, setIsRange] = useState(true);

  const [ recipeID, setRecipeID ] = useState(null)

  function handleSubmit() {
    // Checks the length of each section and sets the states
    // to empty string after 15 seconds
    if (!imagesArray.length) {
      setImageMessage('* You must select an image')
      setTimeout(function() {
        setImageMessage('')
      }, 15000)
    }
    else if (!selectedName.length) {
      setNameMessage('* You must enter a name')
      setTimeout(function() {
        setNameMessage('')
      }, 15000)
    } 
    else if (!listedIngredients.length || !listedMeasurements.length) {
      setIngredientsMessage('* You must add at least one ingredient')
      setTimeout(function() {
        setIngredientsMessage('')
      }, 15000)
    } 
    else if (!instructionsArray.length) {
      setInstructionsMessage('* You must add at least one instruction')
      setTimeout(function() {
        setInstructionsMessage('')
      }, 15000)
    } 
    else if (!selectedDuration.length || !selectedCourseType.length || !selectedDifficulty.length ||
      !selectedCalories.length || !selectedHeat.length || !selectedServings.length) {
      setInputMessage('* Entries must not be left empty')
      setTimeout(function() {
        setInputMessage('')
      }, 15000)
    } 
    else if (!selectedVegetarian.length || !selectedLowCarb.length || !selectedLowSodium.length ||
      !selectedGlutenFree.length || !selectedDairyFree.length || !selectedVegan.length) {
        setApplyMessage('* You must select an option')
        setTimeout(function() {
          setApplyMessage('')
        }, 15000)
    } 
    else {
      // Start the loading process
      setLoading(true)

      const recipeRef = collection(db, 'recipes')

      try { 
        async function createRecipe() {
          // Adds a new document to firestore database under the recipes
          // collection, adding all the appropriate inputs
          const recipeAdd = await addDoc(recipeRef, {
            user_id: auth?.currentUser?.uid,
            recipeName: selectedName,
            ingredientsMeasurements: listedMeasurements,
            ingredientsItems: listedIngredients,
            instructions: instructionsArray,
            tags: tagsArray,
            calories: selectedCalories,
            courseType: selectedCourseType,
            cuisine: selectedCuisine,
            difficulty: selectedDifficulty,
            duration: selectedDuration,
            servings: selectedServings,
            heatLevel: selectedHeat,
            vegetarian: selectedVegetarian === 'Yes',
            lowCarb: selectedLowCarb === 'Yes',
            glutenFree: selectedGlutenFree === 'Yes',
            dairyFree: selectedDairyFree === 'Yes',
            lowSodium: selectedLowSodium === 'Yes',
            vegan: selectedVegan === 'Yes',
            createdAt: serverTimestamp()
          })
          
          setRecipeID(recipeAdd?.id)
          // UPLOADS IMAGE TO FIREBASE STORAGE
          imagesArray.forEach(image => {
            // Image output is 'fileName uri' so must split them up by ' ' for each
            // element in the imagesArray
            
            let separate = image.split(' ')
            
            const fileName = separate[0]
            const uri = separate[1]

            console.log(fileName)

            try {
              // Call the upload to storage function and assign uri, collection name, 
              // recipeID, and filename
              uploadToRecipeStorage(uri, 'recipes', recipeAdd?.id, fileName, setCurrentImage)

            } catch (err) {
              Alert.alert(err.message)
            }
        })
          
        // Finds the recipe that contains the recipe images since it would be the most unique
        // value in the document
        const findRecipeRef = doc(db, 'recipes', recipeAdd?.id)
        // Finds the user associated with the user_id
        const findUserRef = query(collection(db, 'users'), where('id', '==', auth?.currentUser?.uid))

        async function findRecipe() {
          const userSnap = await getDocs(findUserRef)

          let userInfo;

          userSnap.forEach(doc => {
            userInfo = doc.data()
          })

          try {
            await updateDoc(findRecipeRef, {
              id: recipeAdd?.id,
              user: userInfo
            })
            Alert.alert('Recipe has been successfully added!')
          } catch (err) {
            Alert.alert(err.message)
          }
              
          }
          findRecipe()
        }

        createRecipe()
        setLoading(false)

        setImagesArray([])

        setSelectedName("");
        setSelectedDuration('');
        setCourseType("");
        setSelectedDifficulty("");
        setSelectedCalories("");
        setSelectedHeat('');
        setSelectedServings('');
        setSelectedCuisine('')

        setListedIngredients([]);
        setListedMeasurements([]);
        setQuantity("");
        setMeasure("");
        setItemName("");

        setInstructionsArray([]);
        setInstructionStep("");
      
        // TAGS STATE
        setTagsArray([]);
        setTag("");
      
        // SAY YES TO ALL THAT APPLY SECTION
        setSelectedVegetarian("Yes");
        setSelectedLowCarb("Yes");
        setSelectedLowSodium("Yes");
        setSelectedGlutenFree("Yes");
        setSelectedDairyFree("Yes");
        setSelectedVegan("Yes");

      } catch (err) {
        Alert.alert(err.message)
        setLoading(false)
      }

    }
  }

  useEffect(function() {
    // Finds the recipe that contains the recipe images since it would be the most unique
    // value in the document
    if (currentImage && recipeID) {
      console.log(currentImage)

      setCurrentImages([currentImage, ...currentImage])
      
      console.log(currentImages)

      async function updateImages() {
        try {
          const findRecipeRef = doc(db, 'recipes', recipeID)

          await updateDoc(findRecipeRef, {
            images: currentImages
          })
        } catch(err) {
          console.log(err.message)
        }
      }
      updateImages()
    }

  }, [currentImage])

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

  return (
    <View style={[generalStyles.default, { position: "relative" }]}>
      <View style={{ height: 2, backgroundColor: COLORS.textColorFull, width: `${onProgress}%`  }}></View>
      {error && error.length && 
      <Modal>
        <Text style={{ fontFamily: 'Satoshi-Medium', color: COLORS.textColorFull, textAlign: 'center'}}>{error}</Text>
        <TouchableOpacity style={[generalStyles.button, { marginTop: 10 }]}>
          <Text style={[generalStyles.buttonText]}>Submit</Text>
        </TouchableOpacity>
      </Modal>
      }
      <SafeAreaView>
        <ScrollView style={[styles.view, { paddingBottom: 80, paddingTop: 20 }]}>
          <AccessCamera
            imagesArray={imagesArray}
            setImagesArray={setImagesArray}
            message={imageMessage}
            setOnProgress={setOnProgress}
            onProgress={onProgress}
          />
          <View
            style={[
              generalStyles.lineBreak,
              { marginTop: 10, marginBottom: 10 },
            ]}
          ></View>
          <View>
            {/* RECIPE NAME */}
            <View style={generalStyles.loginSignupInputSection}>
              {
                nameMessage && nameMessage.length &&
              <View style={{ marginTop: 10, marginBottom: 10}}>
                <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{nameMessage}</Text>
              </View>
              }
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
            {
              ingredientsMessage && ingredientsMessage.length &&
            <View style={{ marginTop: 10, marginBottom: 10}}>
              <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{ingredientsMessage}</Text>
            </View>
            }
            <IngredientsInput
              setListedIngredients={setListedIngredients}
              setListedMeasurements={setListedMeasurements}
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
            {
              instructionsMessage && instructionsMessage.length &&
            <View style={{ marginTop: 10, marginBottom: 10}}>
              <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{instructionsMessage}</Text>
            </View>
            }
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
            {
              inputMessage && inputMessage.length &&
            <View style={{ marginTop: 10, marginBottom: 10}}>
              <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{inputMessage}</Text>
            </View>
            }
            <View style={generalStyles.loginSignupInputSection}>
              <Text style={generalStyles.loginSignupLabel}>
                Duration (in minutes)
              </Text>
              {/* Only accepts numbers */}
              <TextInput
                onChangeText={(text) =>
                  setSelectedDuration(text)
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
                  setSelected={(val) => setSelectedCalories(val.toString())}
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
                setSelected={(val) => setSelectedHeat(val.toString())}
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
                  setSelectedServings(text)
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
            {
             applyMessage && applyMessage.length &&
            <View style={{ marginTop: 10, marginBottom: 10}}>
              <Text style={[generalStyles.defaultParagraph, { color: 'red'}]}>{applyMessage}</Text>
            </View>
            }
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
            {loading ? 
            <View style={{ marginBottom: 60}}>
              <ActivityIndicator size='small' color={COLORS.textColorFull}/>
            </View>
            :
            <TouchableOpacity
              onPress={handleSubmit}
              style={[generalStyles.button, { marginBottom: 60 }]}
            >
              <Text style={generalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            }
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
  setListedMeasurements,
  setQuantity,
  quantity,
  setMeasure,
  measure,
  setItemName,
  itemName,
}) => {
  const [ isEdit, setIsEdit ] = useState(false)
  const [ editIndex, setEditIndex ] = useState()


  function handleIngredient() {
    if (quantity.length && measure.length && itemName.length && !isEdit) {
      let ing = "";

      ing += quantity + " " + measure;

      setListedMeasurements([...listedMeasurements, ing]);
      setListedIngredients([...listedIngredients, itemName]);

      setQuantity("");
      setMeasure("");
      setItemName("");
    } else if (quantity.length && measure.length && itemName.length && isEdit) {
      // In edit mode, once done button is clicked, replace the text of the item name and measurements
      // with the newly updated text from the input
      let ing = "";

      ing += quantity + " " + measure;

      listedMeasurements[editIndex] = ing
      listedIngredients[editIndex] = itemName

      // Exit edit mode and set input to empty string
      setIsEdit(false)
      setItemName('')
    }
  }

  function handleCancel(item, index) {
    const newMeasure = listedMeasurements.filter((obj) => obj !== item);
    const newIngredients = listedIngredients.filter(
      (obj) => obj !== listedIngredients[index]
    );

    setListedMeasurements(newMeasure);
    setListedIngredients(newIngredients);
  }

  function handleEdit(item, index) {
    // Set to edit mode
    setIsEdit(true)
    // Assign the input to the text that we want updated
    setItemName(listedIngredients[index])
    // Set a state to get the index in order to use it in another function
    setEditIndex(index)
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
              <View key={item}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end'}} onPress={() => handleEdit(item, index)}>
                <PencilIcon size={18} color={COLORS.textColorFull}/>
              </TouchableOpacity>
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
            <Text style={generalStyles.tag}>{isEdit ? 'Edit' : 'Add'} Ingredient</Text>
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

  const [ isEdit, setIsEdit ] = useState(false)
  const [ editIndex, setEditIndex ] = useState()

  function handleInstructions() {
    if (instructionStep.length && !isEdit) {
      setInstructionsArray([...instructionsArray, instructionStep]);
      setInstructionStep("");
      Keyboard.dismiss()
    } else if (instructionStep.length && isEdit) {
      // In edit mode, once done button is clicked, replace the text of the instruction step
      // with the newly updated text from the input
      instructionsArray[editIndex] = instructionStep

      // Exit edit mode and set input to empty string
      setIsEdit(false)
      setInstructionStep('')
      Keyboard.dismiss()
    }
  }

  function handleCancel(item) {
    const newInstructions = instructionsArray.filter((obj) => obj !== item);

    setInstructionsArray(newInstructions);
  }

  function handleEdit(item, index) {
    // Set to edit mode
    setIsEdit(true)
    // Assign the input to the text that we want updated
    setInstructionStep(item)
    // Set a state to get the index in order to use it in another function
    setEditIndex(index)
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
              style={[{
                marginBottom: 10
                }]}>

              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    marginBottom: 0,
                  },
                ]}
              >
                <View style={[generalStyles.rowCenter, {gap: 10}]}>
                  <XCircleIcon
                    onPress={() => handleCancel(item)}
                    color={COLORS.textColorFull}
                  />
                  <View style={{}}>
                    <Text style={[styles.step, { marginBottom: 5 }]}>
                      Step {index + 1}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleEdit(item, index)}>
                  <PencilIcon size={18} color={COLORS.textColorFull}/>
                </TouchableOpacity>
                </View>
                <Text style={[styles.instructions, { paddingLeft: 35 }]}>{item}</Text>
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
            numberOfLines={4}
            editable
            multiline
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
            <Text style={generalStyles.tag}>{isEdit ? 'Edit' : 'Add'} Instruction</Text>
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
