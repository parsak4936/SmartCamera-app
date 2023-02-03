import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../Door/opendoor/door';
import {globalmodalStyles} from '../../styles/GlobalModalStyle'
import Button from '../../components/btns/Button'


export   function LightModal(props) {
    const LightrmodalVisible=props.lightmodalvisible;
   
  
  return (
    <View>
 <Modal
      onRequestClose={  () => props.changeVisibaleState(!LightrmodalVisible)}

        animationType="fade"
         visible={LightrmodalVisible}
        
      >
        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
             onPress={() => props.changeVisibaleState(!LightrmodalVisible)}
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable>
            
        
            <Text style={globalmodalStyles.modalText}>Light modal World!</Text>
             
            
          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 