import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
   LoginScreen,
   VariftScreen,
   ForgetPassWordScreen,
   Dashboard,
   SplashScreen
    
} from './src/screens';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false,}}>
           <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="VariftScreen" component={VariftScreen} />
           <Stack.Screen name="Dashboard" component={Dashboard} />
           <Stack.Screen name="ForgetPassWordScreen" component={ForgetPassWordScreen}/>
           <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
 