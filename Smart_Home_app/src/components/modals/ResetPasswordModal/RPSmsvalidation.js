import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text,Alert} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../../../smartHomeFuncs/Door/opendoor/door';
import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
import Button from '../../btns/Button'
import TextInput from '../../comps/TextInput'
import {PRNewPassword} from './RPNewPassword'
import axios from 'axios';
import NewPass from '../../Images.js/newPass'
import LoadingAnimation from '../../LoadingAnimation'
import BackButton from '../../btns/BackButton'
import { ScrollView } from 'react-native-gesture-handler';

export   function RPSmsModal(props) {
/////////////////////////////////////
    const smsToken=props.smsToken;
   
    const RPsmsmodalmodalVisible=props.RPsmsmodalmodalVisible;
    const [RPNewPasswordVisible, setRPNewPasswordVisible] = useState(false);
    const [RPsmstoken, setRPsmstoken] = useState();
    const [SmsCodeInput, setSmsCodeInput] = useState("");
    const [waiting,setWaiting]=useState(false)

//////////////////////////////////////
   //09215164458
const onAcceptPress = async () => {
 
  setWaiting(true)
       const smstokenProcess = {
        "token":smsToken,
        "sms_code":SmsCodeInput,

   
       }
       await axios.post('http://smartvideodoorphoneproject.herokuapp.com/accounts/recive-codesms-and-send-token/', {
        sms_code:smstokenProcess["sms_code"],
        token: smstokenProcess["token"],
        
      } )
     
        .then(function (response,r) {
            if(response.status === 200){  
              setWaiting(false)

                setRPsmstoken(response.data.token)
                setRPNewPasswordVisible(!RPNewPasswordVisible)
                setSmsCodeInput('')

            }
        })
        .catch(error=>{
  setWaiting(false)
          if (error.response.status==400){
            Alert.alert("خطا 400")

          }   
          if (error.response.status==408){
            Alert.alert("خطا 408")

          }   
          if (error.response.status==500){
            Alert.alert("خطا 500")

          } 
             
        } 
    );
      return    
     
  }
  

/////////////////////////////////////
  return (
    <View>
     
    <Modal
      onRequestClose={  () =>{
        setWaiting(false)
        setSmsCodeInput('')
        props.changeVisibaleState(!RPsmsmodalmodalVisible)}}

    animationType="fade"
           transparent={true}
           visible={RPsmsmodalmodalVisible}  >
      <PRNewPassword  RPNewPasswordVisible={RPNewPasswordVisible}
                        changeVisibaleState={RPNewPasswordVisible=>setRPNewPasswordVisible(RPNewPasswordVisible)}
                        navigation = {props.navigation}
                        RPsmstoken={RPsmstoken}/>
 
           <View style={globalmodalStyles.centeredView} >
            <ScrollView  style={ {flex:1,
      width:'100%',
      height:'100%',
      padding: 20,
      backgroundColor: "white",
    }}>
             <BackButton goBack={() => {
            setWaiting(false)
            setSmsCodeInput('')
          props.changeVisibaleState(!RPsmsmodalmodalVisible)
          }}/>
             {/* <Pressable
                  style={[  globalmodalStyles.buttonClose]}
                onPress={() =>{
                  setSmsCodeInput('')
                   props.changeVisibaleState(!RPsmsmodalmodalVisible)}}
              >
                <Icon
                style={globalmodalStyles.buttonClose}
                name='arrow-circle-left'
                type='font-awesome'
                
                />
              </Pressable> */}
              <View style={{marginTop:50}}>
              <Text style={{ 
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
         textAlign: "center"}}>  کد اهراز حویت ارسال شده را وارد نمایید </Text>
         <View style={{marginTop:100,}}>
         <NewPass />

         </View>
           
         
              </View>
               <TextInput
                  label=" کد دریافت شده  "
                  returnKeyType="next"
                  keyboardType='phone-pad'

                  value={SmsCodeInput}
                  onChangeText={(text) => setSmsCodeInput(text)}
                   
                  autoCapitalize="none" />


{waiting==false ?              <Button 
                   style={globalmodalStyles.button}
                   onPress={() => {
                    onAcceptPress()
                    }}>
                    تایید کد 
                 </Button>:
                 <View style={{alignItems:"center",
                 alignContent:"center",
                 justifyContent:"center",}}><LoadingAnimation /></View>
                            }

              
         
   
               
             </ScrollView>
           </View>
        

         </Modal>
       </View>
   
  );
}
 