import React, { useState } from 'react'
import { StyleSheet,View,Text,Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default function APPIntro({navigation}) {
  const [showRealApp,setshowRealApp]=useState(false)
    const slides = [
        {
          key: 1,
          title: 'Title 1',
          text: 'Description.\nSay something cool',
         image: require('../../assets/IntroAppImg.jpg'),
        },
        {
          key: 2,
          title: 'Title 2',
          text: 'Other cool stuff',
          image: require('../../assets/IntroAppImg.jpg'),
        },
        {
          key: 3,
          title: 'Rocket guy',
          text: 'Im already out of descriptionsLorem ipsum bla bla bla',
         image: require('../../assets/IntroAppImg.jpg'),
        }
      ];

  
       const renderItem = ({ item }) => {
        return (
          <View style={styles.slide} >
            <Text style={styles.title} >{item.title}</Text>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.text} >{item.text}</Text>
          </View>
        );
      }
       const onDone = () => {
        setshowRealApp(true);
        
        
      
      }
   
      if (showRealApp) {
        navigation.navigate({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      } else {
        return (
        <View>
            <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone}/>;
        </View>
        );
        
        
      }
}
const styles = StyleSheet.create({
 
  slide: {
    flex:3,
  padding: 20,
  width: '100%',
  maxWidth: 340,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
     width: 250,
      maxWidth:300,
      minWidth: 200,
      height:150,
     
      
    }, title: {
      color:'#22bcb5',
       padding: 20,
      
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',

      
    }, text: {
      padding:5,
      margin:10,
      width: 150,
      maxWidth: 75,
      minWidth: 50,
      height:150,
     
      
    }, image: {
      width: 280,
  maxWidth: 200,
  minWidth: 180,
  height:200,
    }
})


