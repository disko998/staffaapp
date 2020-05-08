import React, {useContext} from 'react';
import {View, Image} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function Avatar({src, size, portrait}) {
  const context = useContext(AppContext);
  const {
    avatarStyle,
    avatarWrapper,
    avatarMessageStyle,
  } = context.utilities.styles;

  const style = portrait ? avatarMessageStyle : avatarStyle;
  return (
    <View style={avatarWrapper}>
      <Image style={[style, {width: size, height: size}]} source={{uri: src}} />
    </View>
  );
}
