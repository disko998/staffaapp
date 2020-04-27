import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

import Avatar from './Avatar';
import {AppContext} from '../context/AppProvider';

export default function ProfileBanner() {
  const context = useContext(AppContext);
  const {
    profileBanner,
    profileBannerName,
    profileBannerTitle,
  } = context.utilities.styles;

  return (
    <View style={profileBanner}>
      <Avatar
        src="https://randomuser.me/api/portraits/women/68.jpg"
        size={120}
      />
      <Text style={profileBannerName}>Julie Smith</Text>
      <Text style={profileBannerTitle}>Nurse at RGN Dip LL.</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather name="edit-3" size={25} color={'#fff'} />
        <Text style={{color: '#fff', marginLeft: 5}}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}
