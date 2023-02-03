import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View ,Alert,} from 'react-native'

import Background from '../components/comps/Background'
import BackButton from '../components/btns/BackButton'
import ForgetPassImage from '../components/Images.js/forgetPassImage'
import Header from '../components/headers/Header'
import TextInput from '../components/comps/TextInput'
import Button from '../components/btns/Button'
import { numberValidator } from '../helpers/mobileValidator'
import { RPSmsModal } from '../components/modals/ResetPasswordModal/RPSmsvalidation';
import axios from 'axios';
import LoadingAnimation from '../components/LoadingAnimation'

export default function ResetPasswordScreen({ navigation }) {
  
  const [waiting,setWaiting]=useState(false)

  const [mobile, setmobile] = useState({ value: '', error: '' })
  const [RPsmsmodalVisible, setRPsmsmodalVisible] = useState(false);
  const [RPsmsToken, setRPsmsToken] = useState();
///////////////////////////////////////////////////
  const onAcceptPress = async () => {
 
    const mobileError = numberValidator(mobile.value )
    
    if (mobileError ) {
      setmobile({ ...mobile, error: mobileError })
           //09215164458
              //ali25ali25Ali  
    }else{
      setWaiting(true)

       const newPasswordData = {
        "mobile": mobile.value,
   
       }
       await axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/request-send-reset-pass/', {
        mobile: newPasswordData["mobile"],
        
      } )
     
        .then(function (response,r) {
            if(response.status === 200){  
            
              setRPsmsToken(response.data.token)            
              setRPsmsmodalVisible(!RPsmsmodalVisible)
              setmobile({ value: '', error: '' })
            }
        })
        .catch(error=>{
          setWaiting(false)
          setmobile({ value: '', error: '' })
          if (error.response.status==400){
            Alert.alert(
              " 400خطا",
               " ",
               [
                
                {
                  text: "باشه",
                  
                  style: "cancel",
                } 
              ],
            );
          }      
        } 
    );
      return    
    } 
  }
  

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ForgetPassImage />
      <Header>بازیابی رمز ورود</Header>
      <RPSmsModal  RPsmsmodalmodalVisible={RPsmsmodalVisible}
                        changeVisibaleState={RPsmsmodalVisible=>setRPsmsmodalVisible(RPsmsmodalVisible)}
                        navigation = {navigation}
                        smsToken={RPsmsToken}/>
      <TextInput
        label="شماره تلفن همراه"
        keyboardType='phone-pad'
              returnKeyType="next"

        value={mobile.value}
        onChangeText={(text) => setmobile({ value: text, error: '' })}
        error={!!mobile.error}
        errorText={mobile.error}
        autoCapitalize="none"
          description="پس از ارسال کد مورد نیاز به شما پیامک خواهد شد"
      />

{ waiting ==false ? <Button
        mode="contained"
        onPress={()=>{onAcceptPress()}}
        style={{ marginTop: 16 }}
      >
        ارسال کد تایید
      </Button> : <LoadingAnimation/>      

}
      
    </Background>
  )
}
