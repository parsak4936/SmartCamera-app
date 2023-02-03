import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text,ScrollView,Alert} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../../../smartHomeFuncs/Door/opendoor/door';
import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
import Button from '../../btns/Button'
import TextInput from '../../comps/TextInput'
import axios from 'axios';
import { NewPAsswordValidator } from '../../../helpers/NewPasswordValidator'
import { numberValidator } from '../../../helpers/mobileValidator'
import {EqualValidator} from '../../../helpers/equalChecker'
import NewPass from '../../Images.js/newPass'
import LoadingAnimation from '../../LoadingAnimation'
import BackButton from '../../btns/BackButton'

export   function PRNewPassword(props) {
    /////////////////////////
    const RPNewPasswordVisible=props.RPNewPasswordVisible;
    const RPsmstoken = props.RPsmstoken;
    const [PinCode, setPinCode] = useState({ value: '', error: '' });
    const [newPassword, setnewPassword] = useState({ value: '', error: '' });
    const [confirmNewPass, setconfirmNewPass] = useState({ value: '', error: '' });
   // const [equal, setequal] = useState({ value: '', error: '' });
   const [waiting,setWaiting]=useState(false)

//////////////////////////////////////
     const onAcceptPress = async () => {
      const newPasswordError = NewPAsswordValidator(newPassword.value)
      const CnewPasswordError = NewPAsswordValidator(confirmNewPass.value)
      const PinCodeError = numberValidator(PinCode.value)
      //const equalization = EqualValidator(newPassword.value,confirmNewPass.value)

  
        if(newPasswordError|| CnewPasswordError ||PinCodeError ){
          setnewPassword({ ...newPassword, error: newPasswordError })
          setconfirmNewPass({ ...confirmNewPass, error: CnewPasswordError })
          setPinCode({ ...PinCode, error: PinCodeError })
         // setequal({ ...equal, error:  ualization })

        }else{
              if(newPassword.value==confirmNewPass.value){
                setWaiting(true);
                const newPasswordData = {
               
                  "serial_rest_password":PinCode.value,
                  "new_password":newPassword.value,
                  "repeat_newpassword":confirmNewPass.value,
                  "token" : RPsmstoken
             
                 }
                 await axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/change-password-with-token/', {
                   serial_rest_password:newPasswordData["serial_rest_password"],
                   new_password: newPasswordData["new_password"],
                   repeat_newpassword:newPasswordData["repeat_newpassword"],
                   token: newPasswordData["token"]
                  
                } )
               
                  .then(function (response,r) {
                      if(response.status === 200){ 
                        setWaiting(false) 
      
                           props.navigation.reset({
                           index: 0,
                           routes: [{ name: 'LoginScreen' }],
                         })
                         
                      }
                  })
                  .catch(error=>{
                    setWaiting(false);
                    if (error.response.status==400){
                      Alert.alert("خطا 400")
          
                    }     
                  } 
              );
                return   
              } else{
                Alert.alert("رمز عبور با تکرار آن تطابق ندارد ")

              }
        }
    
      
 }
 

  return (

     
    <Modal
          onRequestClose={  () => {
            setWaiting(false)
            setnewPassword({ value: '', error: '' })
            setPinCode({ value: '', error: '' })
            setconfirmNewPass({ value: '', error: '' })
            props.changeVisibaleState(!RPNewPasswordVisible)}}

    animationType="fade"
            visible={RPNewPasswordVisible}  >

           <View style={globalmodalStyles.centeredView} >
           <ScrollView  style={ {flex:1,
                          width:'100%',
                          height:'100%',
                          padding: 20,
                          backgroundColor: "white",
                        }}>
      <BackButton goBack={() => {
            setWaiting(false)
            setnewPassword({ value: '', error: '' })
            setPinCode({ value: '', error: '' })
            setconfirmNewPass({ value: '', error: '' })
            props.changeVisibaleState(!RPNewPasswordVisible)
          }}/>
                <View style={{marginTop:50}}>
              <Text style={{ 
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
         textAlign: "center"}}>  اطلاعات خواسته شده را وارد نمایید  </Text>
         <View style={{marginTop:100,}}>
         <NewPass />

         </View>
           
         
              </View>
           
            

               <TextInput
                  label=" پین کد  "
                  returnKeyType="next"
                  keyboardType='phone-pad'

                  value={PinCode.value}
                  onChangeText={(text) => setPinCode({ value: text, error: '' })} 
                  autoCapitalize="none"
                    error={!!PinCode.error}
                    errorText={PinCode.error} />
               
                  <TextInput
                  label=" رمز جدید  "
                  secureTextEntry

                  returnKeyType="next"
                  value={newPassword.value}
                  onChangeText={(text) => setnewPassword({ value: text, error: '' })}
                  autoCapitalize="none" 
                  error={!!newPassword.error}
                  errorText={newPassword.error }/>

                  <TextInput
                          secureTextEntry

                  label=" تکرار رمز جدید  "
                  returnKeyType="next"
                  value={confirmNewPass.value}
                  onChangeText={(text) => setconfirmNewPass({ value: text, error: '' })}
                  autoCapitalize="none" 
                  error={!!confirmNewPass.error}
                  errorText={confirmNewPass.error}/>

{waiting==false ?   <Button 
                   style={globalmodalStyles.button}
                   onPress={() => {
                    //setRPsmsmodalVisible(!RPsmsmodalVisible)
                    onAcceptPress();
                   
                   }}>
                              تایید
                  </Button>
                  : <View style={{alignItems:"center",
                                alignContent:"center",
                                justifyContent:"center",}}><LoadingAnimation /></View>
                               
                            }
               
         
   
               
             </ScrollView>
           </View>
         </Modal>
   
  );
}
 