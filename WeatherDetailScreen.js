import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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

    const city = 'Daejeon';

    fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
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

    return (
      <View style={styles.container}>

       <Text style={styles.MainText}>{celsius.toFixed(1)}℃</Text>
        <Image
            style={{width: 150, height: 150}}
            source={require('./assets/Sunny.png')}
        />

        <Text style={styles.BaseText}>{weather}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent : 'center',

  },
    MainText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    BaseText: {
      fontSize: 25
    }

});
