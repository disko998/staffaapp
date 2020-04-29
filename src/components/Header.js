import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppContext} from '../context/AppProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../utils/res/Colors';

export default function Header({title, back = false}) {
  const context = useContext(AppContext);
  const {headerStyle, headerTitle} = context.utilities.styles;
  return (
    <View style={headerStyle}>
      {back && (
        <TouchableOpacity>
          <Ionicons name="ios-arrow-back" size={30} color={Colors.white} />
        </TouchableOpacity>
      )}
      <Text style={headerTitle}>{title}</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}
