
import React ,{useState,useEffect} from 'react'
import { Pressable, Modal, View ,Text,Image,FlatList,StyleSheet,Alert,TouchableOpacity } from 'react-native'
import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { EditMemberModal } from './EditMemberModal';
import LoadingAnimation from '../../../components/LoadingAnimation'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export   function MemberLists(props) {
  const [selectedItem, setSelectedItem] = useState();
    const MemberData = props.MemberData
    const  authToken = props.authToken;
    const SystemIDValue =props.systemID; 
     const [EditMemberModalvisible,EditMemberModalvisibleVisible] = useState(false)
     
     const [NewData,setNewData] = useState(MemberData)

   const [refreshingData,setrefreshingData]=useState(false)

const refresher =()=>{
  setrefreshingData(true)
      const Data = {
      "Authorization":  " "+authToken,
      "systemid" : SystemIDValue ,
    }

      axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/get-all-member-for-front/',
      {hash_serial_rasperyPi : Data["systemid"]},
      {headers: {'Authorization': Data["Authorization"] }  } 
      )
      
    .then(function (response) {
        if(response.status === 200){
         
           const objectresult =response.data.members;
           setNewData( objectresult)
           setrefreshingData(false)

        
       }
    })

    .catch(error=>{Alert.alert("BG")
    setrefreshingData(false)
      console.log(error.message);})  
    
   



}






   const renderitems=(item)=>{
 
return(
  <View>
  <EditMemberModal  EditMemberModalstate={EditMemberModalvisible}
  changeVisibaleState={EditMemberModalvisible=>EditMemberModalvisibleVisible(EditMemberModalvisible)}
  systemID={SystemIDValue} 
  authToken={authToken}
selecteditem={selectedItem}

  // selectedID={selectedID}
   />
 <ListItem
   chevron
key={item.id}
 bottomDivider  
 button  
  onPress={()=>{
  EditMemberModalvisibleVisible(!EditMemberModalvisible)
  setSelectedItem(item)
    
}} 
  //console.log("this is item content"+item)
  >
              
              <Avatar style={{width:80,height:80, borderRadius:999,
                   overflow:'hidden',}} source={{uri:`data:image/png;base64,${item.picture.replace("b\'","").replace("\'","") }` }} />
              <ListItem.Content style={{ alignItems:"center",justifyContent:'center'}}>
                <ListItem.Title> 
                   
                <Image
                    style={{width:15,height:15,}}
                    source={require('../../../assets/editIcon.png')}
                  />
                <Text>{item.name}</Text>   
                  </ListItem.Title>
                <ListItem.Subtitle>{item.title} </ListItem.Subtitle>
                

               </ListItem.Content>
            </ListItem> 
  
            </View>
         
 )
   }
  return (
     
      
      <View style={{flex:1,width:'100%',height:150}} >  
      
     
    
     {MemberData ===undefined? <View style={{alignItems:'center',marginTop:"50%"}}><LoadingAnimation  /></View> :
      <FlatList 
           data={NewData} 
          extraData={NewData}
           refreshing={refreshingData}
           onRefresh={()=>{refresher()}}
          renderItem={
            ({item}) =>renderitems(item)
          } 
          keyExtractor={(item) => item.id}
        /> }

</View>
         
      

     
   
  )
  
}
const Styles = StyleSheet.create({
  flatlists: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'red',
 
    
   },
  image : {
    width:150,
    height:150,
    borderRadius:999,
    }
})