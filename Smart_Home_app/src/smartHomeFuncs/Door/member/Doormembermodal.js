import React ,{useState,useEffect} from 'react'
import { Pressable, Modal, View ,Text,Image,FlatList,StyleSheet} from 'react-native'
import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/btns/Button'
import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
import {AddmemberWindow} from './addmember'
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../../components/btns/BackButton'
import axios from 'axios';

import { MemberLists } from './MemberLists';
  export   function DoorMemberModal(props) {
    const Doormembermodal=props.DoorMemberModalstate;
   
   const [AddmemberModalVisible,setAddmemberModalVisible] = useState(false)
   
   const  authToken = props.authToken;
    const SystemIDValue =props.systemID; 


    const [MembersData,setMembersData] = useState()
     const Data = {
      "Authorization":  " "+authToken,
      "systemid" : SystemIDValue ,
    }
    async function RequestMemebers   (){
      axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/get-all-member-for-front/',
      {hash_serial_rasperyPi : Data["systemid"]},
      {headers: {'Authorization': Data["Authorization"] }  } 
      )
      
    .then(function (response) {
        if(response.status === 200){
        
           const objectresult =response.data.members;
           setMembersData( objectresult)
        
       }
    })

    .catch(error=>{  console.log(error.message);})  
    
    }
useEffect(() => {
  RequestMemebers()
  }, []);
 
 
  return (
    <View>
     
 <Modal   
  onRequestClose={  () => props.changeVisibaleState(!Doormembermodal)}

        animationType="fade"
        transparent={true}
        visible={Doormembermodal}
   
      >
       <AddmemberWindow  addmemberState={AddmemberModalVisible}
                          changeVisibaleState={AddmemberModalVisible=>setAddmemberModalVisible(AddmemberModalVisible)}
                          systemID={SystemIDValue} 
                          authToken={authToken}
                           />

        <View style={globalmodalStyles.centeredView}   >
          <View  style={{
           width:'100%',
          height:"100%",
        backgroundColor: "white",
       
        padding: 15,
        alignItems: "center",}}>
          
              <BackButton goBack={() => props.changeVisibaleState(!Doormembermodal)}/>
              <Text style={{alignItems:'center',
        justifyContent:'center',
        margin: 25,
        textAlign: "center"}} > مشخصات اعضا</Text>
           <Button  mode="outlined"
                style={{ borderRadius: 20,
                  padding: 10,
                  margin: 20,
               }}
                onPress={() => { setAddmemberModalVisible(!AddmemberModalVisible)}}>
                  <AntDesign name="adduser" size={24} color="black" />
اضافه کردن عضو جدید                                   
                          </Button> 
                        
                        
<MemberLists  systemID={SystemIDValue} 
              authToken={authToken} 
               MemberData={MembersData}/>
     
      

          </View>
        </View>
      </Modal>
    </View>
   
  )
  
}
const Styles = StyleSheet.create({
  flatlists: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'red',
    elevation: 2,
    
  },
  image : {
    width:150,
    height:150
  }
})