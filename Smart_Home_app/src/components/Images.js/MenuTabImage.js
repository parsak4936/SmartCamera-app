import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function MenuTabImage() {
  return(
    
     <Image source={require('../../assets/MenuTabModal.png')} style={styles.image} />
     
     
    
  ) 
}

const styles = StyleSheet.create({
  image: {
    flex:3,
    width: '95%',
    maxWidth: '100%',
    minWidth: '80%',
    height:600, resizeMode: 'contain'
   
    
  },
})
