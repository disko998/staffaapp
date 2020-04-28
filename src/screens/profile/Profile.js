import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../utils/res/Colors';
import ProfileBanner from '../../components/ProfileBanner';
import ProfileOverview from '../../components/ProfileOverview';
import SettingsList from '../../components/SettingsList';

const profileSettings = [
  {
    label: 'Training',
    icon: <Feather name="briefcase" color={Colors.inactive} size={20} />,
  },
  {
    label: 'Settings',
    icon: <Feather name="settings" color={Colors.inactive} size={20} />,
  },
  {
    label: 'Finance',
    icon: (
      <MaterialIcons name="attach-money" color={Colors.inactive} size={20} />
    ),
  },
  {
    label: 'Offers',
    icon: <Feather name="gift" color={Colors.inactive} size={20} />,
  },
];

export default function ProfileScreen() {
  const [status, setStatus] = React.useState(true);

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
        status={status}
        location="London"
        onStatusChange={value => setStatus(value)}
        onLocationChange={value => console.log(value)}
      />
      <SettingsList settings={profileSettings} />
    </ScrollView>
  );
}
