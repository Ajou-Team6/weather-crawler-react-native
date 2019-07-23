import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

    return (
      <View style={styles.container}>
        <Text>온도: {celsius.toFixed(1)}</Text>
        <Text>날씨: {weather}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
