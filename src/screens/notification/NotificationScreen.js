import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {Divider} from 'react-native-elements';

import Notification from '../../components/Notification';
import Header from '../../components/Header';
import Colors from '.././../utils/res/Colors';
import {AppContext} from '../../context/AppProvider';

const NOTIFICATIONS = [
  {
    title: 'Moving and Handling Course due',
  },
  {
    title: 'Ne rates for library insurance',
  },
  {
    title: 'NMC issue new rules for temps',
  },
];

export default function NotificationScreen() {
  const context = React.useContext(AppContext);
  const {notificationWrapper} = context.utilities.styles;
  return (
    <ScrollView style={{backgroundColor: Colors.appBGColor}}>
      <StatusBar backgroundColor={Colors.main} />
      <Header title="Notifications" />
      <View style={notificationWrapper}>
        {NOTIFICATIONS.map((notification, index) => {
          return (
            <React.Fragment key={notification.title + index}>
              <Notification notification={notification} />
              {NOTIFICATIONS.length - 1 !== index && (
                <Divider style={{backgroundColor: Colors.main}} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </ScrollView>
  );
}
