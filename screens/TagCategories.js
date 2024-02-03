import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import React, { useState, useEffect } from "react";
import { categories } from "../utils/popularCategories";
import { COLORS } from "../constant/default";
import CategoryDisplay from "../components/CategoryDisplay";
import generalStyles from "../constant/generalStyles";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";


// User selects tags to 
const TagCategories = () => {
  const [tagArray, setTagArray] = useState([]);
  const [ loading, setLoading ] = useState(false)

  const { navigate } = useNavigation()

  function handleSubmit() {
    setLoading(true)
    const userRef = doc(db, 'users', auth?.currentUser?.uid)

    async function updateTag() {
        try {
            await updateDoc(userRef, {
                tags: tagArray 
            })
            
            setLoading(false)
            setTagArray([])
            navigate('Root')
        } catch (err) {
            setLoading(false)
            Alert.alert(err.message)
        }
    }

    updateTag()
  }

  return (
    <SafeAreaView style={styles.format}>
      <View style={{ paddingTop: 50, paddingBottom: 50}}>
        <Text style={styles.interestText}>Which of the tags interest you?</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryTag
              item={item.strCategory}
              setTagArray={setTagArray}
              tagArray={tagArray}
              loading={loading}
            />
          )}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          // For row gap
          ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
          // For column gap
          columnWrapperStyle={{gap: 5 }}
        />

        {/* Show loading spinner on loading; else show skip and done buttons */}
        {loading ?
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
            <ActivityIndicator color={COLORS.textColorFull}/> 
        </View> 
        :
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ fontFamily: 'Satoshi-Medium', color: COLORS.textColorFull}}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={generalStyles.loginSignUpButton}>
                    <AntDesign
                    name="arrowright"
                    size={24}
                    color={COLORS.backgroundFull}
                />
                <Text style={generalStyles.loginSignUpButtonText}>Done</Text>
            </TouchableOpacity>
    </View>
        }
       
      </View>
    </SafeAreaView>
  );
};

export default TagCategories;

function CategoryTag({ item, tagArray, setTagArray, loading }) {
  const [isSelected, setIsSelected] = useState(false)

  
  function handleTags(item) {
    // setTagArray([])
    if (!tagArray.includes(item.toLowerCase())) {
        setTagArray([...tagArray, item.toLowerCase()]);
      
    } else if (tagArray.includes(item.toLowerCase())){
      const removeItem = tagArray?.filter((obj) => obj !== item.toLowerCase());

      setTagArray(removeItem);
    }
  }

  useEffect(function() {
    if (tagArray.length === 0) {
        setIsSelected(false)
    }
  }, [loading])

  return (
    <TouchableOpacity
      onPress={() => {
        setIsSelected(prev => !prev)
        handleTags(item);
      }}
      style={[
        styles.categoryStyle,
        isSelected ? styles.selected : styles.unSelected,
      ]}
    >
        
      <Text
        style={[
          isSelected ? styles.selectedText : styles.unSelectedText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  format: {
    flex: 1,
    backgroundColor: COLORS.backgroundFull,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  interestText: {
    fontFamily: "Boska-Medium",
    fontSize: 22,
    color: COLORS.textColorFull,
    textAlign: 'center',
    marginBottom: 40
  },
  categoryStyle: {
    width: 90,
    height: 90,
    borderRadius: 35,
    borderColor: COLORS.textColorFull,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    backgroundColor: COLORS.textColorFull,
  },
  unSelected: {
    backgroundColor: "transparent",
  },
  selectedText: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.backgroundFull,
    textAlign: 'center',
    fontSize: 13
  },
  unSelectedText: {
    fontFamily: "Satoshi-Medium",
    color: COLORS.textColorFull,
    textAlign: 'center',
    fontSize: 12
  },
});
