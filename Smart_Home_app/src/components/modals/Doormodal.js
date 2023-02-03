import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from '../../../smartHomeFuncs/Door/door';
import {globalmodalStyles} from './GlobalModalStyle'
import Button from '../btns/Button'
import {DoorHistorymodal} from '../modals/DoorHistorymodal'
import {AddMemberModal} from '../modals/Addmembermodal'
export   function Doormodal(props) {
    const DoormodalVisible=props.doormodalvisible;
    const [historymodal, sethistorymodal] = useState(false);
    const [addmembermodal, setaddmembermodal] = useState(false);

  const setDoorModalVisible =()=>{
    DoormodalVisible=!DoormodalVisible;
  }
   return (
    <View>
      
 <Modal
 
        animationType="fade"
        transparent={true}
        visible={DoormodalVisible}
        onRequestClose={() => {
          
           setDoorModalVisible(!DoormodalVisible);
        }}
      >
         <DoorHistorymodal  historymodalstate={historymodal}
                          changeVisibaleState={historymodal=>sethistorymodal(historymodal)} />
         <AddMemberModal  Addmembermodalstate={addmembermodal}
                          changeVisibaleState={addmembermodal=>setaddmembermodal(addmembermodal)} />

        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
             onPress={() => props.changeVisibaleState(!DoormodalVisible)}
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable>
          
            <Opendoor style={globalmodalStyles.modalDoorBtn}/>
            <Text style={globalmodalStyles.modalText}>door modal World!</Text>
            <Button style={globalmodalStyles.modalDoorBtn}   onPress={() => sethistorymodal(!historymodal)} >history</Button>
            <Button style={globalmodalStyles.modalDoorBtn}  onPress={() => setaddmembermodal(!addmembermodal)}>addmember</Button>
            
          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 