import React from 'react';
import {ScrollView, StatusBar} from 'react-native';

import ProfileBanner from '../../components/ProfileBanner';
import Colors from '../../utils/res/Colors';
import ProfileOverview from '../../components/ProfileOverview';

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
      <ProfileOverview
        staffNumber="HCP-445781/7787"
        status={true}
        location="London"
        onStatusChange={value => console.log(value)}
        onLocationChange={value => console.log(value)}
      />
    </ScrollView>
  );
}
