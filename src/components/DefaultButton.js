import React, {useContext} from 'react';
import {Button} from 'react-native-elements';

import {AppContext} from '../context/AppProvider';

export default function DefaultButton({label, type, ...ButtonProps}) {
  const context = useContext(AppContext);
  const {white, main} = context.utilities.colors;
  const {defaultButton, typeButton} = context.utilities.styles;

  type = type ? type : 'solid';

  const theme = type === 'solid' ? defaultButton : typeButton;

  return (
    <Button
      buttonStyle={theme}
      titleStyle={{color: type === 'solid' ? white : main, fontWeight: 'bold'}}
      type={type}
      {...ButtonProps}
    />
  );
}
