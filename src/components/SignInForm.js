import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

import TextBox from './TextBox';
import DefaultButton from './DefaultButton';
import {AppContext} from '../context/AppProvider';
import ApiService from '../network/ApiService';

export default function SignInForm({navigationContext}) {
  const context = useContext(AppContext);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const apiService = new ApiService();

  const {
    ForgotPasswordLinkText,
    ForgotPasswordText,
    formTitle,
    checkboxlabel,
  } = context.utilities.styles;
  const {main, white} = context.utilities.colors;

  const isInputValid = () => {
    if (credentials.username === '') {
      context.showToast('Please enter email');
      return false;
    }
    if (credentials.password === '') {
      context.showToast('Please enter password');
      return false;
    }
    return true;
  };

  const onLoginClick = () => {
    if (!isInputValid()) {
      return;
    }

    context.showLoading(true);

    apiService.signInWithEmailPassword(
      credentials.username,
      credentials.password,
      (error, response) => {
        if (response) {
          context.checkUserAuthentication((user, response) => {
            context.showLoading(false);

            if (!!response && !!response.registerData) {
              if (user.emailVerified) {
                context.replaceScreen(navigationContext, context.currentScreen);
              } else {
                context.clearAllData();
                context.showToast('Please verify your email');
              }
            } else {
              context.clearAllData();
              context.showToast(
                'This email belongs to an admin account. Please use web to login',
              );
            }
          });

          setCredentials({
            username: '',
            password: '',
            rememberMe: false,
          });
        } else {
          context.showLoading(false);
          context.showToast(error);
        }
      },
    );
  };

  const onForgotPasswordClick = function() {
    context.moveToScreen(
      navigationContext,
      context.utilities.strings.APP_SCREEN_FORGOT_PASSWORD,
    );
  };

  const onRegisterClick = function() {
    context.moveToScreen(
      navigationContext,
      context.utilities.strings.APP_SCREEN_SIGNUP,
    );
  };

  return (
    <View style={{width: '100%', padding: 5}}>
      <Text style={formTitle}>Sign in</Text>
      <TextBox
        label="Email"
        placeholder="Enter your email or username"
        onChangeText={text => {
          setCredentials({...credentials, username: text});
        }}
        returnKeyType={'next'}
        keyboardType={'email-address'}
        value={credentials.username}
      />
      <TextBox
        label="Password"
        placeholder="Password"
        onChangeText={text => {
          setCredentials({...credentials, password: text});
        }}
        returnKeyType={'done'}
        secureTextEntry={true}
        value={credentials.password}
        onSubmitEditing={onLoginClick}
      />

      <CheckBox
        containerStyle={context.utilities.styles.checkbox}
        title="Remember this device"
        textStyle={checkboxlabel}
        checked={credentials.rememberMe}
        uncheckedColor={white}
        checkedColor={white}
        onPress={() => {
          setCredentials({...credentials, rememberMe: !credentials.rememberMe});
        }}
      />

      <DefaultButton onPress={onLoginClick} title="SIGN IN" color={main} />

      <Text style={ForgotPasswordText}>
        Forgot your password?
        <Text onPress={onForgotPasswordClick} style={ForgotPasswordLinkText}>
          {' '}
          Reset here.
        </Text>
      </Text>

      <Text style={{textAlign: 'center', color: white}}>Or</Text>

      <DefaultButton
        onPress={onRegisterClick}
        type="outline"
        title="REGISTER HERE"
      />
    </View>
  );
}
