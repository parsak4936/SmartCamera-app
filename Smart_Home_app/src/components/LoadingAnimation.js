import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
 
import { Plane,Circle } from 'react-native-animated-spinkit';

export default function App() {
  return (
    <View  >
   
      <Circle color="blue" size={48} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
    padding: 8,
  },
});
