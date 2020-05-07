import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';

import {AppContext} from '../context/AppProvider';

const logo = require('../../assets/logo.png');

export default function StaffDescription({desc}) {
  const context = useContext(AppContext);
  return (
    <View style={context.utilities.styles.center}>
      <Image
        source={logo}
        height={50}
        width={50}
        style={context.utilities.styles.logoStyle}
      />
      <Text style={context.utilities.styles.headerLogoTextStyle}>
        {context.utilities.strings.appName}
      </Text>
    </View>
  );
}
