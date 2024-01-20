import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import generalStyles from '../../constant/generalStyles'
import { COLORS } from '../../constant/default'
import { FontAwesome } from '@expo/vector-icons';
import { ShareIcon, ArrowLeftEndOnRectangleIcon } from 'react-native-heroicons/solid';
import HeaderTitle from '../HeaderTitle';


const MoreOptions = () => {
    const [ isPrivate, setIsPrivate ] = useState(false)
  return (
    <SafeAreaView style={[]}>
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
        <TouchableOpacity style={[generalStyles.rowCenter, {gap: 20, marginBottom: 10}]} onPress={() => {}}>
            <ArrowLeftEndOnRectangleIcon strokeWidth={1} size={24} color={COLORS.textColorFull}/>
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <View style={[generalStyles.lineBreak, {marginBottom: 10}]}></View>
        <Button title='Delete Account' color='red'/>
      </View>
    </SafeAreaView>
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