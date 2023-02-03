import React, { useState } from 'react'
  import { StyleSheet} from 'react-native'
 export const globalmodalStyles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  
    buttonClose: {
        flex:1,
        
        alignSelf: "flex-start",
        marginVertical: "1%",
        marginBottom: 6,
        minWidth: "48%",
            
          
       },
      textStyle: {
      
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 15,
        textAlign: "center"
      },
      centeredView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
      },
      modalView: {
        flex:2,
        width:'90%',
        height:'90%',
        margin: 20,
        backgroundColor: "white",
         borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
      },
      modalDoorBtn:{
        flex:1,
      },
      
  
  })