import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SHADOW } from '../../constant/default'
import { AntDesign } from '@expo/vector-icons';

const TopDisplay = () => {
  return (
    <View style={styles.section}>
      <View style={styles.slide}>
        <Text style={styles.slideText}>Featured</Text>
        <Text style={styles.slideText}>Recommended</Text>
        <Text style={styles.slideText}>Hot</Text>
      </View>
      <View style={styles.colSection}>
        <View style={styles.col1}>
          <TouchableOpacity style={styles.col1Profile} >
            <Image/>
          </TouchableOpacity>
          <View style={styles.col1Heart}>
            <AntDesign name="hearto" size={35} color={COLORS.textColorFull} />
          </View>

        </View>
        <View style={styles.col2}>
          <View></View>
          <Text></Text>
        </View> 
      </View>     
    </View>
  )
}

export default TopDisplay

const styles = StyleSheet.create({
  section: {
    marginTop: 40,
    paddingRight: 30
  },
  slide: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  slideText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColorFull,
    // backgroundColor: 'black',
  },
  colSection: {
    flexDirection: 'row',
    height: 240,
    gap: 10,
    marginTop: 20
  },
  col1: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    shadowColor: SHADOW.color,
    shadowOffset: {width: 4, height: SHADOW.offsetHeight},
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    borderRadius: 30,
    borderTopLeftRadius: 0,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  col1Profile: {
    width: 50,
    height: 50, 
    borderRadius: '50%', 
    backgroundColor: 'black'
  },
  col1Heart: {
    marginTop: 'auto'
  },
  col2: {
    flex: 3.5,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 30,
    shadowColor: SHADOW.color,
    shadowOffset: {width: 4, height: SHADOW.offsetHeight},
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
  },
})