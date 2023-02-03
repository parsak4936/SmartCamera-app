import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text} from 'react-native'
 
import {globalmodalStyles} from '../../styles/GlobalModalStyle'
import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
import BackButton from '../../components/btns/BackButton'

import { ScrollView } from 'react-native-gesture-handler';

export   function SupportModal(props) {
    const SupportModalvisible=props.SupportModalvisible;
    
   

/////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////
 
  return (
    <View>
 <Modal
  onRequestClose={  () => props.changeVisibaleState(!SupportModalvisible)}

         animationType="fade"
        transparent={true}
        visible={SupportModalvisible} >
            
 
        <View style={globalmodalStyles.centeredView} >
          <View  style={{ width:'100%',
        height:'100%',
        padding: 15,
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",}}>
        <BackButton goBack={() => props.changeVisibaleState(!SupportModalvisible)}/>

         
<View style={{marginTop:10,padding:20}}>
<Text style={globalmodalStyles.modalText}>پشتیبانی</Text>
            <Text style={globalmodalStyles.modalText}>در صورت عدم کارکرد  دستگاه (باز نکردن در ورودی ، عدم تشخیص کاربر معرفی شده و ...) با شماره های زیر تماس بگیرید</Text>
            <Text style={globalmodalStyles.modalText}> 0912 182 27 81</Text>
             <Text style={globalmodalStyles.modalText}> پیشنهادات و انتقادات خود را از طریق ایمیل و راه های ارتباطی زیر با ما به اشتراک بگذارید</Text>

         
</View>
           
           
                          

          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 
    