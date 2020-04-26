import React, {Component} from 'react';
import {Text, Image, View, TextInput, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

import {AppConsumer} from '../../../context/AppProvider';
import ApiService from '../../../network/ApiService';

export default class SignUpScreen extends Component {
  constructor(args) {
    super(args);
    apiService = new ApiService();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dob: 'DOB',
      dobDate: '',
      nationalIDNumber: '',
      email: '',
      mobileNumber: '',
      regNumber: '',
      gender: 'Male',
      checked: false,
      isLoading: false,
    };
    this.inputUserNameRef = React.createRef();
    this.inputPasswordRef = React.createRef();
    this.inputConfirmPasswordRef = React.createRef();
    this.inputFirstNameRef = React.createRef();
    this.inputLastNameRef = React.createRef();
    this.inputNationalIDRef = React.createRef();
    this.inputEmailRef = React.createRef();
    this.inputMobileNameRef = React.createRef();
    this.inputRegNumberNameRef = React.createRef();
  }

  onRegisterClick() {
    if (!this.isInputValid()) {
      return;
    }
    this.context.showLoading(true);
    apiService.signUpWithEmailPassword(
      this.state.email,
      this.state.password,
      (error, response) => {
        if (response) {
          var userID = '' + response.user.uid;
          console.log('UserID : ' + userID);
          var data = {
            uid: userID,
            registerData: {
              username: this.state.username,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              dob: this.state.dobDate.toString(),
              nationalIDNumber: this.state.nationalIDNumber,
              mobileNumber: this.state.mobileNumber,
              regNumber: this.state.regNumber,
              gender: this.state.gender,
              isSecurePay: this.state.checked,
            },
          };
          apiService.addFirestoreUserData(userID, data);
          apiService.sendEmailVerification((error, response) => {
            this.context.showLoading(false);
            if (response) {
              this.context.replaceScreen(
                this,
                this.context.utilities.strings.APP_SCREEN_VERIFY,
              );
            } else {
              this.context.showToast(error);
            }
          });
        } else {
          this.context.showLoading(false);
          this.context.showToast(error);
        }
      },
    );
  }

  isInputValid() {
    if (this.state.username === '') {
      this.context.showToast('Please enter username');
      return false;
    }
    if (this.state.firstName === '') {
      this.context.showToast('Please enter first name');
      return false;
    }
    if (this.state.lastName === '') {
      this.context.showToast('Please enter last name');
      return false;
    }
    if (this.state.password === '') {
      this.context.showToast('Please enter password');
      return false;
    }
    if (this.state.confirmPassword === 'Please enter confirm password') {
      this.context.showToast('');
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.context.showToast("Password doesn't match");
      return false;
    }
    if (this.state.email === '') {
      this.context.showToast('Please enter email');
      return false;
    }
    if (this.state.mobileNumber === '') {
      this.context.showToast('Please enter mobile number');
      return false;
    }
    if (this.state.nationalIDNumber === '') {
      this.context.showToast('Please enter national id number');
      return false;
    }
    if (this.state.regNumber === '') {
      this.context.showToast('Please enter registration number');
      return false;
    }
    if (this.state.dobDate === '') {
      this.context.showToast('Please select date of birth');
      return false;
    }
    return true;
  }

  onDOBDatePicked = date => {
    this.setState({dobDate: date});
    this.setState({dob: moment(date).format('DD-MMM-YYYY')});
  };

  onDOBPress = () => {
    this.context.showDatePicker(this.state.dobDate, date => {
      this.onDOBDatePicked(date);
    });
  };

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
                  New Account
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <KeyboardAwareScrollView>
                {/* <ScrollView style={{width: context.screenWidth}}> */}
                <View style={{width: context.screenWidth}}>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputFirstNameRef}
                      style={
                        this.state.firstName === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="First Name"
                      onChangeText={text => {
                        this.setState({firstName: text});
                      }}
                      returnKeyType={'next'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.firstName}
                      onSubmitEditing={() => {
                        this.inputLastNameRef.current.focus();
                      }}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputLastNameRef}
                      style={
                        this.state.lastName === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Last Name"
                      onChangeText={text => {
                        this.setState({lastName: text});
                      }}
                      returnKeyType={'next'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.lastName}
                      onSubmitEditing={() => {
                        this.inputEmailRef.current.focus();
                      }}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputEmailRef}
                      style={
                        this.state.email === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Email"
                      onChangeText={text => {
                        this.setState({email: text});
                      }}
                      returnKeyType={'next'}
                      keyboardType={'email-address'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.email}
                      onSubmitEditing={() => {
                        this.inputMobileNameRef.current.focus();
                      }}
                    />
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputMobileNameRef}
                      style={
                        this.state.mobileNumber === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Mobile Number"
                      onChangeText={text => {
                        this.setState({mobileNumber: text});
                      }}
                      returnKeyType={'next'}
                      keyboardType={'phone-pad'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.mobileNumber}
                      onSubmitEditing={() => {
                        this.inputUserNameRef.current.focus();
                      }}
                    />
                  </View>
                  <View style={context.utilities.styles.InputTextBoxStyle}>
                    <TextInput
                      ref={this.inputUserNameRef}
                      style={
                        this.state.username === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Username"
                      onChangeText={text => {
                        this.setState({username: text});
                      }}
                      returnKeyType={'next'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.username}
                      onSubmitEditing={() => {
                        this.inputPasswordRef.current.focus();
                      }}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputPasswordRef}
                      style={
                        this.state.password === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Password"
                      onChangeText={text => {
                        this.setState({password: text});
                      }}
                      returnKeyType={'next'}
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.password}
                      onSubmitEditing={() => {
                        this.inputConfirmPasswordRef.current.focus();
                      }}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputConfirmPasswordRef}
                      style={
                        this.state.confirmPassword === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Confirm Password"
                      onChangeText={text => {
                        this.setState({confirmPassword: text});
                      }}
                      returnKeyType={'next'}
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.confirmPassword}
                      onSubmitEditing={() => {
                        this.inputNationalIDRef.current.focus();
                      }}
                    />
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputNationalIDRef}
                      style={
                        this.state.nationalIDNumber === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="National Insurance Number"
                      onChangeText={text => {
                        this.setState({nationalIDNumber: text});
                      }}
                      returnKeyType={'next'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.nationalIDNumber}
                      onSubmitEditing={() => {
                        this.inputRegNumberNameRef.current.focus();
                      }}
                    />
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TextInput
                      ref={this.inputRegNumberNameRef}
                      style={
                        this.state.regNumber === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableStyle
                      }
                      placeholder="Registration Number"
                      onChangeText={text => {
                        this.setState({regNumber: text});
                      }}
                      returnKeyType={'done'}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.hintColor}
                      textAlign={'center'}
                      value={this.state.regNumber}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {borderWidth: 0, justifyContent: 'space-evenly'},
                    ]}>
                    <RadioButton.Group
                      onValueChange={value => this.setState({gender: value})}
                      value={this.state.gender}
                      style={{height: 45, flex: 1}}>
                      <View>
                        <Text>Male</Text>
                        <RadioButton value="Male" />
                      </View>
                      <View>
                        <Text>Female</Text>
                        <RadioButton value="Female" />
                      </View>
                    </RadioButton.Group>
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 5},
                    ]}>
                    <TouchableOpacity onPress={() => this.onDOBPress()}>
                      <Text
                        style={[
                          context.utilities.styles.InputTextEnableStyle,

                          {marginTop: 5, color: 'gray'},
                        ]}>
                        {this.state.dob}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <CheckBox
                    title="Do you want to secure holiday pay?"
                    checkedColor={context.utilities.colors.appColor}
                    containerStyle={
                      context.utilities.styles.CheckBoxContainerStyle
                    }
                    textStyle={[
                      context.utilities.styles.NewToAppTextStyle,
                      {marginTop: 5, color: 'black'},
                    ]}
                    checked={this.state.checked}
                    onPress={() =>
                      this.setState({checked: !this.state.checked})
                    }
                  />

                  <TouchableOpacity onPress={() => this.onRegisterClick()}>
                    <Text
                      style={[
                        context.utilities.styles.LoginButtonEnableTextStyle,
                        {margin: 10},
                      ]}>
                      REGISTER
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* </ScrollView> */}
              </KeyboardAwareScrollView>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
