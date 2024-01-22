import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Modal from './Modal'
import generalStyles from '../constant/generalStyles'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { COLORS } from '../constant/default'

const ReAuthenticate = () => {
    const [ oldPassword, setOldPassword] = useState('')
    const [ newPassword, setNewPassword] = useState('')
  return (
    <>
      <Modal>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Pressable onPress={() => {}}>
                <XMarkIcon color={COLORS.textColorFull}/>
            </Pressable>
        </View>
        {/* <OldPassword oldPassword={oldPassword} setOldPassword={setOldPassword}/> */}
        <NewPassword newPassword={newPassword} setNewPassword={setNewPassword}/>
      </Modal>
    </>
  )
}

export default ReAuthenticate

function OldPassword({oldPassword, setOldPassword }) {
    
    function handleSubmit() {

    }
    return (
        <>  
            <View style={[generalStyles.error, { marginBottom: 15}]}>
                <Text style={generalStyles.errorText}>Wrong password</Text>
            </View>
            <Text style={generalStyles.loginSignupLabel}>Enter your password</Text>
            <TextInput
                placeholder='&#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022;'
                style={generalStyles.loginSignupInput}
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
                secureTextEntry={true}
                />
            <TouchableOpacity onPress={handleSubmit} style={[generalStyles.loginSignUpButton, { justifyContent: 'center', gap: 0, marginTop: 10} ]}>
                    <Text style={[generalStyles.loginSignUpButtonText]}>Submit</Text>
            </TouchableOpacity>
        </>
    )
}

function NewPassword({ newPassword, setNewPassword }) {
    function handleSubmit() {
        
    }

    return (
        <>
            <View style={[generalStyles.error, { marginBottom: 15}]}>
                <Text style={generalStyles.errorText}>Wrong password</Text>
            </View>
            <Text style={generalStyles.loginSignupLabel}>Enter your new password</Text>
            <TextInput
                placeholder='&#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022; &#x2022;'
                style={generalStyles.loginSignupInput}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                secureTextEntry={true}
                />
            <TouchableOpacity onPress={handleSubmit} style={[generalStyles.loginSignUpButton, { justifyContent: 'center', gap: 0, marginTop: 10} ]}>
                    <Text style={[generalStyles.loginSignUpButtonText]}>Submit</Text>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({})