import React, {useContext} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function Message({message: {avatar, title, content, date}}) {
  const context = useContext(AppContext);
  const {
    avatarMessageStyle,
    messageWrapper,
    messageContentWrapper,
    messageTitle,
    messageContent,
    messageDate,
  } = context.utilities.styles;

  return (
    <TouchableOpacity style={messageWrapper}>
      <Image style={avatarMessageStyle} source={{uri: avatar}} />
      <View style={messageContentWrapper}>
        <Text style={messageTitle}>{title}</Text>
        <Text style={messageContent}>{content}</Text>
        <Text style={messageDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}
