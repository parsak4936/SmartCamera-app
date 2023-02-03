 import React, { useState } from 'react'
  import { StyleSheet} from 'react-native'
 export const MenuTabModalStyle = StyleSheet.create({
  button: {
    
    padding: 10,
    
    // borderTopWidth : 0,
    // borderLeftWidth : 0,
    // borderRightWidth : 0,
  },
  image:{
flex:3,
resizeMode:'contain'
  },
  
    buttonClose: {
        flex:1,
        alignSelf: "flex-start",
        marginVertical: "1%",
        marginBottom: 9,
        minWidth: "15%",   
       },
      textStyle: {
      flex:1,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      },
      modalView: {
        flex:1,
        width:'100%',
      
        backgroundColor: "white",
         
        padding: 15,
        alignItems: "center",
        
       
      },
      modalDoorBtn:{
        flex:1,
      },
      
  
  })