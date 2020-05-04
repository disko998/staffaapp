import React from 'react';
import {ScrollView} from 'react-native';

import MyCard from '../../../components/MyCard';
import Header from '../../../components/Header';

const PAYMENTS = [
  {
    title: 'Safe boy needed',
    data: [
      {'Approved Date': '2019-06-27 08:09 AM'},
      {'Agency name': 'Some Agency'},
      {'Job number': 'HC023'},
      {Amount: '$24.69'},
      {Status: 'Paid'},
    ],
  },
  {
    title: 'Moving and Handler required',
    data: [
      {'Approved Date': '2019-06-27 08:09 AM'},
      {'Agency name': 'Some Agency'},
      {'Job number': 'HC023'},
      {Amount: '$24.69'},
      {Status: 'Paid'},
    ],
  },
];

export default function MyPaymentsScreen({navigation}) {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header title="My payments" onBack={goBack} />
      <ScrollView style={{padding: 5}}>
        <MyCard data={PAYMENTS} buttonTitle="GET INVOICE" />
      </ScrollView>
    </>
  );
}
