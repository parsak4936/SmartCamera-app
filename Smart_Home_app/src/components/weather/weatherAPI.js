import React from 'react';
import { StyleSheet, Text, View, Animated, Alert } from 'react-native';
import * as Location from 'expo-location';
import Weather from './weather'
import { API_KEY } from './API_KEY';



export default class weatherAPI extends React.Component {
   

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: "Brooklyn",
    country: "US",
    error: null
  };
 

  componentDidMount() { 
    let { status1 } = Location.requestForegroundPermissionsAsync(); 
    console.log(status1)   //  navigator.geolocation.getCurrentPosition(setPosition);
    if (status1 !== 'granted') {
      Alert.alert("Permission to access location was denied");
      return;}
      let location =  Location.getCurrentPositionAsync({});
     console.log(location)
   console.log(JSON.stringify(location))
    navigator.geolocation.getCurrentPosition(
      position => {
        this.Wfetcheather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
       console.log(JSON.stringify(json));
        this.setState({
          temperature: Math.round(json.main.temp),
          weatherCondition: json.weather[0].main,
          city: json.name,
          country: json.sys.country,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature, city, country } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>درحال گرفتن اطلاعات دما </Text>
          </View>
        ) : (
           <View>

              <Weather weather={weatherCondition} temperature={temperature} city={city} country={country} />
           </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   height:350,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  loadingText: {
    color: '#fff',
    fontSize: 20
  }
});
