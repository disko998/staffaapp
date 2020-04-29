import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function Notification({notification: {title}}) {
  const context = useContext(AppContext);
  const {
    messageWrapper,
    notificationTitle,
    notificationLink,
  } = context.utilities.styles;

  return (
    <TouchableOpacity style={messageWrapper}>
      <Text style={notificationTitle}>{title}</Text>
      <Text ellipsizeMode="tail" style={notificationLink}>
        View
      </Text>
    </TouchableOpacity>
  );
}
