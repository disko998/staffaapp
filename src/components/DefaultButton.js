import React, {useContext} from 'react';
import {Button} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function DefaultButton({label, type, color, ...ButtonProps}) {
  const context = useContext(AppContext);
  const {white, main, appBGColor} = context.utilities.colors;
  const {defaultButton, typeButton} = context.utilities.styles;

  type = type ? type : 'solid';
  color = color ? color : appBGColor;

  const theme = type === 'solid' ? defaultButton : typeButton;

  return (
    <Button
      title={label}
      buttonStyle={[theme, {backgroundColor: color}]}
      titleStyle={{color: white, fontWeight: 'bold'}}
      type={type}
      {...ButtonProps}
    />
  );
}
