import React, { useState } from 'react'
import { Pressable, Modal,StyleSheet, View ,Text,Image} from 'react-native'
import { Header,Overlay ,Icon } from 'react-native-elements';
  import {headerStyles} from './dashboardheaderStyle'
  import {MenuTabModal} from '../modals/MenuTabModal'
   import CustomSidebarMenu from '../SlideMenu'
  import { Entypo } from '@expo/vector-icons'; 


export   function DashboardHeader(props) {
  const [sidemenuvisibale, setsidemenuvisibale] = useState(false);
    const menumodalVisible=props.menumodalvisible;
    const authorizationToken = props.authToken;
  function rendered(){
    console.log("sidemenuvisibale")
    return(
      <CustomSidebarMenu />
      
      );
  }
return(
    <View  >
     
         <MenuTabModal  menumodalvisible={menumodalVisible}
                     changeVisibaleState={menumodalVisible=>props.changeVisibaleState(menumodalVisible)} 
                     authToken={authorizationToken}
                     navigation = {props.navigation}  />
                    
  <Header
      leftComponent={
        <Image
            source={require('../../assets/BlackLogo.png')}
            style={headerStyles.LeftCompStyle}/>}

      centerComponent={
        <Image
            source = {require('../../assets/blackSmartHomeTxt.png')}
            style  = {headerStyles.centerComponentStyle}/>}

      rightComponent={
        //
        <Entypo name="menu" size={54} color="black"   onPress={()=>props.changeVisibaleState(!menumodalVisible)}/>
         }
          
      containerStyle={headerStyles.containerstyle}/>

    </View>
       
);
const styles = StyleSheet.create({
    HeaderContainer:{

    },


})

}
