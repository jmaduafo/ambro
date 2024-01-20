import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderTitle from '../HeaderTitle'

const ForYou = () => {
  return (
    <View>
        <HeaderTitle title={'for you'} featured={'no'} paddingLeft={30} paddingRight={30}/>
    </View>
  )
}

export default ForYou

const styles = StyleSheet.create({})