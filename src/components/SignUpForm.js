import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';

import TextBox from './TextBox';
import DefaultButton from './DefaultButton';
import {AppContext} from '../context/AppProvider';
import ApiService from '../network/ApiService';

export default function SignUpForm({navigationContext}) {
  const [credentials, setCredentials] = useState({
    fullName: '',
    password: '',
    email: '',
    username: '',
  });
  const context = useContext(AppContext);
  const apiService = new ApiService();
  const {
    ForgotPasswordLinkText,
    ForgotPasswordText,
    formTitle,
  } = context.utilities.styles;

  const isInputValid = () => {
    if (credentials.username === '') {
      context.showToast('Please enter username');
      return false;
    }
    if (credentials.fullName === '') {
      context.showToast('Please enter your name');
      return false;
    }
    if (credentials.email === '') {
      context.showToast('Please enter email');
      return false;
    }
    if (credentials.password === '') {
      context.showToast('Please enter password');
      return false;
    }
    return true;
  };

  const onRegister = () => {
    // Register user
    if (!isInputValid()) {
      return;
    }

    context.showLoading(true);

    apiService.signUpWithEmailPassword(
      credentials.email,
      credentials.password,
      (error, response) => {
        if (response) {
          var userID = '' + response.user.uid;
          console.log('UserID : ' + userID);
          var data = {
            uid: userID,
            registerData: {
              username: credentials.username,
              fullName: credentials.fullName,
            },
          };
          apiService.addFirestoreUserData(userID, data);
          apiService.sendEmailVerification((error, response) => {
            context.showLoading(false);
            if (response) {
              context.replaceScreen(
                navigationContext,
                context.utilities.strings.APP_SCREEN_VERIFY,
              );
            } else {
              context.showToast(error);
            }
          });

          setCredentials({
            fullName: '',
            password: '',
            email: '',
            username: '',
          });
        } else {
          context.showLoading(false);
          context.showToast(error);
        }
      },
    );
  };

  const redirectToSignIn = function() {
    context.moveToScreen(
      navigationContext,
      context.utilities.strings.APP_SCREEN_LOGIN,
    );
  };

  return (
    <View style={{width: '100%', padding: 5}}>
      <Text style={formTitle}>Create Account</Text>
      <TextBox
        style={{color: context.utilities.colors.main}}
        label="Name"
        placeholder="John Doe"
        onChangeText={text => {
          setCredentials({...credentials, fullName: text});
        }}
        returnKeyType={'next'}
        value={credentials.fullName}
      />
      <TextBox
        style={{color: context.utilities.colors.main}}
        label="Email"
        placeholder="Enter your email"
        onChangeText={text => {
          setCredentials({...credentials, email: text});
        }}
        returnKeyType={'next'}
        keyboardType={'email-address'}
        value={credentials.email}
      />
      <TextBox
        style={{color: context.utilities.colors.main}}
        label="User name"
        placeholder="User name"
        onChangeText={text => {
          setCredentials({...credentials, username: text});
        }}
        returnKeyType={'next'}
        value={credentials.username}
      />
      <TextBox
        style={{color: context.utilities.colors.main}}
        label="Password"
        placeholder="Password"
        onChangeText={text => {
          setCredentials({...credentials, password: text});
        }}
        returnKeyType={'done'}
        secureTextEntry={true}
        value={credentials.password}
        onSubmitEditing={onRegister}
      />

      <DefaultButton onPress={onRegister} title="GET STARTED" />

      <Text style={ForgotPasswordText}>
        Don't you have Staff account?
        <Text onPress={redirectToSignIn} style={ForgotPasswordLinkText}>
          {' '}
          SIGN IN.{' '}
        </Text>
        here.
      </Text>
    </View>
  );
}
