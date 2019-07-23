import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

// class CounterButton extends React.Component {
//   static defaultProps = {
//     counter: -1,
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       counter: props.counter,
//     };
//   }

//   clickHandler = () => {
//     this.setState({
//       counter: this.state.counter + 1,
//     });
//   };
// }

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>1</Text>
        <Text style={[styles.text, styles.text2]}>2</Text>
        <Text style={styles.text}>3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',

    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    flex: 2,
  }
});
