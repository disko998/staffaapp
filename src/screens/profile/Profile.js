import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import ProfileBanner from '../../components/ProfileBanner';
import Colors from '../../utils/res/Colors';

export default function ProfileScreen() {
  return (
    <View>
      <StatusBar backgroundColor={Colors.secondary} />
      <ProfileBanner />
    </View>
  );
}
