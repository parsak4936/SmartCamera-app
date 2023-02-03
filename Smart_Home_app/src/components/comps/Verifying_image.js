import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return(
      <Image source={require('../../assets/verifyImg.png')} style={styles.image} />
      
  ) 
}

const styles = StyleSheet.create({
  image: {
     flex: 1,
        width: '100%',
        resizeMode: 'contain',  
        maxWidth: '100%',
        minWidth: '80%',
        height:200
    
    
  },
})
