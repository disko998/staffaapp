import React from 'react';
import {View, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Colors from '../utils/res/Colors';

export default function CustomStatusBar({bg, barStyle}) {
  return (
    <>
      <StatusBar backgroundColor={Colors.secondary} barStyle={barStyle} />
      <View
        style={{
          height: getStatusBarHeight(),
          width: '100%',
          backgroundColor: bg,
        }}
      />
    </>
  );
}
