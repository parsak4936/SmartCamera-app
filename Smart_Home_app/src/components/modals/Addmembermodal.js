import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text,Image} from 'react-native'
import { Icon,Card } from 'react-native-elements';
 import {globalmodalStyles} from './GlobalModalStyle'
 
 export   function AddMemberModal(props) {
    const Addmembermodal=props.Addmembermodalstate;
     
  return (
    <View>
     
 <Modal
 
        animationType="fade"
        transparent={true}
        visible={Addmembermodal}
         
      >
         
        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
             onPress={() => props.changeVisibaleState(!Addmembermodal)}
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable>
            
        
            <Text style={globalmodalStyles.modalText} >Add member modal World!</Text>
             
           
       
  
          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 