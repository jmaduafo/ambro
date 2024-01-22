import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import generalStyles from '../../constant/generalStyles'
import { COLORS } from '../../constant/default'
import { FontAwesome } from '@expo/vector-icons';
import { ShareIcon, ArrowLeftEndOnRectangleIcon } from 'react-native-heroicons/solid';
import { signOut } from 'firebase/auth';
import HeaderTitle from '../HeaderTitle';
import Modal from '../Modal';
import { useNavigation } from '@react-navigation/native';


const MoreOptions = () => {
  const { navigate } = useNavigation()

    const [ isPrivate, setIsPrivate ] = useState(false)
    const [ message, setMessage] = useState('')

    function handleLogout() {
      signOut(auth).then(() => {
          // Sign-out successful.
          setMessage('')
          navigate('Login')
      }).catch((error) => {
          // An error happened.
          console.log(error)
          setMessage('Something went wrong when trying to log out. Please try again.')
      });
  } 

  return (
    <View style={{ flex: 1, position: 'relative'}}>
      {message && message.length &&
        <Modal>
          <Text style={{ fontFamily: 'Satoshi-Medium', textAlign: 'center'}}>{message}</Text>
          <TouchableOpacity style={[generalStyles.button, { marginTop: 20}]}>
            <Text style={[generalStyles.buttonText]}>Try Again</Text>
          </TouchableOpacity>
        </Modal>
      }
      <View style={styles.padding}>
        {/* <HeaderTitle title={'Settings'} featured={'yes'}/> */}
        <TouchableOpacity style={[generalStyles.rowCenter, {gap: 20, marginBottom: 10}]} onPress={() => setIsPrivate(prev => !prev)}>
            <View>
                {isPrivate ? <FontAwesome name="toggle-on" size={24} color={COLORS.textColorFull} /> : <FontAwesome name="toggle-off" size={24} color={COLORS.textColorFull} />}
            </View>
            <Text style={styles.text}>{isPrivate ? 'Private' : 'Public'}</Text>
        </TouchableOpacity>
        <View style={[generalStyles.lineBreak, {marginBottom: 10}]}></View>
        <TouchableOpacity style={[generalStyles.rowCenter, {gap: 20, marginBottom: 10}]} onPress={() => {}}>
            <ShareIcon strokeWidth={1} size={24} color={COLORS.textColorFull}/>
            <Text style={styles.text}>Share Profile</Text>
        </TouchableOpacity>
        <View style={[generalStyles.lineBreak, {marginBottom: 10}]}></View>
        <TouchableOpacity style={[generalStyles.rowCenter, {gap: 20, marginBottom: 10}]} onPress={handleLogout}>
            <ArrowLeftEndOnRectangleIcon strokeWidth={1} size={24} color={COLORS.textColorFull}/>
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <View style={[generalStyles.lineBreak, {marginBottom: 10}]}></View>
        <Button title='Delete Account' color='red'/>
      </View>
    </View>
  )
}

export default MoreOptions

const styles = StyleSheet.create({
    padding: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 40
    },
    text: {
        fontFamily: 'Satoshi-Medium',
        color: COLORS.textColorFull,
        fontSize: 15,
    }
})