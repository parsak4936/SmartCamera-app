import React ,{useState,useEffect,} from 'react'
import { Pressable, Modal, View ,Text,StyleSheet,BackHandler,Alert} from 'react-native'
import BackButton from '../../components/btns/BackButton'
 
import Opendoor from '../../smartHomeFuncs/Door/opendoor/door';
 import MenuTabImage from '../Images.js/MenuTabImage'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Icon } from 'react-native-elements';
import Button from '../btns/Button'
import {ResetPassWordmodal} from './ResetPasswordModal/RPModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MenuTabModalStyle} from './MenuTabModalStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons';
 import {SupportModal} from './Supportmodal'
export   function MenuTabModal(props) {
    const menumodalVisible=props.menumodalvisible;
    const authorizationToken = props.authToken;
    const [resetPasswordvisible, setresetPasswordvisible] = useState(false);
    const [SupportModalvisible, setSupportModalvisible] = useState(false);
    const [waiting, setWaiting] = useState(false);

    
   
    async function RemoveData () {
      setWaiting(true);
    const Data = {
        "Authorization":  " "+authorizationToken, 
      }
 
        axios.get('http://smartvideodoorphoneproject.herokuapp.com/accounts/logout/',
        {
          headers: {'Authorization': Data["Authorization"] }  } 
        )
         
//09215164458
//ali25ali25
      .then( async function (response) {
          if(response.status === 200){  
            setWaiting(false); 
           console.log("LOGED out")
            try { 
              await AsyncStorage.removeItem('@Token')
              await AsyncStorage.removeItem('@SystemID') 
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            } 
          catch (e) {
            setWaiting(false);
         console.log(e.message)
        }
             
             
         }
      })
      .catch(error=>{  console.log(error.message);})
        
     
    }
  return (
    <View>
    
 <Modal
 onRequestClose={  () => props.changeVisibaleState(!menumodalVisible)}
         animationType="fade"
         visible={menumodalVisible}
         
      >
          

         <ResetPassWordmodal  ResetPassmodalVisible={resetPasswordvisible}
                   
          changeVisibaleState={ResetPassmodalVisible=>setresetPasswordvisible(ResetPassmodalVisible)}  navigation = {props.navigation}  />

<SupportModal  SupportModalvisible={SupportModalvisible}
                     changeVisibaleState={SupportModalvisible=>setSupportModalvisible(SupportModalvisible)}  navigation = {props.navigation}  />
       

        <View style={MenuTabModalStyle.centeredView} >
        
          <View  style={MenuTabModalStyle.modalView}>
         <BackButton goBack={() => props.changeVisibaleState(!menumodalVisible)}/>
          {/* <Pressa/ble
               style={{
                 backgroundColor:'black',
                flex:1,
                alignSelf: "flex-start",
              marginVertical: "1%",
              marginBottom: 6,
            }}
             onPress={() => props.changeVisibaleState(!menumodalVisible)}
           >
               <Icon   onPress={() => props.changeVisibaleState(!menumodalVisible)}

            style={{
              flex:1,
              alignSelf: "flex-start",
            marginVertical: "1%",
            marginBottom: 6,
           }}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable> */}
          
            <MenuTabImage />
            
            <Button     mode="outlined"
              
                onPress={() => setresetPasswordvisible(!resetPasswordvisible)}>
                   {/* <MaterialCommunityIcons name="key-change" size={24} color="black" /> */}
                تغییر رمز
            </Button>
      
      <Button    mode="outlined"  
      onPress={() => setSupportModalvisible(!SupportModalvisible)}>
         {/* <MaterialIcons name="contact-support" size={24} color="black" /> */}
       پشتیبانی
      </Button>
      {waiting==false ? <Button
       mode="outlined"
       onPress={() =>{  
        Alert.alert(
          " خروج از حساب کاربری ؟",
           "  ایا مطمئن هستید که میخواهید از حساب کاربری خارج شوید ؟",
           [
            
            {
              text: "خیر",
              onPress: () => console.log("NOP"),
              style: "cancel",
            },{
              text: "بله",
              onPress: () =>{  RemoveData()},
             },
          ],
        );
    
       
       
       } 
        
        
       }>
       <FontAwesome name="sign-out" size={24} color="black" />
       <Text>  خروج</Text> </Button> : <View></View> }
      
        
          </View>
        </View>
      </Modal>
    </View>
   
  )
}
