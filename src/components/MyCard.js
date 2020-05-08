import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';

import DefaultButton from './DefaultButton';
import {AppContext} from '../context/AppProvider';

export default function MyCard({data, buttonTitle}) {
  const context = useContext(AppContext);
  const {
    rowSpace,
    whiteTitle,
    grayText,
    mainText,
    card,
  } = context.utilities.styles;

  return data.map(item => (
    <Card containerStyle={card}>
      <Text style={whiteTitle}>{item.title}</Text>
      {item.data.map(option => {
        const key = Object.keys(option)[0];
        return (
          <View style={rowSpace}>
            <Text style={grayText}>{key} : </Text>
            <Text style={mainText}>{option[key]}</Text>
          </View>
        );
      })}
      <DefaultButton label={buttonTitle} />
    </Card>
  ));
}
