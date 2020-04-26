import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../utils/header';
import {AppConsumer} from '../../context/AppProvider';
import Geolocation from '@react-native-community/geolocation';
import Strings from '../../utils/res/Strings';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class HomeScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      shiftsData: [],
    };
  }

  componentDidMount() {
    this.context.setCurrentContext(this);
    const travel =
      !!this.context.userData.bio.travelDistance &&
      this.context.userData.bio.travelDistance.split(' ');
    Geolocation.getCurrentPosition(
      ({coords}) => {
        this.context.apiService.getShiftsData(
          coords.latitude,
          coords.longitude,
          Number(travel[0]),
          'mi',
          data => {
            this.setState({shiftsData: data});
          },
        );
      },
      err => {
        alert('Please share your location');
        __DEV__ && console.log('NO LOCATION FOUND', err);
      },
      {enableHighAccuracy: true, timeout: 10000},
    );

    if (this.context.openFromNotification) {
      this.context.performNotificationAction(this);
    }
  }

  showShift = item => () => {
    this.context.moveToScreenPayload(this, Strings.APP_BID_SCREEN, {item});
  };

  toggleDrawer = () => {
    this.context.toggleDrawer(true);
  };
  render() {
    const platformHeaderProps = {};
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../images/menu.png'),
      layout: 'icon',
      onPress: this.toggleDrawer,
    };
    return (
      <AppConsumer>
        {context => (
          <View
            style={context.utilities.styles.root}
            ref={ref => {
              this.context = context;
            }}>
            <StatusBarPaddingIOS />
            <Header
              style={context.utilities.styles.headColor}
              title="Jobs"
              {...platformHeaderProps}
            />
            <View style={context.utilities.styles.baseStyle1}>
              <FlatList
                extraData={this.state.shiftsData}
                data={this.state.shiftsData}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={this.showShift(item)}>
                    <View
                      style={[
                        context.utilities.styles.QualificationListRowBGStyle,
                        {padding: 10},
                      ]}>
                      <Text style={context.utilities.styles.jobStyles}>
                        Job Number : {item.jobNo}
                      </Text>
                      <Text style={context.utilities.styles.jobStyles}>
                        Job Name: {item.name}
                      </Text>
                      <Text style={context.utilities.styles.jobStyles}>
                        Budget: {item.cost}
                      </Text>
                      <Text style={context.utilities.styles.jobStyles}>
                        Date: {item.date}
                      </Text>
                      {!!item.bidUids &&
                        item.bidUids.includes(context.currentUser.uid) && (
                          <Text style={context.utilities.styles.appliedStyle}>
                            Applied
                          </Text>
                        )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
