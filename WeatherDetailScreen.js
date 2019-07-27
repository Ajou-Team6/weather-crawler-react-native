import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import config from './config/config';
import {RotationHoleLoader} from 'react-native-indicator';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

//    fetch('http://' + config.ip + ':' + config.port + '/weather-crawler/current-weathers/by-city-name/{city}')
      fetch(`http://` + config.ip + `:` + config.port + `/weather-crawler/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
            <RotationHoleLoader />
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weather = this.state.weather[0].main;
    let humidity = this.state.main.humidity;
    let icon = this.state.weather[0].icon;


   switch (icon) {
          case '01d':
          imagePath = require('./assets/weather_icon/01d.png');
          break;
          case '01n':
          imagePath = require('./assets/weather_icon/01n.png');
          break;
          case '02d':
          imagePath = require('./assets/weather_icon/02d.png');
          break;
          case '02n':
          imagePath = require('./assets/weather_icon/02n.png');
          break;
          case '03d':
          imagePath = require('./assets/weather_icon/03d.png');
          break;
          case '03n':
          imagePath = require('./assets/weather_icon/03n.png');
          break;
          case '04d':
          imagePath = require('./assets/weather_icon/04d.png');
          break;
          case '04n':
          imagePath = require('./assets/weather_icon/04n.png');
          break;
          case '09n':
          imagePath = require('./assets/weather_icon/09n.png');
          break;
          case '09d':
          imagePath = require('./assets/weather_icon/09d.png');
          break;
          case '10n':
          imagePath = require('./assets/weather_icon/10n.png');
          break;
          case '10d':
          imagePath = require('./assets/weather_icon/10d.png');
          break;
          case '11n':
          imagePath = require('./assets/weather_icon/11n.png');
          break;
          case '11d':
          imagePath = require('./assets/weather_icon/11d.png');
          break;
          case '13n':
          imagePath = require('./assets/weather_icon/13n.png');
          break;
          case '13d':
          imagePath = require('./assets/weather_icon/13d.png');
          break;
          case '50d':
          imagePath = require('./assets/weather_icon/50d.png');
          break;
          case '50n':
          imagePath = require('./assets/weather_icon/50n.png');
          break;
      }


    return (


    <ImageBackground style={ styles.imgBackground }
                     resizeMode='cover'
                     source={require('./assets/background.png')}>
      <View style={styles.container}>

       <Text style={styles.MainText}>{celsius.toFixed(1)}℃</Text>



        <Image
                   style={{width: 150, height: 150}}
                   source={imagePath}
        />

        <Text style={styles.BaseText}>Humidity - {humidity}%</Text>

        <Text style={styles.BaseText}>{weather}</Text>

      </View>
    </ImageBackground>
    );
  }
}
//<ImageBackground source={'./assets/weather_icon/background.png'}>
const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent : 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',

  },
    MainText: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    BaseText: {
      fontSize: 20
    },
imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
},

});
