import React, {useContext} from 'react';
import {View, Text, Switch} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';

import Map from './Map';
import {AppContext} from '../context/AppProvider';
import Colors from '../utils/res/Colors';

export default function ProfileOverview({
  staffNumber,
  status,
  location,
  onStatusChange,
  onLocationChange,
}) {
  const context = useContext(AppContext);
  const {row, center, label, itemText, vm} = context.utilities.styles;

  return (
    <Card containerStyle={{backgroundColor: Colors.main, borderWidth: 0}}>
      <View style={[row, center]}>
        <Text style={label}>Staff number : </Text>
        <Text style={itemText}>{staffNumber}</Text>
      </View>
      <Divider style={vm} />
      <View style={[row, center]}>
        <Text style={label}>Status : </Text>
        <Text style={itemText}>{status ? 'Active' : 'Inactive'}</Text>
        <Switch
          trackColor={{
            false: context.utilities.colors.white,
            true: context.utilities.colors.white,
          }}
          thumbColor={context.utilities.colors.main}
          ios_backgroundColor={context.utilities.styles.white}
          onValueChange={onStatusChange}
          value={status}
        />
      </View>
      <Divider style={vm} />
      <View style={[row, center]}>
        <Text style={label}>Current location : </Text>
        <Text style={itemText}>{location}</Text>
        <Button
          title="Edit"
          type="clear"
          titleStyle={{color: context.utilities.colors.white}}
          onPress={onLocationChange}
        />
      </View>
      <Map />
    </Card>
  );
}
