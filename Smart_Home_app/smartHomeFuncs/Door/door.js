import React,{useState} from 'react';
 
import axios from 'axios';
import { Pressable, Modal,StyleSheet, View ,Text,Image} from 'react-native'
import { Button } from 'react-native-paper';

export default function opendoor(){
     const [openDoor, setOpen] = useState(false);

    const openDoortoggle=()=>{
    
        setOpen(!openDoor);
        if(openDoor){
          console.log("Door is open")
         
         }else{
          console.log("Door is close")
        
         }
       }
    
       return(
           <View>
             
  {/*open door sectionn */}
         <Button onPress={()=>{openDoortoggle()}}>CloseDoor</Button>

           {/*history section */}

             {/*addmember  sectionn */}

               {/*showTable sectionn */}
           </View>
       


       );
  
 
}