import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class VerifyMobileNumberScreen extends Component {
  constructor(args) {
    super(args);
  }

  onNextClick() {
    this.context.replaceScreen(
      this,
      this.context.utilities.strings.APP_SCREEN_LOGIN,
    );
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
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
                width: context.screenWidth,
              }}>
              <Text style={context.utilities.styles.headerLogoTextStyle}>
                {context.utilities.strings.appName}
              </Text>
              <Text style={context.utilities.styles.headerInfoTextStyle}>
                Status
              </Text>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {
                    marginTop: 30,
                    fontSize: 20,
                    color: context.utilities.colors.appColor,
                    fontWeight: 'bold',
                  },
                ]}>
                SUCCESS!
              </Text>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {
                    marginTop: 5,
                    marginLeft: 30,
                    marginRight: 30,
                    fontSize: 13,
                    fontWeight: 'bold',
                  },
                ]}>
                You are registered successfully with STAFFA Mobile App.{'\n'}We
                have sent you an email verification to your registered email id,
                please verify your email address and login to Staffa App.
              </Text>
            </View>
            <TouchableOpacity
              style={{width: context.screenWidth}}
              onPress={() => this.onNextClick()}>
              <Text
                style={[
                  context.utilities.styles.LoginButtonEnableTextStyle,
                  {marginTop: 10, marginBottom: 30},
                ]}>
                Go to Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AppConsumer>
    );
  }
}
