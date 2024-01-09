import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constant/default'
import generalStyles from '../constant/generalStyles'
import ProviderButtons from '../components/ProviderButtons'
import pic from '../assets/adaptive-icon.png'
import { AntDesign } from '@expo/vector-icons';

const SignUp = ({navigation}) => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  return (
    <SafeAreaView style={generalStyles.default}>
      <View style={generalStyles.loginSignupSection}>
        <Text style={generalStyles.loginSignupTitle}>Register</Text>
        <View>
          {/* USERNAME LOGIN INPUT */}
          <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Username</Text>
            <TextInput
              onChangeText={text => setUsername(text)}
              value={username}
              style={generalStyles.loginSignupInput}
              placeholderTextColor={COLORS.textColor50}
            />
          </View>
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
        <ProviderButtons text={'Sign In With Google'} image={pic} />
        <View style={generalStyles.loginSignupBottom}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={generalStyles.loginSignupBottomText}>Log in instead</Text>
        </Pressable>
          <TouchableOpacity style={generalStyles.loginSignUpButton}>
            <AntDesign name="arrowright" size={24} color={COLORS.backgroundFull} />
            <Text style={generalStyles.loginSignUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})