import React, {Component} from 'react';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {AppConsumer} from '../../../context/AppProvider';
import SignInForm from '../../../components/SignInForm';
import StaffDescription from '../../../components/StaffDescription';

export default class LoginScreen extends Component {
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
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <KeyboardAwareScrollView
                style={{padding: 15, marginBottom: 10}}
                showsVerticalScrollIndicator={false}>
                <StaffDescription
                  desc="Welcome to Staff App. Manage your jobs and many more things by
                        just login using your credentials."
                />
                <SignInForm navigationContext={this} />
              </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
          </View>
        )}
      </AppConsumer>
    );
  }
}
