import React, {Component} from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class UpdateNotificationSettingsScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isNotificationON: false,
    };
  }

  componentDidMount() {
    if (this.context.userData && this.context.userData.notificationSettings) {
      this.setState(this.context.userData.notificationSettings);
    }
  }

  onAgreeClick() {
    this.context.showLoading(false);
    var data = {
      notificationSettings: {
        isNotificationON: this.state.isNotificationON,
      },
    };
    this.context.apiService.updateFirestoreUserData(
      this.context.currentUser.uid,
      data,
    );
    this.context.updateUserData(user => {
      this.context.showLoading(false);
      this.context.goBack(this);
    });
  }

  render() {
    return (
      <AppConsumer>
        {context => (
          <View
            style={context.utilities.styles.root}
            ref={ref => {
              this.context = context;
            }}>
            <StatusBarPaddingIOS />
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{position: 'absolute', marginLeft: 10}}
                onPress={() => context.goBack(this)}>
                <Image
                  source={require('../../../../images/back.png')}
                  style={{width: 30, height: 30}}
                  tintColor={context.utilities.colors.black}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  Notifications
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <ScrollView
                style={[
                  context.utilities.styles.TNCFixBackgroundViewStyle,
                  {height: 100},
                ]}>
                <Text
                  style={[
                    context.utilities.styles.TNCTextStyle,
                    {fontSize: 15},
                  ]}>
                  {context.utilities.strings.registerNotificationMsg}
                </Text>
              </ScrollView>

              <CheckBox
                title="Turn Notifications ON/OFF"
                checkedColor={context.utilities.colors.appColor}
                containerStyle={
                  context.utilities.styles.CheckBoxLeftContainerStyle
                }
                textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                checked={this.state.isNotificationON}
                onPress={() => {
                  this.setState({
                    isNotificationON: !this.state.isNotificationON,
                  });
                }}
              />

              <TouchableOpacity
                style={{width: context.screenWidth}}
                onPress={() => this.onAgreeClick()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {marginTop: 30, marginBottom: 30},
                  ]}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
