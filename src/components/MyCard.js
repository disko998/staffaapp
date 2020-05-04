import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';

import DefaultButton from './DefaultButton';
import {AppContext} from '../context/AppProvider';

export default function MyCard({data, buttonTitle}) {
  const context = useContext(AppContext);
  const {rowSpace, darkTitle, grayText, mainText} = context.utilities.styles;

  return data.map(card => (
    <Card style={{padding: 15}}>
      <Text style={darkTitle}>{card.title}</Text>
      {card.data.map(option => {
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
