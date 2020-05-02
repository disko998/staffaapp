import React, {useState} from 'react';
import {View} from 'react-native';

import Map from '../../components/Map';
import SearchJobInput from '../../components/SearchJobInput';
import ApplyJobCard from '../../components/ApplyJobCard';

export default function SearchJobScreen() {
  const [searchJob, setSearchJob] = useState('');

  return (
    <View style={{flex: 1}}>
      <Map />
      <SearchJobInput
        placeholder="Nurse"
        value={searchJob}
        onChangeText={setSearchJob}
      />
      <ApplyJobCard
        vacancy="Nurse"
        shifts={[]}
        title="CPMC Saint Luke Campus"
      />
    </View>
  );
}
