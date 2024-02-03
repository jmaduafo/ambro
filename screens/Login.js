import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constant/default'
import generalStyles from '../constant/generalStyles'
import ProviderButtons from '../components/ProviderButtons'
import pic from '../assets/images/search.png'
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth'
import { auth, provider } from '../firebase/config'
import HomeGroup from '../components/Navigations/HomeGroup'

const Login = ({navigation}) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  function handleSubmit() {
    if (!password.length || !email.length) {
    setError('Entries must not be empty. Please enter an email and password.')
    } else if (!email.match(emailRegex)) {
      setError('Email is not in the right format')
    } else if (password.length < 6) {
      setError('Password has to have 6 characters or more')
    } else {
      try {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userInfo = userCredential.user
          setPassword('')
          setEmail('')
          setLoading(false)
          navigation.navigate('Root', { screen: 'HomeGroup' })
        })
        .catch(err => {
          setError('The email or password is incorrect. Please try again.')
          setLoading(false)
        })
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
      
    }
  }

  function googleCredential() {
    signInWithCredential(auth, credential)
    .then((result) => {
      const credential = provider.credentialFromResult(result);
      const { user } = result;
      const idToken = credential.idToken;
      // return { credential, idToken, user };
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      setError(errorMessage)
      // The email of the user's account used.
      // const {email} = error.customData
      // The AuthCredential type that was used.
      // const credential =
      //    GoogleAuthProvider.credentialFromError(error)
      // ...
    });
  }

  return (
    <SafeAreaView style={generalStyles.default}>
      <View style={generalStyles.loginSignupSection}> 
        <Text style={generalStyles.loginSignupTitle}>Sign In</Text>
        <View>
          {/* ERROR MESSAGE */}
          {error.length > 0 && 
          <View style={generalStyles.error}>
            <Text style={generalStyles.errorText}>{error}</Text>
          </View>
          }
          {/* EMAIL LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Email</Text>
            <TextInput
              onChangeText={text => setEmail(text)}
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
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder='&#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022;'
              keyboardType='visible-password'
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <ProviderButtons text={'Sign In With Google'} image={pic} onPress={googleCredential}/>
        </View>
        <View style={generalStyles.loginSignupBottom}>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={generalStyles.loginSignupBottomText}>Register instead</Text>
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
              <Text style={generalStyles.loginSignUpButtonText}>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: COLORS.backgroundFull
    }
})