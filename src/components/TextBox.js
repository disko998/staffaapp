import React, {useContext} from 'react';
import {TextInput, View, Text} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function TextBox({label, ...InputProps}) {
  const context = useContext(AppContext);
  const {
    InputTextBoxStyle,
    inputLabel,
    inputWrapper,
  } = context.utilities.styles;
  const {gray} = context.utilities.colors;

  return (
    <View style={inputWrapper}>
      <Text style={inputLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={gray}
        underlineColorAndroid="transparent"
        {...InputProps}
        style={[InputTextBoxStyle, InputProps.style]}
      />
    </View>
  );
}
