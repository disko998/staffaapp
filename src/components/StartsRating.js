import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {Rating} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function StarsRating({...props}) {
  const context = useContext(AppContext);
  const {row, ratingText} = context.utilities.styles;

  return (
    <View style={[row, {marginTop: 5}]}>
      <Rating
        type="custom"
        readonly
        imageSize={20}
        ratingColor={context.utilities.colors.white}
        ratingBackgroundColor={context.utilities.colors.lightGrayDark}
        ratingCount={5}
        fractions={2}
        tintColor={context.utilities.colors.secondary}
        {...props}
      />
      <Text style={ratingText}>91/100</Text>
    </View>
  );
}
