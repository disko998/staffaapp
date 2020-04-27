import React, {Component} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

import {AppConsumer} from '../../../context/AppProvider';
import SignUpForm from '../../../components/SignUpForm';
import StaffDescription from '../../../components/StaffDescription';

export default class SignUpScreen extends Component {
  render() {
    return (
      <AppConsumer>
        {context => (
          <View style={context.utilities.styles.root}>
            <StatusBarPaddingIOS />
            <View style={context.utilities.styles.baseStyle1}>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <StaffDescription desc="Hello friends we are glad to add you in Staff family. Create your account and find jobs many more things by just registering your details." />
                <SignUpForm navigationContext={this} />
              </KeyboardAwareScrollView>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
