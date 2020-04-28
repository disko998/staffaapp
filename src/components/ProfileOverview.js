import React, {useContext} from 'react';
import {View, Text, Switch} from 'react-native';
import {Card, Divider, Button} from 'react-native-elements';

import Map from './Map';
import {AppContext} from '../context/AppProvider';

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
    <Card containerStyle={{marginBottom: 10}}>
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
            false: context.utilities.colors.lightGrayDark,
            true: context.utilities.colors.main,
          }}
          thumbColor={context.utilities.colors.white}
          ios_backgroundColor={context.utilities.styles.main}
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
          titleStyle={{color: context.utilities.colors.inactive}}
          onPress={onLocationChange}
        />
      </View>
      <Map />
    </Card>
  );
}
