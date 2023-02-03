import React, { useState,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/comps/Background'
import Verify_img from '../components/comps/Verifying_image'
import Header from '../components/headers/Header'
import Button from '../components/btns/Button'
import TextInput from '../components/comps/TextInput'
 import { theme } from '../core/theme'
 import BackButton from '../components/btns/BackButton'
 import axios from 'axios';
  import { nameValidator } from '../helpers/nameValidator'
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import LoadingAnimation from '../components/LoadingAnimation'

export default function VariftScreen({route, navigation }) {
   const [SMSCode,setSMScode]=useState("")
  // const [SystemID,setSystemID]=useState("")
  const [waiting,setWaiting]=useState(false)

   //const { Token } = ;
   const Token = route.params.Token
  console.log("this is VariftScreen token"+Token)

   const storeData = async (Token,SystemID) => {
    try {
      await AsyncStorage.setItem('@Token', Token)
      await AsyncStorage.setItem('@SystemID', SystemID)

    } catch (e) {
       console.log(e.message);
    }
  }   
            
        
        

  const sending_request   = async(evt) => {
    evt.preventDefault();
  setWaiting(true)

     const userSmsCode = {
      "token":  Token,
      "sms_code": SMSCode
    }
    console.log("after usersms code")

     await axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/login-step2/ ', {
        token: userSmsCode["token"],
        sms_code: userSmsCode["sms_code"]
          
         
     },{
      withCredentials: true,} )
         .then(function (response) {
             if(response.status === 200){   
               const  ValidationToken  =  response.data.token ;
               const Data = {
                "Authorization":ValidationToken,
                 
              }
 
               //getting system id and saving token with it in local storage
              axios.get('http://smartvideodoorphoneproject.herokuapp.com/generall/get-information/',{
                
                  headers: {Authorization: Data["Authorization"], }
                } ).then(function(response){
                 
                  const SystemID = response.data.doorSecurity[0].hash_serial_rasperyPi;
                   console.log(response.data.doorSecurity[0].hash_serial_rasperyPi)
                  //save toke n ba systemid into the local storage
                  storeData(ValidationToken ,SystemID)
                 // setSystemID(SystemID)
                 
                  navigation.navigate('Dashboard' ,{authorizationToken :ValidationToken,SystemID:SystemID}) 

                })

              
               //09215164458
              //ali25ali25
             //SMS Code 123456
            
                 
             }
         })
         .catch(error=>{
           setWaiting(false)
           //TODO :   401 & 404 &
 Alert.alert("کد وارد شده اشتباه میباشد")
          } 
     );
    
  }
  
  

  return (
<SafeAreaView  >
{/* <Background> */}
          
<ScrollView style={styles.verifyBody}>
    {/* <BackButton goBack={() => navigation.navigate('LoginScreen')} /> */}
<View style={{marginTop:"10%"}}>
  <View  style={styles.head}>
  <Header> اهراز حویت</Header>

  </View>

<Image source={require('../assets/verifyImg.png')} style={{width: '100%',
        resizeMode: 'contain',  
        maxWidth: '100%',
        minWidth: '80%',
        height:200}} />

 


<Text style={{ marginTop:25,
  justifyContent:'center',
alignItems:"center",
 
         
        
      }} >لطفا کد اررسال شده به تلفن همراه خود را وارد نمایید </Text>

<TextInput
      keyboardType='phone-pad'

  value={SMSCode}
  label="رمز ارسال شده"
  returnKeyType="next"
  onChangeText={smscode => setSMScode(smscode)}
/>


{waiting==false ?
<Button
style={{width:'100%',marginTop:30}}

  mode="contained"
  onPress={sending_request}
 >
  تایید
</Button> : <View style={{alignItems:"center",
    alignContent:"center",
justifyContent:"center",}}><LoadingAnimation /></View>
}

<View style={styles.row}>
<TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
    <Text style={styles.link}> ارسال دوباره</Text>
  </TouchableOpacity>
  <Text>کد را دریافت نکرده اید ؟</Text>
 
</View>


</View>

</ScrollView>
  
    {/* </Background> */}
</SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  verifyBody:{
    padding:40,
    backgroundColor:'white',
    height:"100%"
  },
  head:{ alignItems:"center",
    alignContent:"center",
justifyContent:"center",
    width:'100%',
    height:80
  },
  row: {
   
    alignContent:'center',
    justifyContent:'center',
    flexDirection: 'row',
    marginTop: 14,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
