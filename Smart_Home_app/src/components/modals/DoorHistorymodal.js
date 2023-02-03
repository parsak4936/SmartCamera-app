import React ,{useState} from 'react'
import { Pressable, Modal, View ,Text,Image} from 'react-native'
import { Icon,Card } from 'react-native-elements';
 import {globalmodalStyles} from './GlobalModalStyle'
 
 export   function DoorHistorymodal(props) {
    const historymodal=props.historymodalstate;
    const users = [
        {
           name: 'brynn',
           avatar: 'https://i.pinimg.com/564x/3a/eb/97/3aeb9705f34682a0a8280cd2cc2c5ada.jpg'
        },
        
       ]
  return (
    <View>
     
 <Modal
 
        animationType="fade"
        transparent={true}
        visible={historymodal}
         
      >
         
        <View style={globalmodalStyles.centeredView} >
          <View  style={globalmodalStyles.modalView}>
          <Pressable
               style={[  globalmodalStyles.buttonClose]}
             onPress={() => props.changeVisibaleState(!historymodal)}
           >
             <Icon
             style={globalmodalStyles.buttonClose}
             name='times-circle'
             type='font-awesome'
             
             />
           </Pressable>
            
        
            <Text style={globalmodalStyles.modalText} >history modal World!</Text>
             
            <Card style={globalmodalStyles.centeredView} >
                <Card.Title>CARD WITH DIVIDER</Card.Title>
                <Card.Divider/>
                {
                    users.map((u, i) => {
                    return (
                        <View key={i}  >
                        <Image
                             
                            resizeMode="contain"
                            source={require('../../assets/DoorModal.jpg')}
                        />
                        <Text >{u.name}</Text>
                        </View>
                    );
                    })
                }
                </Card>
       
  
          </View>
        </View>
      </Modal>
    </View>
   
  )
}
 