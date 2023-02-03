import React from "react";
import Card from "./DashboardCards";
import { StyleSheet,View } from 'react-native'

export default function EventsList(props) {
  const eventsList = props.data.map(event => (
      
    <Card style={styles.card}
   
      key={event.id}
      
     
      title={event.title}
      name={event.name}
      allow_status={event.allow_status}
      picture={event.picture}
    />
  ));

  return <View>{eventsList}</View>;
}

const styles = StyleSheet.create({
  card:{
   
     
   },
  

})