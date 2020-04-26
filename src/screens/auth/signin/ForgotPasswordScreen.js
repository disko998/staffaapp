import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider';
import ApiService from '../../../network/ApiService';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';
import TextBox from '../../../components/TextBox';
import DefaultButton from '../../../components/DefaultButton';

export default class ForgotPasswordScreen extends Component {
  constructor(args) {
    super(args);
    apiService = new ApiService();
    this.state = {
      username: '',
    };
  }

  onForgotPasswordClick() {
    if (!this.isInputValid()) {
      return;
    }
    this.context.showLoading(true);
    apiService.sendForgotPasswordEmail(
      this.state.username,
      (error, response) => {
        this.context.showLoading(false);
        if (response) {
          this.context.showToast('Reset passowrd email has been sent');
          this.props.navigation.goBack();
        } else {
          this.context.showToast(error);
        }
      },
    );
  }

  isInputValid() {
    if (this.state.username === '') {
      this.context.showToast('Please enter email');
      return false;
    }
    return true;
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
                  source={require('../../../images/back.png')}
                  style={{width: 30, height: 30}}
                  tintColor={context.utilities.colors.black}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  Forgot Password
                </Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View style={context.utilities.styles.baseStyle1}>
                <View style={{width: '100%'}}>
                  <TextBox
                    placeholder="Username"
                    onChangeText={text => {
                      this.setState({username: text});
                    }}
                    returnKeyType={'done'}
                    keyboardType={'email-address'}
                    value={this.state.username}
                    onSubmitEditing={() => {
                      this.onForgotPasswordClick();
                    }}
                  />

                  <DefaultButton
                    title="RESET PASSWORD"
                    onPress={() => this.onForgotPasswordClick()}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </AppConsumer>
    );
  }
}
