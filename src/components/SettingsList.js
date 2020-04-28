import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Card, Divider, Icon} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function SettingsList({settings}) {
  const context = useContext(AppContext);
  const {row, center, settingsLink, vm} = context.utilities.styles;

  return (
    <Card containerStyle={{marginBottom: 20}}>
      {settings.map((setting, index) => (
        <>
          <TouchableOpacity style={[row, center]} onPress={setting.onPress}>
            {setting.icon && setting.icon}
            <Text style={settingsLink}>{setting.label}</Text>
            <Icon
              name="chevron-right"
              color={context.utilities.colors.inactive}
            />
          </TouchableOpacity>
          {settings.length - 1 !== index && <Divider style={vm} />}
        </>
      ))}
    </Card>
  );
}
