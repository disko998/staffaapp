import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Avatar from './Avatar';
import StartsRating from './StartsRating';
import {AppContext} from '../context/AppProvider';

export default function ProfileBanner({name, title, rating, avatar}) {
  const context = useContext(AppContext);
  const {
    profileBanner,
    profileBannerName,
    profileBannerTitle,
    editProfileButton,
    editButtonText,
  } = context.utilities.styles;

  return (
    <View style={profileBanner}>
      <Avatar src={avatar} size={120} />
      <Text style={profileBannerName}>{name}</Text>
      <Text style={profileBannerTitle}>{title}</Text>
      {rating && <StartsRating startingValue={rating} />}
      {rating && (
        <TouchableOpacity style={editProfileButton}>
          <Feather
            name="edit-3"
            size={25}
            color={context.utilities.colors.white}
          />
          <Text style={editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
