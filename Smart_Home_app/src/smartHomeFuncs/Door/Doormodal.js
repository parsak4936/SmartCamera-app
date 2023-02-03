import React ,{useState,useEffect} from 'react'
import { Pressable, Modal, View ,Text, Alert} from 'react-native'
import { Icon } from 'react-native-elements';
import Opendoor from './opendoor/door';
import {globalmodalStyles} from '../../styles/GlobalModalStyle'
import Button from '../../components/btns/Button'
import {DoorHistorymodal} from './history/DoorHistorymodal'
import {DoorMemberModal} from './member/Doormembermodal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackButton from '../../components/btns/BackButton'

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
export   function Doormodal(props) {
    const DoormodalVisible=props.doormodalvisible;
   
    const [historymodal, sethistorymodal] = useState(false);
    const [doorMemberModal, setDoorMemberModal] = useState(false);
    const  authToken = props.authToken;
    const SystemIDValue =props.systemID; 
    

 
   
   return (
    <View>
  
         <DoorHistorymodal  historymodalstate={historymodal}
                          systemID={SystemIDValue} 
                          authToken={authToken}
                          changeVisibaleState={historymodal=>sethistorymodal(historymodal)}
                         
                           />
         <DoorMemberModal  DoorMemberModalstate={doorMemberModal}
                          changeVisibaleState={doorMemberModal=>setDoorMemberModal(doorMemberModal)}
                          systemID={SystemIDValue} 
                          authToken={authToken}
                        
                           />
 
     
          <View style={{ width:'100%',
        height:'100%',
        padding: 15,
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",}} >
         
 

            <Opendoor  authToken={authToken} systemID = {SystemIDValue}  />

            <Button 
               mode="outlined"
                 onPress={() => sethistorymodal(!historymodal)} >
                      
                   تاریخچه ورود
                    </Button>
            <Button
                  mode="outlined"
                    onPress={() => 
                                   setDoorMemberModal(!doorMemberModal)}>
                  اعضا
              </Button>
            
          </View>
       
      
    </View>
   
  )
}
 