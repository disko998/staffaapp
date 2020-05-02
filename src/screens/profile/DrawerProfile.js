import React from 'react';
import {ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerItem} from '@react-navigation/drawer';

import Colors from '../../utils/res/Colors';
import ProfileBanner from '../../components/ProfileBanner';
import Strings from '../../utils/res/Strings';

const profileSettings = [
  {
    label: 'Shift',
    icon: <Feather name="briefcase" color={Colors.inactive} size={20} />,
    onPress: () => {},
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

export default function DrawerProfile({navigation}) {
  const profileSettings = [
    {
      label: 'Shift',
      icon: <Feather name="briefcase" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('shift'),
    },
    {
      label: 'My Bids',
      icon: <FontAwesome name="legal" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('bids'),
    },
    {
      label: 'My Contracts',
      icon: <FontAwesome5 name="file-alt" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('contracts'),
    },
    {
      label: 'My Payments',
      icon: <MaterialIcons name="payment" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('payments'),
    },
    {
      label: 'Logout',
      icon: (
        <MaterialIcons name="exit-to-app" color={Colors.inactive} size={20} />
      ),
      onPress: () => navigation.navigate('logout'),
    },
    {
      label: 'Help',
      icon: <Feather name="help-circle" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('help'),
    },
    {
      label: 'Feedback',
      icon: <AntDesign name="like2" color={Colors.inactive} size={20} />,
      onPress: () => navigation.navigate('feedback'),
    },
  ];
  return (
    <ScrollView>
      <ProfileBanner
        name="Julie Smith"
        title="Nurse at RGN Dip LL."
        avatar="https://randomuser.me/api/portraits/women/68.jpg"
      />
      {profileSettings.map((setting, i) => (
        <React.Fragment key={setting.label}>
          <DrawerItem
            icon={() => setting.icon}
            label={setting.label}
            onPress={setting.onPress}
          />
          <Divider style={{width: '100%'}} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
