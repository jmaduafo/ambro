import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState} from 'react'
import { COLORS, SHADOW } from '../../constant/default'
import { AntDesign } from '@expo/vector-icons';

const TopDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [topName, setTopName] = useState('Featured')

  const topSelectors = ['Featured', 'Recommended', 'Hot']

  function topSelect(name) {
    setTopName(name)
  }
  return (
    <View style={styles.section}>
      <View style={styles.slide}>
        {topSelectors.map(top => {
          return (
            <View key={top} style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text onPress={() => topSelect(top)} style={top === topName ? styles.slideTextSelected : styles.slideText}>{top}</Text>
              <View style={ top === topName ? styles.underline : styles.noUnderline }></View>
            </View>
          )
        })}
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
  slideTextSelected: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColorFull,
  },
  slideText: {
    fontFamily: 'Satoshi-Regular',
    color: COLORS.textColor50,
  },
  underline: {
    width: '30%',
    height: 2,
    borderRadius: 4,
    backgroundColor: COLORS.textColorFull,
    marginTop: 3
  },
  noUnderline: {
    width: '0%',
    height: 2,
    borderRadius: 4,
    backgroundColor: COLORS.textColorFull,
    marginTop: 3
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