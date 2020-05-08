import React from 'react';
import {ScrollView, View} from 'react-native';
import {Divider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerItem} from '@react-navigation/drawer';

import Colors from '../../utils/res/Colors';
import ProfileBanner from '../../components/ProfileBanner';
import {AppContext} from '../../context/AppProvider';

export default function DrawerProfile({navigation}) {
  const profileSettings = [
    {
      label: 'Shift',
      icon: <Feather name="briefcase" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('shift'),
    },
    {
      label: 'My Bids',
      icon: <FontAwesome name="legal" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('bids'),
    },
    {
      label: 'My Contracts',
      icon: <FontAwesome5 name="file-alt" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('contracts'),
    },
    {
      label: 'My Payments',
      icon: <MaterialIcons name="payment" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('payments'),
    },
    {
      label: 'Logout',
      icon: <MaterialIcons name="exit-to-app" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('logout'),
    },
    {
      label: 'Help',
      icon: <Feather name="help-circle" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('help'),
    },
    {
      label: 'Feedback',
      icon: <AntDesign name="like2" color={Colors.white} size={20} />,
      onPress: () => navigation.navigate('feedback'),
    },
  ];
  return (
    <ScrollView style={{backgroundColor: Colors.appBGColor}}>
      <ProfileBanner
        name="Julie Smith"
        title="Nurse at RGN Dip LL."
        avatar="https://randomuser.me/api/portraits/women/68.jpg"
      />
      <View
        style={{marginVertical: 15, backgroundColor: Colors.main, padding: 10}}>
        {profileSettings.map((setting, i) => (
          <React.Fragment key={setting.label}>
            <DrawerItem
              icon={() => setting.icon}
              label={setting.label}
              activeTintColor={Colors.white}
              inactiveTintColor={Colors.white}
              onPress={setting.onPress}
            />
            <Divider
              style={{width: '100%', backgroundColor: Colors.appBGColor}}
            />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
}
