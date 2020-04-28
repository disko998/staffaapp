import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function SettingsList({}) {
  const context = useContext(AppContext);
  const {row, center, label, itemText, vm} = context.utilities.styles;

  return (
    <Card containerStyle={{marginBottom: 20}}>
      <View style={[row, center]}>
        <Text style={label}>Training</Text>
      </View>
      <Divider style={vm} />
    </Card>
  );
}
