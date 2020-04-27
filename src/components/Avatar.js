import React from 'react';
import {View, Image} from 'react-native';

export default function Avatar({src, size}) {
  return (
    <View style={{padding: 2, borderRadius: 50}}>
      <Image
        style={{
          height: size,
          width: size,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: '#fff',
        }}
        source={{uri: src}}
      />
    </View>
  );
}
