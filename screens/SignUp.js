import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constant/default";
import generalStyles from "../constant/generalStyles";
import ProviderButtons from "../components/ProviderButtons";
import pic from "../assets/images/search.png";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function handleSubmit() {
    if (!password.length || !username.length || !email.length || !name.length) {
      setError(
        "No entries should be left empty"
      );
    } else if (!email.match(emailRegex)) {
      setError("Email is not in the right format");
    } else if (password.length < 6) {
      setError("Password has to have 6 characters or more");
    } else {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {

            const user = userCredential.user;
            async function verify() {
              try {
                await setDoc(doc(db, 'users', user.uid), {
                  id: user.uid,
                  username: username,
                  email: email,
                  name: name,
                  bio: null,
                  pronouns: null,
                  profileImage: null,
                  profileBackgroundImage: null,
                  createdAt: serverTimestamp()
                })

                setPassword("");
                setUsername("");
                setName("");
                setEmail("");
                setError("")
                setLoading(false);
                navigation.navigate("Root");

              } catch (err) {
                setError(err.message)
                setLoading(false)
              }
                
            }
            
            verify() 
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
    }
  }

  return (
    <SafeAreaView style={generalStyles.default}>
      <View style={generalStyles.loginSignupSection}>
        <Text style={generalStyles.loginSignupTitle}>Register</Text>
        <View>
          {/* ERROR MESSAGE */}
          {error.length > 0 && (
            <View style={generalStyles.error}>
              <Text style={generalStyles.errorText}>{error}</Text>
            </View>
          )}
          {/* NAME LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Name</Text>
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
          {/* USERNAME LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Username</Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
          {/* EMAIL LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Email</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="someone@example.com"
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
          {/* PASSWORD LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Password</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="&#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022;"
              keyboardType="visible-password"
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
              secureTextEntry={true}
            />
          </View>
        </View>
        <ProviderButtons text={"Sign In With Google"} image={pic} />
        <View style={generalStyles.loginSignupBottom}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={generalStyles.loginSignupBottomText}>
              Log in instead
            </Text>
          </Pressable>
          {loading ? (
            <ActivityIndicator color={COLORS.textColorFull} />
          ) : (
            <TouchableOpacity
              style={generalStyles.loginSignUpButton}
              onPress={handleSubmit}
            >
              <AntDesign
                name="arrowright"
                size={24}
                color={COLORS.backgroundFull}
              />
              <Text style={generalStyles.loginSignUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
