import React ,{useState,useCallback} from 'react'
import { Pressable, Modal, View ,Text,Image,Alert} from 'react-native'
import Button from '../../../components/btns/Button'
 import { ListItem, Avatar ,Icon,Card } from 'react-native-elements';
 import TextInput from '../../../components/comps/TextInput'
 import {globalmodalStyles} from '../../../styles/GlobalModalStyle'
import {UploadImage} from '../../../components/UploadImage'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../../../components/btns/BackButton'
import LoadingAnimation from '../../../components/LoadingAnimation'
import { SafeAreaView } from 'react-native-safe-area-context';
 export   function AddmemberWindow(props) {
    const AddmembermodalVisible=props.addmemberState;
    const  authToken = props.authToken;
    const SystemIDValue =props.systemID; 
    const [image, setImage] = useState(null);
     const [Waiting , setWaiting]=useState(false)
    const [title, setTitle] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });

     
    const callback = useCallback((image) => {
      console.log("image inside of add memeber    "+image)
      setImage(image);
      var base64data = image
     }, []);
     
    const onAcceptPress =() => {
      setWaiting(true)

      const Data = {
        "Authorization":  " "+authToken,
        "systemid" : SystemIDValue ,
        "title" : title.value ,
        "name" : name.value ,
        "picture" : image ,
        
      }
     
      
      axios.post('http://smartvideodoorphoneproject.herokuapp.com/door-security/add-member/',
      {hash_serial_rasperyPi : Data["systemid"],
      title : Data["title"],
      name : Data["name"],
      picture : Data["picture"],
    },
      {headers: {'Authorization': Data["Authorization"] }  } 
      )
      
    .then(function (response) {
        if(response.status === 201){
          setWaiting(false)
       Alert.alert(
        " ",
         " کاربر اضافه شد",
         [
          
          {
text:"باشه",  
             
           },
        ],
      ); 
      setName({ value: '', error: '' });
                                                 setTitle({ value: '', error: '' });
      props.changeVisibaleState(!AddmembermodalVisible)
       }
       if(response.status === 200){
        setWaiting(false)
     Alert.alert(
      " ",
       " کاربر اضافه شد",
       [
        
        {
text:"باشه",  
           
         },
      ],
    ); 
    props.changeVisibaleState(!AddmembermodalVisible)
     }

    })

    .catch(error=>{  
setWaiting(false)
     if (error.response.status==400){
      Alert.alert(
        " خطا 400",
         " ",
         [
          
          {
text:"باشه",               
           },
        ],
      );
  
     }  
     if (error.response.status==408){
      Alert.alert(
        " خطا 408",
         " ",
         [
          
          {
text:"باشه",               
           },
        ],
      );
  
     }  
     
     console.log(error.message);})  
      
    }
  return (
    <View>
     
 <Modal
    onRequestClose={  () =>{setName({ value: '', error: '' });
    setTitle({ value: '', error: '' });
      props.changeVisibaleState(!AddmembermodalVisible)
    } }

        animationType="fade"
        transparent={true}
        visible={AddmembermodalVisible}
         
      >
   
        <View style={{ flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
        backgroundColor: "white",
        
        }} >
                     <BackButton  goBack={() => {setName({ value: '', error: '' });
                                                 setTitle({ value: '', error: '' });
                                                     props.changeVisibaleState(!AddmembermodalVisible)}}/>

          <View  style={{width:'80%',
        height:'100%',
        margin: 20,
        
         
      
        alignItems: "center",}}>
         <View>
         <Text style={{ 
           marginTop:50,
        alignItems:'center',
        justifyContent:'center',
        margin: 25,
        textAlign: "center"}} >اطلاعات عضوجدید را وارد کنید</Text>
         </View>
     
        <View style={{marginBottom:50,marginTop:50}}>
        <UploadImage  parentCallback={callback}  />

        </View>
            
             {/* Aa!12345 */}
  
          
             <TextInput
             
                  label=" نام و نام خانوادگی   "
                  returnKeyType="next"
                  
                  value={name.value}
                  onChangeText={(text) => setName({ value: text, error: '' })} 
                    error={!!name.error}
                    errorText={name.error} />
                  
                  <TextInput
                    label=" عنوان  "
                  returnKeyType="next"
                  value={title.value}
                  onChangeText={(text) => setTitle({ value: text, error: '' })} 
                    error={!!title.error}
                    errorText={title.error} />
                  
{Waiting==false ?  <Button 
                 
                 onPress={() => {
                  
                  onAcceptPress();
                 
                 }}>
                           <Text> تایید</Text>
                </Button> : <LoadingAnimation/>}
              
  
          </View>
        </View>
      </Modal>
    </View>
   
  )
} 