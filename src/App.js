import React, {Component} from 'react';

import Navigation from './Router';
import AppProvider from './context/AppProvider';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
  }
}
