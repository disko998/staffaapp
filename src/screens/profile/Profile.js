import React from 'react';
import {ScrollView, View, StatusBar} from 'react-native';

import ProfileBanner from '../../components/ProfileBanner';
import Colors from '../../utils/res/Colors';

export default function ProfileScreen() {
  return (
    <ScrollView>
      <StatusBar backgroundColor={Colors.secondary} />
      <ProfileBanner
        name="Julie Smith"
        title="Nurse at RGN Dip LL."
        rating={4.5}
        avatar="https://randomuser.me/api/portraits/women/68.jpg"
      />
    </ScrollView>
  );
}
