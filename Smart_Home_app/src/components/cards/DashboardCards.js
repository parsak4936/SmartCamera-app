import React, { useState } from 'react';
import { Avatar, Button, Card, Paragraph,Title,Text } from 'react-native-paper';

import { StyleSheet, View} from 'react-native'
 export function DashboardCard(props){
 

  return(
    <View style={styles.container}>
 <Card>
    
    <Card.Content>
      <Title>{props.title}</Title>
      <Card.Cover  style={styles.image} source={props.image} />
     
    </Card.Content>
         
    <Card.Actions>
       
    </Card.Actions>  

  </Card>
    </View>
   
     
 );
 
  

}
const styles = StyleSheet.create({
  
  image: {
    borderRadius: 5,
    width:"100%",
    height:250
    },
    container:{
      flex:1
    }

})
 