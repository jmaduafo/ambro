import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constant/default'

const HeaderTitle = ({title, featured}) => {
  return (
    <View style={styles.position}>
      <Text style={styles.text}>{title}</Text>
      {featured === 'no' &&
      <Pressable onPress={() => {}}>
        <Text style={styles.viewAll}>View All</Text>
      </Pressable>
      }
    </View>
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
    position: {
        marginBottom: 20,
        marginTop: 40,
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    text: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 18,
        textTransform: 'capitalize',
        color: COLORS.textColorFull,
        letterSpacing: -1
    },
    viewAll: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 13,
        color: COLORS.textColor75,
        letterSpacing: -1
    }
})