import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {AppContext} from '../context/AppProvider';
import Avatar from './Avatar';

export default function Notification({notification: {title}}) {
  const context = useContext(AppContext);
  const {
    messageWrapper,
    notificationTitle,
    notificationLink,
  } = context.utilities.styles;

  return (
    <TouchableOpacity style={messageWrapper}>
      <Avatar
        portrait
        src="https://randomuser.me/api/portraits/women/68.jpg"
        size={50}
      />
      <Text style={notificationTitle}>{title}</Text>
      <Text ellipsizeMode="tail" style={notificationLink}>
        Book
      </Text>
    </TouchableOpacity>
  );
}
