import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function DashboardTileImage() {
  return(
      <Image source={require('../../assets/IntroAppImg.jpg')} style={styles.image} />
      
  ) 
}

const styles = StyleSheet.create({
  image: {
    width: '95%',
    maxWidth: '100%',
    minWidth: '80%',
    height:200, resizeMode: 'contain'
   
    
  },
})
