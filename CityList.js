import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, StatusBar, View } from 'react-native';
import { SearchList, HighlightableText } from '@unpourtous/react-native-search-list';
import Constants from 'expo-constants';
import config from './config/config';

export default class CityList extends React.Component {

    static navigationOptions = {
        title: 'Cities',
    };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
    this.rowHeight = 40;
  }

  componentDidMount() {
    fetch(`http://` + config.ip + `:` + config.port + `/weather-crawler/available-cities`)
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        var citiesOb = cities.map(function (str) {
          return { 'searchStr': str };
        });
        this.setState({
          cities: citiesOb,
        });
      });
   };

  onPressCity(item) {
    this.props.navigation.navigate(
        'Detail',
        {
          city: item.searchStr
        }
      );
  }

  // custom render row
  renderRow (city, sectionID, rowID, highlightRowFunc, isSearching) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <View key={rowID} style={{flex: 1, marginLeft: 20, height: this.rowHeight, justifyContent: 'center'}}>
          <HighlightableText
            text={city.searchStr}
            textColor={'#000'}
            hightlightTextColor={'#0069c0'}
          />
        </View>
        <Text style={styles.text}>{city.searchStr}</Text>
      </TouchableOpacity>
    )
  }
 
  // render empty view when datasource is empty
  renderEmpty () {
    return (
      <View style={styles.emptyDataSource}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Content </Text>
      </View>
    )
  }
 
  // render empty result view when search result is empty
  renderEmptyResult (searchStr) {
    return (
      <View style={styles.emptySearchResult}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Result For <Text
          style={{color: '#171a23', fontSize: 18}}>{searchStr}</Text></Text>
        <Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search again</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#F00' barStyle='light-content' />
        <SearchList
          data={this.state.cities}
          renderRow={this.renderRow.bind(this)}
          renderEmptyResult={this.renderEmptyResult.bind(this)}
          renderBackButton={() => null}
          renderEmpty={this.renderEmpty.bind(this)}
 
          rowHeight={this.rowHeight}
 
          toolbarBackgroundColor={'#2196f3'}
          title='Search List'
          cancelTitle='Cities'
          onClickBack={() => {}}
 
          searchListBackgroundColor={'#2196f3'}
 
          searchBarToggleDuration={300}
 
          searchInputBackgroundColor={'#0069c0'}
          searchInputBackgroundColorActive={'#6ec6ff'}
          searchInputPlaceholderColor={'#FFF'}
          searchInputTextColor={'#FFF'}
          searchInputTextColorActive={'#000'}
          searchInputPlaceholder='Search'
          sectionIndexTextColor={'#6ec6ff'}
          searchBarBackgroundColor={'#2196f3'}
        />
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

  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'orange',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  emptyDataSource: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  emptySearchResult: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  }
});