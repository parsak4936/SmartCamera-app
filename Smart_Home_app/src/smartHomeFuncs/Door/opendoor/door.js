import React,{useState} from 'react';
// import {globalmodalStyles} from '../../src/components/modals/GlobalModalStyle'
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Pressable, Modal,StyleSheet, View ,Text,Image,Alert} from 'react-native'
import Button from '../../../components/btns/Button'
import AwesomeAlert from 'react-native-awesome-alerts';
import babelConfig from '../../../../babel.config';
import LoadingAnimation from '../../../components/LoadingAnimation'

export default function opendoor(props){
 
  const AuthToken =props.authToken;
  const systemID = props.systemID;
  const [waiting,setWaiting]=useState(false)

    const openDoor=(token ,systemid)=>{ 
      setWaiting(true)
      const Data = {
        "Authorization":  " "+token,
        "systemid" : systemid ,
      }
     
      axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/open-door/ ',
      {hash_serial_rasperyPi : Data["systemid"]},
      {headers: {'Authorization': Data["Authorization"] }  } 
      )
    .then(function (response) {
        if(response.status === 200){   
          setWaiting(false)
          Alert.alert(
            " ",        
             " درب ورودی باز شد",
                       [
                        {
                          text: "باشه",
                         
                          style: "cancel",
                        }
                      ],
                    );
        //  console.log( "this is header token : "+response.data.message )
      }
      else{
        Alert.alert(
          " خطایی پیش آمده",        
           " درب ورودی باز نشد",
                     [
                      {
                        text: "باشه",
                       
                        style: "cancel",
                      }
                    ],
                  );
      }

    })
    .catch(error=>{
      setWaiting(false)

      if (error.response.status==303){
        Alert.alert(
"خطا 303",        
 " دسترسی به سرور قطع میباشد- از روشن بودن اطمینان حاصل فرمایید",
           [
            {
              text: "باشه",
             
              style: "cancel",
            }
          ],
        );
    
       } 
       else{
        Alert.alert(
          "خطایی پیش آمده",        
           " به پشتیبانی اطلاع تماس بگیرید",
                     [
                      {
                        text: "باشه",
                       
                        style: "cancel",
                      }
                    ],
                  );
       }
  
      console.log(error.message);
    console.log(error.response.status)})
        }   
      
       return(
           <View style={{flex:2}}>
             {waiting==false ? <Button  mode="outlined"  onPress={()=>{openDoor(AuthToken,systemID)}}>
       
       باز کردن در ورودی</Button> : 
       
       <LoadingAnimation/>} 
         
 
           </View>
       


       );
  
       }
 
 