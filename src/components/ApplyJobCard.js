import React, {useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {AppContext} from '../context/AppProvider';

export default function ApplyJobCard({vacancy, shifts, title}) {
  const context = useContext(AppContext);
  const {
    infoContainer,
    applyJobCardStyle,
    whiteTitleText,
    whiteText,
    mainButton,
  } = context.utilities.styles;

  return (
    <View style={applyJobCardStyle}>
      <View style={infoContainer}>
        <Text style={[whiteTitleText, {marginBottom: 10}]}>{title}</Text>
        <Text style={whiteText}>Vacancy : {vacancy}</Text>
        <Text style={whiteText}>Shift hour : 10:00 to 15:00, 7 hours</Text>
        <Text style={whiteText}>Shift hour : 10:00 to 15:00, 7 hours</Text>
      </View>
      <TouchableOpacity style={mainButton}>
        <Text style={whiteTitleText}>APPLY FOR SHIFT</Text>
      </TouchableOpacity>
    </View>
  );
}
