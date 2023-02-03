import React ,{useState,useCallback} from 'react'
import { View } from 'react-native';
 
 import { Switch } from 'react-native-switch';
  

 export   function Datasender({parentCallback,...props}) {
   // const defaultvalue=props.defaultValue
    const defaultID =props.defaultID;
    const defaultPicture=props.defaultPicture;
    const defaultName=props.defaultName;
    const defaultTitle=props.defaultTitle
    const [ID,setid] =useState(defaultID);
    const [name,setname]=useState(defaultName)
   // console.log("name in datasender component"+name)
    const [title,setTitle]=useState(defaultTitle)
     const [image,setImage] =useState(defaultPicture);
     
   // const toggleSwitch = () => setAllowStatus(previousState => !previousState);
    //const [AllowStatus,setAllowStatus] =useState(defaultvalue);

    
     parentCallback(name,image,title,ID)
    
  return (
    <View>

    </View>
   
  )
}
 
 