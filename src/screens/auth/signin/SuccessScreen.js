import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class SuccessScreen extends Component {
  constructor(args) {
    super(args);
  }

  onNextClick() {
    this.context.replaceScreen(
      this,
      this.context.utilities.strings.APP_SCREEN_HOME,
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
                You Are Done!
              </Text>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {
                    fontSize: 13,
                    fontStyle: 'bold',
                    color: context.utilities.colors.appColor,
                  },
                ]}>
                SUCCESS{'\n'}You can now post your profile and apply for shifts.
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
                DONE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AppConsumer>
    );
  }
}
