import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Card, Divider} from 'react-native-elements';

import Notification from '../../components/Notification';
import Header from '../../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  return (
    <ScrollView>
      <StatusBar backgroundColor={Colors.main} />
      <Header title="Notifications" />
      <Card>
        {NOTIFICATIONS.map((notification, index) => {
          return (
            <React.Fragment key={notification.title + index}>
              <Notification notification={notification} />
              {NOTIFICATIONS.length - 1 !== index && <Divider />}
            </React.Fragment>
          );
        })}
      </Card>
    </ScrollView>
  );
}
