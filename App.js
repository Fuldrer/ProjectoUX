import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation'
import HomeScreen from './components/Home';
import ContactScreen from './components/Contacto';
import Drawer from './components/Drawer'
import Navigator from './components/routes'

export default class App extends React.Component {
  render() {
    return (
      <Navigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
