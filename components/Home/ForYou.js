import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitle from '../HeaderTitle'

const ForYou = ({ navigate }) => {
  return (
    <View>
        <HeaderTitle title={'for you'} select='For You' featured={'no'} navigate={navigate} paddingLeft={30} paddingRight={30}/>
    </View>
  )
}

export default ForYou

const styles = StyleSheet.create({})