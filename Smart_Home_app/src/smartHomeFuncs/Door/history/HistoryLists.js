
import React ,{useState,useEffect} from 'react'
import { Pressable, Modal, View ,Text,Image,FlatList,StyleSheet,Alert} from 'react-native'
import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingAnimation from '../../../components/LoadingAnimation'
import axios from 'axios';


  export   function HistoryLists(props) {
    const HistoryDatas = props.HistoryDatas
   
    const  authToken = props.authToken;
    const SystemIDValue =props.SystemIDValue; 
    const [NewData,setNewData] = useState(HistoryDatas)
    const [refreshingData,setrefreshingData]=useState(false)
 
 const refresher =()=>{
   setrefreshingData(true)
       const Data = {
       "Authorization":  " "+authToken,
       "systemid" : SystemIDValue ,
     }
 
       axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/get-history/',
       {hash_serial_rasperyPi : Data["systemid"]},
       {headers: {'Authorization': Data["Authorization"] }  } 
       )
       
     .then(function (response) {
         if(response.status === 200){
          
            const objectresult =response.data.historys;
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
      <ScrollView>

         
      <ListItem  key={item.id} bottomDivider    >
                    
                    <Avatar  style={{width:140,height:140, borderRadius:999,
        overflow:'hidden',}} source={{uri:`data:image/png;base64,${item.picture.replace("b\'","").replace("\'","") }` }} />
                    <ListItem.Content style={{ alignItems:"center",justifyContent:'center'}}>
    {/* ------------------------------------------Names-----------------------------------------------------  */}

      {item.request_status == 1 ?
                <ListItem.Title> 
                  <View><Text>نام :{item.name}</Text></View>
                    </ListItem.Title> :
        item.request_status==2  ?
                <ListItem.Title>
                  <View><Text>نام :{item.name}</Text></View> 
                   </ListItem.Title> :
        item.request_status==3  ?
                <ListItem.Title> 
                  <Text> نام : ناشناس</Text> 
                  </ListItem.Title> :

                  <ListItem.Title>null</ListItem.Title>
                  } 
    {/* ------------------------------------------TITLES-----------------------------------------------------  */}
      {item.request_status == 1 ? 
              <ListItem.Subtitle>

                          <View><Text >عنوان : {item.title}  </Text></View>
                          <Text style={{color: 'green'}}>در باز شد</Text>
 

                            </ListItem.Subtitle>:

        item.request_status==2 ? 
              <ListItem.Subtitle>

                          <View><Text >اجازه ورود ندارد</Text></View>
                          <Text style={{color: 'red'}}>در باز نشد</Text>

                           </ListItem.Subtitle> :

        item.request_status==3 ?
                      <ListItem.Subtitle>
                       
                        
                          <View><Text >اجازه ورود ندارد</Text></View>
                          <Text style={{color: 'red' }}>در باز نشد</Text> 

                        
                       
                               </ListItem.Subtitle> :
                    
                    
                    <ListItem.Title>null</ListItem.Title>
                    } 
                    
    {/* -----------------------------------------------------------------------------------------------  */}

                     
                      
                    </ListItem.Content>
                  </ListItem> 
       
      </ScrollView>  
       
      )
      }
 
  return (
    <View style={Styles.flatlists} >
   {HistoryDatas ===undefined? <View style={{alignItems:'center',marginTop:"50%"}}><LoadingAnimation  /></View> :
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
    flex:1,
    width:'100%',
    height:150,
    borderRadius: 20,
    padding: 10,
     
  
    
  },
  image : {
    width:450,
    height:450
  }
})