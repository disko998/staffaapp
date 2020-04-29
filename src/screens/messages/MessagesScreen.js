import React from 'react';
import {ScrollView, StatusBar} from 'react-native';

import Message from '../../components/Message';
import Header from '../../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const MESSAGES = [
  {
    title: 'Staff Pay',
    date: new Date().toLocaleDateString(),
    content:
      'We need to show these calculations and amounts on posting of jobs (web page) and on apply for jobs on mobile',
    avatar:
      'https://cdn-fastly.hometalk.com/resources/imgs-responsive/avatar-letters/avatar-K-F1C40F.png',
  },
  {
    title: 'Staff Pay',
    date: new Date().toLocaleDateString(),
    content:
      'We need to show these calculations and amounts on posting of jobs (web page) and on apply for jobs on mobile',
    avatar:
      'https://cdn-fastly.hometalk.com/resources/imgs-responsive/avatar-letters/avatar-K-F1C40F.png',
  },
];

export default function MessagesScreen() {
  return (
    <ScrollView>
      <StatusBar backgroundColor={Colors.main} />
      <Header title="Messages" />
      {MESSAGES.map((message, index) => {
        return <Message message={message} key={message.title + index} />;
      })}
    </ScrollView>
  );
}
