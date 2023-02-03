import React ,{useState,useEffect} from 'react'
import { Pressable, Modal, View ,Text,Image} from 'react-native'
 import {HistoryLists} from './HistoryLists'
 import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
 import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
import BackButton from '../../../components/btns/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

 export   function DoorHistorymodal(props) {
    const historymodal=props.historymodalstate;
    //const historyData = props.historyData
    const  authToken = props.authToken;
    const SystemIDValue =props.systemID; 
    const [historyData,sethistoryData] = useState()
    const Data = {
      "Authorization":  " "+authToken,
      "systemid" : SystemIDValue ,
    }
    const RequestHistory = ()=>{
      axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/get-history/',
      {hash_serial_rasperyPi : Data["systemid"]},
      {headers: {'Authorization': Data["Authorization"] }  } 
      )
      
    .then(function (response) {
        if(response.status === 200){
        
           const historyDatares =response.data.historys;
           sethistoryData( historyDatares)
 
       }
    })
    .catch(error=>{   console.log(error.message);})   
    
    }
useEffect(() => {
  RequestHistory()
  }, []);
  return (
    <SafeAreaView>
     
 <Modal
   onRequestClose={  () => props.changeVisibaleState(!historymodal)}

        animationType="fade"
        transparent={true}
        visible={historymodal}
         
      >
         
        <View style={globalmodalStyles.centeredView} >
          <View  style={{  flex:2,
        width:'100%',
        height:'100%',
       
        backgroundColor: "white",
       
        padding: 15,
        alignItems: "center",}}>
          <BackButton goBack={() => props.changeVisibaleState(!historymodal)}/>
          {/* <Pressable
               style={{ 
               flex:1,
               alignSelf: "flex-start",
             marginVertical: "1%",
             marginBottom: 6,}}
             onPress={() => props.changeVisibaleState(!historymodal)}
           >
             <Icon
             style={{ 
             flex:1,
             alignSelf: "flex-start",
           marginVertical: "1%",
           marginBottom: 6,}}
             name='arrow-circle-left'
             type='font-awesome'
             
             />
           </Pressable>           */}
           <Text>تاریخچه ورود</Text>
           <View style={{flex:1,margin:25, height:550,width:'85%'
  
}}>
           <HistoryLists  authToken={authToken} SystemIDValue={SystemIDValue} HistoryDatas={historyData}/>
           </View>
 

          </View>
        </View>
      </Modal>
    </SafeAreaView>
   
  )
}
 