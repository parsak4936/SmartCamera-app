import React, { useCallback, useEffect, useState } from 'react';
import { Text, View,Alert,ImageBackground,StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Images.js/Logo'
import LoadingAnimation from '../components/LoadingAnimation'
import SplashScreenImage from '../components/Images.js/SplashScreen'
import SplashScreenTextImage from '../components/Images.js/SplashScreenText'
import axios from 'axios';
import Refresher from '../components/Refresher'
export default function spScreen({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [noInternet, setnoInternet] = useState(false);
  const [tokenValidator, settokenValidator] = useState();
  
 
   const getData = async () => {
   
    try {
      // await AsyncStorage.removeItem('@storage_Key')
      // await AsyncStorage.removeItem('@Token')
      // await AsyncStorage.removeItem('@SystemID')

      const TokenValue = await AsyncStorage.getItem('@Token')
      const SystemIDValue = await AsyncStorage.getItem('@SystemID')
      
  
    const Data = {
      "token":  " "+TokenValue,
     
    }
    if(TokenValue == null & SystemIDValue==null ) {
      
        navigation.push('LoginScreen');

      
    }else{
      axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/check-token/',
      {token : Data["token"] } 
      )
      
    .then(function (response) {
        if(response.status === 200){
          
          navigation.push('Dashboard' ,{authorizationToken :TokenValue ,SystemID:SystemIDValue}) 

        
       }  
    })
  
    .catch(error=>{ if(error.response.status ==401){
      console.log("no permission")
      Alert.alert(
        " مدت زمان توکن اتمام یافته    ؟",
         "   لطفا دوباره وارد شوید",
         [
          
          {
            text: "باشه",
            onPress: () =>         navigation.push('LoginScreen'),

            style: "cancel",
          }
        ],
      );
    } console.log(error.message);})  

    }


   
     
 
    } catch(e) {
      console.log(e.message)
    }
  }


  
 
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      
      } catch (e) {
        console.warn(e.message);
      } finally {
        
        // Tell the application to render
         console.log("app has been rendered")
        setAppIsReady(true);
          //
        
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);

  if (!appIsReady) {
   
    return null;
  }
  const unsubscribe = NetInfo.addEventListener(async state => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
   
      
    if(state.isConnected){
      getData();
 
    }
    else{
      return( setnoInternet(true));
    }
  });
  
  return (
   
   <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>

<SplashScreenImage />
                   <SplashScreenTextImage/>
      <Text style={{
        marginBottom:40
      }}>خوش آمدید</Text>
       { noInternet===false ? <LoadingAnimation/> : <View> به شبکه متصل نمیباشید<Refresher/> </View>}
      
      </View>
     
  );
}
 