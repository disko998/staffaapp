import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function StaffDescription({desc}) {
  const context = useContext(AppContext);
  return (
    <View style={{width: '100%'}}>
      <Text style={context.utilities.styles.headerLogoTextStyle}>
        {context.utilities.strings.appName}
      </Text>
      <Text style={context.utilities.styles.headerInfoTextStyle}>{desc}</Text>
    </View>
  );
}
