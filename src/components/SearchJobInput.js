import React, {useContext} from 'react';
import {TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AppContext} from '../context/AppProvider';

export default function SearchJobInput({label, ...InputProps}) {
  const context = useContext(AppContext);
  const {
    searchJobsInputWrapper,
    searchJobsInputStyle,
  } = context.utilities.styles;
  const {white} = context.utilities.colors;

  return (
    <View style={searchJobsInputWrapper}>
      <Ionicons name={'ios-search'} size={30} color={white} />
      <TextInput
        placeholderTextColor={white}
        {...InputProps}
        style={[searchJobsInputStyle, InputProps.style]}
      />
    </View>
  );
}
