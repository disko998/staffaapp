import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Navigation from './Router';
import AppProvider from './context/AppProvider';
import Colors from './utils/res/Colors';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.secondary}} />
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.main}}>
          <Navigation />
        </SafeAreaView>
      </AppProvider>
    );
  }
}
