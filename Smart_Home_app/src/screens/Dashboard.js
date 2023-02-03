import React, { useState } from 'react'
 import { Pressable,StyleSheet, View } from 'react-native'
import DashboardTile from '../components/Tile/DashboardTile'
import { SafeAreaView } from 'react-native-safe-area-context';
 import { ScrollView } from 'react-native-gesture-handler';
  import {DashboardCard} from '../components/cards/DashboardCards'
 import {Doormodal} from '../smartHomeFuncs/Door/Doormodal'
import {LightModal} from '../smartHomeFuncs/Lights/LightModal'
import {DashboardHeader}from '../components/headers/Dashboard_header'
import { NavigationActions } from 'react-navigation';  

export default function Dashboard({route, navigation }) {

  

  const [DoormodalVisible, setDoorModalVisible] = useState(false);
  const [LightrmodalVisible, setLightModalVisible] = useState(false);
  const [menuModalVisible, setmenuModalVisible] = useState(false);
  const  authorizationToken  = route.params.authorizationToken;
  const  SystemIDValue  = route.params.SystemID;
 
  const [text, setText] = React.useState('');

  const hasUnsavedChanges = Boolean(true);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        const action = e.data.action;
        if (!hasUnsavedChanges) {
          return;
        }

        e.preventDefault();

        // Alert.alert(
        //   'Discard changes?',
        //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //   [
        //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
        //     {
        //       text: 'Discard',
        //       style: 'destructive',
        //       onPress: () => navigation.dispatch(action),
        //     },
        //   ]
        // );
      }),
    [hasUnsavedChanges, navigation]
  );
 
   return (
   
 
     
<SafeAreaView  style={styles.Body}>
 
  <ScrollView> 
   <DashboardHeader menumodalvisible={menuModalVisible}
                    changeVisibaleState={menuModalVisible=>setmenuModalVisible(menuModalVisible)}
                     authToken={authorizationToken} 
                    navigation = {navigation}
                   />
   

  
      <DashboardTile style={styles.tile}/>  

    
{/* Door Modal section */}
    <Doormodal 
        doormodalvisible={DoormodalVisible} 
        authToken={authorizationToken}  
         systemID={SystemIDValue}
       changeVisibaleState={DoormodalVisible=>setDoorModalVisible(DoormodalVisible)}
        />
    
      {/* Light  Modal section */}
      {/* <LightModal lightmodalvisible={LightrmodalVisible}  changeVisibaleState={LightrmodalVisible=>setLightModalVisible(LightrmodalVisible)}/> */}

     
    
        
    {/* <View style={styles.card}>
      <Pressable style={styles.pressablecards}  onPress={() => setDoorModalVisible(!DoormodalVisible)}>    
            <DashboardCard title="در ورودی" image={require('../assets/DoorModal.jpg')}/>
          </Pressable>
              
      <Pressable disabled={true} style={styles.pressablecards}  onPress={() => setLightModalVisible(!LightrmodalVisible)}>    
          <DashboardCard title="چراغ ها" image={require('../assets/LightModal.jpg')}/>  
            </Pressable>
         
    </View> */}

   
   
  </ScrollView>
  
</SafeAreaView>
   )
}
const styles = StyleSheet.create({
 
   
   
    tile:{
      borderRadius:15,
      flex:1,
      padding:250,
    },
    Body:{  
      flex:1,  
      backgroundColor:'white'
      },
    card:{
       flex:3,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
      
     
     },
     card2:{
       flex:3,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
     marginTop:15,
     
     },
     pressablecards:{
 padding:50,
 
      flex:1,
      tintColor: "#000000",
    
    },
    pressablecards2:{
flex :1,
    }

})