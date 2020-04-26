import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class NotificationsScreen extends Component {
  componentDidMount() {
    this.context.setCurrentContext(this);
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  onItemClick(userID, item) {
    this.context.apiService.markNotificationAsRead(userID, item);
  }

  render() {
    const platformHeaderProps = {};
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress,
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
              title="Notifications"
              {...platformHeaderProps}
            />
            {context.userNotifications.length > 0 && (
              <FlatList
                extraData={context.userNotifications}
                data={context.userNotifications}
                renderItem={({item}) => (
                  <View style={context.utilities.styles.ContactsRowStyle}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text
                          style={
                            context.utilities.styles.ContactsUserNameTextStyle
                          }>
                          {item.message}
                        </Text>
                        <Text
                          style={[
                            context.utilities.styles.ContactsUserNameTextStyle,
                            {fontSize: 12, color: '#939393'},
                          ]}>
                          {context.apiService.getFormattedTime(
                            item.time,
                            context.utilities.strings.DISPLAY_TIME_FORMAT_1,
                          )}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.onItemClick(context.currentUser.uid, item);
                        }}>
                        <Text
                          style={[context.utilities.styles.MarkReadTextStyle]}>
                          Mark as read
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
            {context.userNotifications.length === 0 && (
              <View style={context.utilities.styles.CenterDataViewStyle}>
                <Text style={context.utilities.styles.NoDataTextStyle}>
                  {context.utilities.strings.msgNoNotificationsFound}
                </Text>
              </View>
            )}
          </View>
        )}
      </AppConsumer>
    );
  }
}
