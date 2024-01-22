import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import generalStyles from '../../constant/generalStyles'
import { COLORS } from '../../constant/default'
import { SelectList } from 'react-native-dropdown-select-list'
import { editPronouns } from '../../utils/userEdit';
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import Modal from '../Modal'
import ReAuthenticate from '../ReAuthenticate'

const EditProfile = () => {
  const [ newBio, setNewBio ] = useState('')
  const [ newUsername, setNewUsername ] = useState('ginalovely')
  const [ newName, setNewName ] = useState('Gina')
  const [ newPronouns, setNewPronouns ] = useState(null)
  const [ nameEdit, setNameEdit ] = useState(false)
  const [ usernameEdit, setUsernameEdit ] = useState(false)

  return (
    <View style={[ generalStyles.default, { position: 'relative'}]}>
      <ReAuthenticate/>
      <ScrollView style={{ marginTop: 40, paddingLeft: 20, paddingRight: 20}}>
        {/* USER USERNAME */}
        <View style={generalStyles.loginSignupInputSection}>
            <Text style={generalStyles.loginSignupLabel}>Name</Text>
          {/* EDIT NAME  */}
          <View style={[generalStyles.rowCenter, {justifyContent: 'space-between'}]}>
            <TextInput
            value={newName}
            onChangeText={text => setNewName(text)}
            // DISABLE USER'S ABILITY TO INPUT TEXT WHEN NOT IN EDIT MODE
            readOnly={nameEdit ? false : true}
            style={[generalStyles.loginSignupInput, { color: nameEdit ? COLORS.textColor75 : COLORS.textColor40, borderColor: nameEdit ? COLORS.textColorFull : COLORS.textColor50}]}
            />
            {/* IF EDIT BUTTON IS CLICKED, HIDE EDIT BUTTON AND SHOW SAVE BUTTON;
            IF SAVE BUTTON IS CLICKED, SHOW EDIT BUTTON */}
            <TouchableOpacity style={[generalStyles.tagSection, { display: nameEdit ? 'none' : 'block'} ]} onPress={() => setNameEdit(true)}>
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[generalStyles.tagSection, { display: nameEdit ? 'block' : 'none'} ]} onPress={() => setNameEdit(false)}>
              <Text style={generalStyles.tag}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* EDIT USERNAME */}
        <View style={generalStyles.loginSignupInputSection}>
          <Text style={generalStyles.loginSignupLabel}>Username</Text>
          <View style={[generalStyles.rowCenter, {justifyContent: 'space-between'}]}>
            <TextInput
              value={newUsername}
              onChangeText={text => setNewUsername(text)}
              readOnly={usernameEdit ? false : true}
              style={[generalStyles.loginSignupInput, { color: usernameEdit ? COLORS.textColor75 : COLORS.textColor40, borderColor: usernameEdit ? COLORS.textColorFull : COLORS.textColor50}]}
            />
            <TouchableOpacity style={[generalStyles.tagSection, { display: usernameEdit ? 'none' : 'block'} ]} onPress={() => setUsernameEdit(true)}>
              <Text style={generalStyles.tag}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[generalStyles.tagSection, { display: usernameEdit ? 'block' : 'none'} ]} onPress={() => setUsernameEdit(false)}>
              <Text style={generalStyles.tag}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[generalStyles.rowCenter, styles.password ]}>
          <Text style={{ fontFamily: 'Satoshi-Regular'}}>Change Password</Text>
          <ChevronRightIcon color={COLORS.textColor20} />
        </TouchableOpacity>
        <View style={[generalStyles.lineBreak, {marginTop: 15, marginBottom: 15}]}></View>
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
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  password: {
    justifyContent: 'space-between',
    backgroundColor: COLORS.backgroundLight,
    opacity: .6,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  }
})