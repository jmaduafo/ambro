import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import generalStyles from '../../constant/generalStyles'
import { COLORS } from '../../constant/default'
import { SelectList } from 'react-native-dropdown-select-list'
import { editPronouns } from '../../utils/userEdit';

const EditProfile = () => {
  const [ newBio, setNewBio ] = useState('')
  const [ newUsername, setNewUsername ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newPronouns, setNewPronouns ] = useState(null)
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20}}>
        {/* USER USERNAME */}
        <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Name</Text>
          <View style={[generalStyles.rowCenter, {justifyContent: 'space-between'}]}>
            <Text>Gina</Text>
            <TouchableOpacity style={generalStyles.tagSection}>
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Username</Text>
          <View style={[generalStyles.rowCenter, {justifyContent: 'space-between'}]}>
            <Text>@ginawonder</Text>
            <TouchableOpacity style={generalStyles.tagSection}>
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* USER BIO INPUT */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Bio</Text>
          <TextInput
            style={generalStyles.loginSignupInput}
            numberOfLines={4}
            editable
            multiline
            maxLength={240}
            onChangeText={text => setNewBio(text)}
            value={newBio}
            placeholder='Let us know who you are'
            placeholderStyle={{color: COLORS.textColor50}}
            />
        </View>
        {/* USER BIO WORD COUNT */}
        <View>
          <Text style={[generalStyles.defaultParagraph, {textAlign: 'right', fontSize: 13, color: COLORS.textColor50}]}>{newBio.length} / 240</Text>
        </View>
        <View>
          <Text style={generalStyles.loginSignupLabel}>Pronouns</Text>
          <SelectList 
            setSelected={(val) => setNewPronouns(val)} 
            data={editPronouns} 
            save="value"
            search={false}
            searchicon={() => <View></View>}
            placeholder="Select your pronouns"
            inputStyles={{ fontFamily: 'Satoshi-Regular', color: COLORS.textColorFull}}
            boxStyles={{ borderColor: COLORS.textColorFull, backgroundColor: COLORS.backgroundLight}}
          />
        </View>
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({})