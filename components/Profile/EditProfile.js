import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import generalStyles from "../../constant/generalStyles";
import { COLORS } from "../../constant/default";
import { SelectList } from "react-native-dropdown-select-list";
import { editPronouns } from "../../utils/userEdit";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import Modal from "../Modal";
import ReAuthenticate from "../ReAuthenticate";
import * as ImagePicker from "expo-image-picker";
import { UserIcon, PhotoIcon, XMarkIcon } from "react-native-heroicons/solid";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, db } from "../../firebase/config";
import { query, where, collection, getDocs, setDocs, doc, updateDoc } from "firebase/firestore";

const EditProfile = () => {
  const [newBio, setNewBio] = useState('');
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPronouns, setNewPronouns] = useState('');
  const [nameEdit, setNameEdit] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const [ messageOpen, setMessageOpen ] = useState(false)
  const [imagePick, setImagePick] = useState(null);
  const [backgroundImagePick, setBackgroundImagePick] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles background pic image picker
  const backgroundImage = async () => {
    // No permissions request is necessary for launching the image library
    const { status } = await ImagePicker. 
      requestMediaLibraryPermissionsAsync(); 

  if (status !== "granted") { 

      // If permission is denied, show an alert 
      Alert.alert( 
          "Permission Denied", 
          `Sorry, we need camera  
            roll permission to upload images.` 
      ); 
  } else { 

      // Launch the image library and get 
      // the selected image 
      const result = 
          await ImagePicker.launchImageLibraryAsync(); 

      if (!result.canceled) { 

          // Append to images array when image is added
          setBackgroundImagePick(result.assets[0].uri); 
          // Clear any previous errors 
      } 
  }
  };

  // Handles profile pic image picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const { status } = await ImagePicker. 
        requestMediaLibraryPermissionsAsync(); 

    if (status !== "granted") { 

        // If permission is denied, show an alert 
        Alert.alert( 
            "Permission Denied", 
            `Sorry, we need camera  
              roll permission to upload images.` 
        ); 
    } else { 

        // Launch the image library and get 
        // the selected image 
        const result = 
            await ImagePicker.launchImageLibraryAsync(); 

        if (!result.canceled) { 
            // Append to images array when image is added
            setImagePick(result.assets[0].uri); 
            // Clear any previous errors 
        } 
    }
  };

  function loadProfileImage(profileImage) {
    if (profileImage) {
      const storage = getStorage();
      const userRef = ref(storage, 'users', auth?.currentUser?.uid, 'profileImage', profileImage);
  
      // Get the download URL
      getDownloadURL(userRef)
      .then((url) => {
          // Insert url into an <img> tag to "download"
          setProfileImagePick(url)
      })
      .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          
      });
    }
  }

  function loadBackgroundImage(backgroundImage) {
    if (backgroundImage) {
      const storage = getStorage();
      const userRef = ref(storage, 'users', auth?.currentUser?.uid, 'backgroundImage', backgroundImage);
  
      // Get the download URL
      getDownloadURL(userRef)
      .then((url) => {
          // Insert url into an <img> tag to "download"
          setBackgroundImagePick(url)
      })
      .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          
      });
    }
  }

  // Loads user information on first load
  function loadUserInfo() {
    const userRef = query(collection(db, 'users'), where('id', '==', auth?.currentUser?.uid))

    async function getUserInfo() {
      const userSnap = await getDocs(userRef)

      let userArray = []
      userSnap.forEach(doc => {
        userArray.push(doc.data())
      })

      
      setNewName(userArray[0]?.name)
      setNewUsername(userArray[0]?.username)
      loadProfileImage(userArray[0]?.profileImage)     
      loadBackgroundImage(userArray[0]?.profileBackgroundImage)
      setNewPronouns(userArray[0]?.pronouns)
      setNewBio(userArray[0]?.bio) 
    }

    getUserInfo()
  }

  useEffect(function() {
    loadUserInfo()
  }, [])

  function handleSubmit() {
    if (!newUsername.length || !newName.length) {
      setError('Name and username must not be empty')
    } else {
      setLoading(true)
      const userRef = doc(db, 'users', auth?.currentUser?.uid)

      const imageName = imagePick.split('/').pop()
      const backgroundName = backgroundImagePick.split('/').pop()

      async function updateUserInfo() {
        try {
          await updateDoc(userRef, {
            name: newName,
            username: newUsername,
            bio: newBio,
            pronouns: newPronouns,
            profileImage: imageName,
            profileBackgroundImage: backgroundName
          })
          setError('Updated successfully!')
          setMessageOpen(true)
          setLoading(false)
        } catch(err) {
          setError('Something went wrong while')
          setMessageOpen(true)
          setLoading(false)
        }      
  
      }
  
      updateUserInfo()
    }
  }

  return (
    <View style={[generalStyles.default, { position: "relative" }]}>
      {open && <ReAuthenticate setOpen={setOpen} />}
      { messageOpen && 
      <Modal>
        <View>
          <Text style={[generalStyles.defaultParagraph, {textAlign: 'center'}]}>{error}</Text>
        </View>
        <Pressable onPress={() => { setMessageOpen(false)}} style={[generalStyles.button, { marginTop: 20 }]}>
          <Text style={generalStyles.buttonText}>Okay</Text>
        </Pressable>
      </Modal>
      }

      <ScrollView style={{ marginTop: 40, paddingLeft: 20, paddingRight: 20 }}>
        {/* BACKGROUND IMAGE SELECT */}
        <View style={styles.backgroundImageSection}>
          <View style={styles.backgroundImage}>
            {backgroundImagePick ? (
              <Image
                source={{ uri: backgroundImagePick }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            ) : (
              <PhotoIcon size={40} color={COLORS.backgroundLight} />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={backgroundImage} style={[generalStyles.button, {borderRadius: 5, marginTop: 20}]}>
          <Text style={generalStyles.tag}>Select your background image</Text>
        </TouchableOpacity>
        {/* PROFILE IMAGE SELECT */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImage}>
            {imagePick ? (
              <Image
                source={{ uri: imagePick }}
                style={{ width: "100%", height: "100%", borderRadius: 10000 }}
                resizeMode="contain"
              />
            ) : (
              <UserIcon size={60} color={COLORS.backgroundLight} />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={pickImage}  style={[generalStyles.button, {borderRadius: 5, marginTop: 20}]}>
          <Text style={generalStyles.tag}>Select your profile image</Text>
        </TouchableOpacity>
        {/* USER USERNAME */}
        <View style={[generalStyles.loginSignupInputSection, {marginTop: 20}]}>
          <Text style={generalStyles.loginSignupLabel}>Name</Text>
          {/* EDIT NAME  */}
          <View
            style={[
              generalStyles.rowCenter,
              { justifyContent: "space-between" },
            ]}
          >
            <TextInput
              value={newName}
              onChangeText={(text) => setNewName(text)}
              // DISABLE USER'S ABILITY TO INPUT TEXT WHEN NOT IN EDIT MODE
              readOnly={nameEdit ? false : true}
              style={[
                generalStyles.loginSignupInput,
                {
                  color: nameEdit ? COLORS.textColor75 : COLORS.textColor40,
                  borderColor: nameEdit
                    ? COLORS.textColorFull
                    : COLORS.textColor50,
                },
              ]}
            />
            {/* IF EDIT BUTTON IS CLICKED, HIDE EDIT BUTTON AND SHOW SAVE BUTTON;
            IF SAVE BUTTON IS CLICKED, SHOW EDIT BUTTON */}
            <TouchableOpacity
              style={[
                generalStyles.tagSection,
                { display: nameEdit ? "none" : "block" },
              ]}
              onPress={() => setNameEdit(true)}
            >
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                generalStyles.tagSection,
                { display: nameEdit ? "block" : "none" },
              ]}
              onPress={() => setNameEdit(false)}
            >
              <Text style={generalStyles.tag}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* EDIT USERNAME */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Username</Text>
          <View
            style={[
              generalStyles.rowCenter,
              { justifyContent: "space-between" },
            ]}
          >
            <TextInput
              value={newUsername}
              onChangeText={(text) => setNewUsername(text)}
              readOnly={usernameEdit ? false : true}
              style={[
                generalStyles.loginSignupInput,
                {
                  color: usernameEdit ? COLORS.textColor75 : COLORS.textColor40,
                  borderColor: usernameEdit
                    ? COLORS.textColorFull
                    : COLORS.textColor50,
                },
              ]}
            />
            <TouchableOpacity
              style={[
                generalStyles.tagSection,
                { display: usernameEdit ? "none" : "block" },
              ]}
              onPress={() => setUsernameEdit(true)}
            >
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                generalStyles.tagSection,
                { display: usernameEdit ? "block" : "none" },
              ]}
              onPress={() => setUsernameEdit(false)}
            >
              <Text style={generalStyles.tag}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* CHANGE PASSWORD */}
        <TouchableOpacity
          style={[generalStyles.rowCenter, styles.password]}
          onPress={() => setOpen(true)}
        >
          <Text style={{ fontFamily: "Satoshi-Regular" }}>Change Password</Text>
          <ChevronRightIcon color={COLORS.textColor20} />
        </TouchableOpacity>
        <View
          style={[generalStyles.lineBreak, { marginTop: 15, marginBottom: 15 }]}
        ></View>
        {/* USER BIO INPUT */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Bio</Text>
          <TextInput
            style={generalStyles.loginSignupInput}
            numberOfLines={4}
            editable
            multiline
            maxLength={240}
            onChangeText={(text) => setNewBio(text)}
            value={newBio}
            placeholder="Let us know who you are"
            placeholderStyle={{ color: COLORS.textColor50 }}
          />
        </View>
        {/* USER BIO WORD COUNT */}
        <View>
          <Text
            style={[
              generalStyles.defaultParagraph,
              { textAlign: "right", fontSize: 13, color: COLORS.textColor50 },
            ]}
          >
            {newBio.length} / 240
          </Text>
        </View>
        {/* PRONOUNS SELECT DROPDOWN */}
        <View>
          <Text style={generalStyles.loginSignupLabel}>Pronouns</Text>
          <SelectList
            setSelected={(val) => setNewPronouns(val)}
            data={editPronouns}
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder={newPronouns.length ? newPronouns : "Select your pronouns"}
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
        {loading ? <ActivityIndicator size={'small'} color={COLORS.textColorFull}/> : 
        <TouchableOpacity
          onPress={handleSubmit}
          style={[generalStyles.button, { marginTop: 20, marginBottom: 280 }]}
        >
          <Text style={generalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
        }
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  password: {
    justifyContent: "space-between",
    backgroundColor: COLORS.backgroundLight,
    opacity: 0.6,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  profileImageSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'gray',
    objectFit: "cover",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  backgroundImage: {
    width: "100%",
    height: 140,
    backgroundColor: 'gray',
    objectFit: "cover",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
});
