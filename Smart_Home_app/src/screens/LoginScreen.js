import React, { useState,useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View ,Alert,} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/comps/Background'
import Logo from '../components/Images.js/Logo'
import Header from '../components/headers/Header'
import Button from '../components/btns/Button'
import TextInput from '../components/comps/TextInput'
import BackButton from '../components/btns/BackButton'
import { theme } from '../core/theme'
import axios from 'axios';
import { numberValidator } from '../helpers/mobileValidator'
 import { passwordValidator } from '../helpers/passwordValidator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'; 
import LoadingAnimation from '../components/LoadingAnimation'

export default function LoginScreen( { navigation }) {
  const [mobile, setmobile] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [token, setUserToken] = useState('')
  const [invalidUser,setinvalidUser] = useState('')
 
const [waiting,setWaiting]=useState(false)
//const [secureTextEntry, setSecureTextEntry] = useState(false);

//const toggleSwitch = () => setVisibleChanger(previousState => !previousState);
//const [secure, setSecure] = useState(secure);

//09215164458
//ali25ali25
 //SMS Code 123456
  const onLoginPressed = async (e) => {
    e.preventDefault();
    const mobileError = numberValidator(mobile.value )
    const passwordError = passwordValidator(password.value)
  

    if (mobileError || passwordError) {
      setmobile({ ...mobile, error: mobileError })
      setPassword({ ...password, error: passwordError })
      
    }else{
      setWaiting(true)

      const user = {
        "mobile": mobile.value,
        "password": password.value
      }
        axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/login-step1/', {
        mobile: user["mobile"],
        password: user["password"]
      } )
     
        .then(function (response,r) {

            if(response.status === 200){   
                        console.log("login was successful")
          
               const UserValidtoken = response.data.token;
               navigation.push('VariftScreen',{Token :UserValidtoken});
           
             
            } else{
              setinvalidUser(response)
              console.log("this is invalid user content"+invalidUser)
              console.log( typeof(invalidUser) )


            }
        })
        .catch(error=>{
 setWaiting(false)
Alert.alert(
  " خطا",
   " شماره یا رمز ورود اشتباه میباشد (از انلاین بودن دستگاه اطمینان حاصل فرمایید)",
   [
    
    {
      text: "باشه",
      
      style: "cancel",
    } 
  ],
);
         
          
        } 
    );
      return
      
      
    }
   
  }


  
  return (
    <SafeAreaProvider>
       
<Background>
         
 
      <Logo  />
     
      <Header>لطفا اطلاعات خود را وارد کنید..</Header>
      <TextInput
      keyboardType='phone-pad'
        label="شماره تلفن"
        returnKeyType="next"
        value={mobile.value}
        onChangeText={(text) => setmobile({ value: text, error: '' })}
        error={!!mobile.error}
        errorText={mobile.error}
        autoCapitalize="none"
       
      />
      

      <TextInput
        label="رمز"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
         
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassWordScreen')}
        >
          <Text style={styles.forgot}>رمز ورودتان را فراموش کرده اید ؟</Text>
        </TouchableOpacity>
      </View>
{ waiting ==false ? <Button mode="contained" onPress={onLoginPressed}>
      <FontAwesome name="sign-in" size={24} color="white" />
        <Text style={styles.text}> ورود</Text>
      </Button> :
       
      
      <LoadingAnimation/>      

}

     
    
    </Background>

    </SafeAreaProvider>
    
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  text:{
color:'white'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
 
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
