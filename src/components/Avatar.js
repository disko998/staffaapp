import React, {useContext} from 'react';
import {View, Image} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function Avatar({src, size}) {
  const context = useContext(AppContext);
  const {avatarStyle, avatarWrapper} = context.utilities.styles;
  return (
    <View style={avatarWrapper}>
      <Image
        style={[avatarStyle, {width: size, height: size}]}
        source={{uri: src}}
      />
    </View>
  );
}
