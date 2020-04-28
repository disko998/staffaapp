import React from 'react';
import {View, Text} from 'react-native';

export default function Map() {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'rgba(0,0,0,.1)',
        backgroundColor: 'rgba(34,139,34,0.5)',
      }}>
      <Text style={{color: '#fff'}}>Map goes here</Text>
    </View>
  );
}
