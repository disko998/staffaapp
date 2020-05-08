import React from 'react';
import {ScrollView} from 'react-native';

import MyCard from '../../../components/MyCard';
import Header from '../../../components/Header';
import Colors from '../../../utils/res/Colors';

const CONTRACTS = [
  {
    title: 'Safe boy needed',
    data: [
      {'Job number': 'HC023'},
      {'Time slots': '01:00 AM to 04:00 PM'},
      {'Bid price range': '$24.69'},
      {Date: '2019-06-27 08:09 AM'},
      {Status: 'Hired'},
    ],
  },
  {
    title: 'Moving and Handler required',
    data: [
      {'Job number': 'HC023'},
      {'Time slots': '01:00 AM to 04:00 PM'},
      {'Bid price range': '$24.69'},
      {Date: '2019-06-27 08:09 AM'},
      {Status: 'Pending'},
    ],
  },
];

export default function MyContactsScreen({navigation}) {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header title="My contacts" onBack={goBack} />
      <ScrollView style={{padding: 5, backgroundColor: Colors.appBGColor}}>
        <MyCard data={CONTRACTS} buttonTitle="OPEN CONTRACT" />
      </ScrollView>
    </>
  );
}
