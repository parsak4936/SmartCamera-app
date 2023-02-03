import React, { Component, useState } from 'react';
import { AppRegistry, View, Text, StyleSheet, Platform } from 'react-native';

export default function ClockAndDate(){
   
  const [currentTime,setcurrentTime]=useState("")
  const [currentDay,setcurrentDay]=useState("")
    const daysArray =['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
   
 
const getCurrentDate=()=>{
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
   // Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }

  const clock =()=>{
    const hours =new Date().getHours(); //To get the Current Hours
    const min =  new Date().getMinutes(); //To get the Current Minutes
    const sec =  new Date().getSeconds(); //To get the Current Minutes
  
   return hours + ':' + min + '_'+sec;
  }   


  
 

    return (
      <View style={styles.container}>
        <View>

           
          <Text style={styles.daysText}>{getCurrentDate()}</Text>
          <Text style={styles.timeText}>{clock()}</Text>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: (Platform.OS === 'ios') ? 10 : 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 10,
      textAlign: "center",
      margin: 5,
      color: 'black',
      fontWeight: "bold"
    },
    timeText: {
      fontSize: 10,
      color: '#f44336'
    },
    daysText: {
      color: '#2196f3',
      fontSize: 15,
      paddingBottom: 0
    }

  });