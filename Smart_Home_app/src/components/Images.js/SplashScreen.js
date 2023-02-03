import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function SplashScreenImage() {
  return(
      
           <Image source={require('../../assets/BlackLogo.png')} style={styles.image1} />
      
      
     
  ) 
}

const styles = StyleSheet.create({
    container :{
            width:'100%',
            height:400,
    },
  image1: {
    width: '95%',
    maxWidth: '100%',
    minWidth: '80%',
    height:200, resizeMode: 'contain'
   
    
  },
  image2: {
    width: '95%',
    maxWidth: '100%',
    minWidth: '80%',
    height:200, resizeMode: 'contain'
   
    
  },
})
