import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class BeginVerificationScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
    };
  }

  onAgreeClick() {
    this.context.replaceScreen(
      this,
      this.context.utilities.strings.APP_SCREEN_VERIFICATION,
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
                Verification
              </Text>
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
                  {context.utilities.strings.registerVerificationMsg}
                </Text>
              </ScrollView>

              <TouchableOpacity
                style={{width: context.screenWidth}}
                onPress={() => this.onAgreeClick()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {marginTop: 30, marginBottom: 30},
                  ]}>
                  Begin ID Process
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
