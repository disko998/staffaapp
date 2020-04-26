import React, {Component} from 'react';

import Navigation from './Router';
import AppProvider from './context/AppProvider';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
  }
}
