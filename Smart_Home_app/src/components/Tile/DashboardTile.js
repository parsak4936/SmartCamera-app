import Button from '../../components/btns/Button'

 import {WeatherCards} from './WeatherCard'
import { Tile} from 'react-native-elements';
import React, { useState,useEffect } from 'react';
import { View, ScrollView, StyleSheet,ImageBackground, Image, Pressable } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import WeatherAPI from '../weather/weatherAPI'
import DashboardTileImage from '../Images.js/DashboardTileImage'
export default function DashboardTile( ) {
  const image = { uri: "https://reactjs.org/logo-og.png" };

const [streamActivator,setstreamActivator]=useState(false)
const [counter,setcounter]=useState(0)

useEffect(() => {
 
     const interval = setInterval(() => {
      setstreamActivator(false)
     
   }, 20000);
   return () => clearInterval(interval);
 
}, []);

 
  return (

    <View
     style={styles.container}>

      {
streamActivator ==false ? <ImageBackground
source={require('../../assets/security.jpg')} 
resizeMode="cover"
 style={styles.image}>
<Pressable style={{backgroundColor: 'rgba(255,255,255, 0.8)',} } >
<Button   onPress={()=>{setstreamActivator(true)}} >پخش زنده دوربین</Button>

</Pressable>
    {/* <WeatherAPI/> */}
   
 
  </ImageBackground> :
  <ImageBackground
  onPress={()=>{setstreamActivator(false)}}

  source={require('../../assets/streamGif.gif')} 
  resizeMode="cover"
   style={styles.image}>
 
       {/* <WeatherAPI/> */}
     
   
    </ImageBackground>

      }
  
    
  </View>

   
  )
}
 
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  image: {
    
    height:220,
    marginLeft:20,
    marginRight:20,

    borderRadius:15,
    padding:26,
    justifyContent: "center"
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});