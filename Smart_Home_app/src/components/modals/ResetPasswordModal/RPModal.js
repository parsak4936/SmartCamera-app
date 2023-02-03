import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text,Alert} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../../../smartHomeFuncs/Door/opendoor/door';
import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
import Button from '../../btns/Button'
import TextInput from '../../comps/TextInput'
import { RPSmsModal } from './RPSmsvalidation';
import { numberValidator } from '../../../helpers/mobileValidator'
import LoadingAnimation from '../../LoadingAnimation'
import BackButton from '../../btns/BackButton'
 import axios from 'axios';
 import { Octicons } from '@expo/vector-icons'; 

export   function ResetPassWordmodal(props) {
    const ResetPassmodalVisible=props.ResetPassmodalVisible;
    const [mobile, setmobile] = useState({ value: '', error: '' })
    const [RPsmsmodalVisible, setRPsmsmodalVisible] = useState(false);
    const [RPsmsToken, setRPsmsToken] = useState();
    const [waiting,setWaiting]=useState(false)

/////////////////////////////////////////////////////////////////////////////////////
const onAcceptPress = async () => {
 
  const mobileError = numberValidator(mobile.value )
  
  if (mobileError ) {
    setmobile({ ...mobile, error: mobileError })
         //09215164458
              //ali25ali25
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
            setWaiting(false)
            setRPsmsToken(response.data.token)            
            setRPsmsmodalVisible(!RPsmsmodalVisible)
           
          }
      })
      .catch(error=>{
setWaiting(false)
Alert.alert("شماره وارد شده اشتباه ، یا دستگاه انلاین نمیباشد")

        if (error.response.status==400){
          console.log("GG:400")
        }      
      } 
  );
    return    
  } 
}



//////////////////////////////////////////
 
  return (
    <View>
 <Modal
  onRequestClose={  () =>{            setWaiting(false)

    setmobile({ value: '', error: '' })
     props.changeVisibaleState(!ResetPassmodalVisible)}}

        animationType="fade"
         visible={ResetPassmodalVisible} >

         <RPSmsModal  RPsmsmodalmodalVisible={RPsmsmodalVisible}
                        changeVisibaleState={RPsmsmodalVisible=>setRPsmsmodalVisible(RPsmsmodalVisible)}
                        navigation = {props.navigation}
                        smsToken={RPsmsToken}/>

        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <BackButton goBack={() => {
            setWaiting(false)
setmobile({ value: '', error: '' })
props.changeVisibaleState(!ResetPassmodalVisible)
          }}/>
        
{/*             
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
               onPress={() =>{props.changeVisibaleState(!ResetPassmodalVisible)} }
               
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='arrow-circle-left'
             type='font-awesome'
             
             />
           </Pressable> */}
            
        
            <Text style={{  flex:1,
        alignItems:'center',
        justifyContent:'center',
      marginTop:94,
        textAlign: "center"}}>شماره خود را جهت تغییر رمز وارد نمایید</Text>
         
            <TextInput
              label="شماره تلفن"
              keyboardType='phone-pad'
              returnKeyType="next"
              value={mobile.value}
              onChangeText={(text) => setmobile({ value: text, error: '' })}
              error={!!mobile.error}
              errorText={mobile.error}
              autoCapitalize="none" />
        
            {waiting==false ?  <Button 
                style={globalmodalStyles.button}
                onPress={() => {onAcceptPress()}}>
                        <Octicons name="verified" size={24} color="black" /> ارسال شماره            
                          </Button>
                          :
                          <View style={{alignItems:"center",
                          alignContent:"center",
                      justifyContent:"center",}}><LoadingAnimation /></View>  
                        }

          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 
    