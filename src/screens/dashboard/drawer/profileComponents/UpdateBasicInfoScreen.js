import React, {Component} from 'react';
import {
  Text,
  Picker,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';

import {AppConsumer} from '../../../../context/AppProvider';
import ApiService from '../../../../network/ApiService';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class UpdateBasicInfoScreen extends Component {
  constructor(args) {
    super(args);
    apiService = new ApiService();
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      dob: 'DOB',
      dobDate: '',
      nationalIDNumber: '',
      mobileNumber: '',
      regNumber: '',
      gender: '',
      isSecurePay: false,
    };
    this.inputUserNameRef = React.createRef();
    this.inputFirstNameRef = React.createRef();
    this.inputLastNameRef = React.createRef();
    this.inputNationalIDRef = React.createRef();
    this.inputMobileNameRef = React.createRef();
    this.inputRegNumberNameRef = React.createRef();
  }

  componentDidMount() {
    if (this.context.userData && this.context.userData.registerData) {
      var data = this.context.userData.registerData;
      var date = new Date(data.dob.toString());
      data.dobDate = date;
      data.dob = moment(date).format('DD-MMM-YYYY');
      this.setState(data);
    }
  }

  onRegisterClick() {
    if (!this.isInputValid()) {
      return;
    }
    this.context.showLoading(true);
    var data = {
      registerData: {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.dobDate.toString(),
        nationalIDNumber: this.state.nationalIDNumber,
        mobileNumber: this.state.mobileNumber,
        regNumber: this.state.regNumber,
        gender: this.state.gender,
        isSecurePay: this.state.isSecurePay,
      },
    };
    apiService.updateFirestoreUserData(this.context.currentUser.uid, data);
    this.context.showLoading(false);
    this.context.updateUserData(user => {
      this.context.showLoading(false);
      this.context.goBack(this);
    });
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
                  Basic Info
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <ScrollView>
                <View style={{width: context.screenWidth}}>
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
                      {marginTop: 10},
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
                      {marginTop: 2},
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
                        this.inputNationalIDRef.current.focus();
                      }}
                    />
                  </View>
                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 2},
                    ]}>
                    <TouchableOpacity onPress={() => this.onDOBPress()}>
                      <Text
                        style={[
                          context.utilities.styles.InputTextEnableStyle,
                          {marginTop: 5},
                        ]}>
                        {this.state.dob}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 10},
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
                        this.inputEmailRef.current.focus();
                      }}
                    />
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 2},
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
                        this.inputRegNumberNameRef.current.focus();
                      }}
                    />
                  </View>

                  <View
                    style={[
                      context.utilities.styles.InputTextBoxStyle,
                      {marginTop: 10},
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
                      {marginTop: 2},
                    ]}>
                    <Picker
                      selectedValue={this.state.gender}
                      style={{height: 45, flex: 1}}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                          gender:
                            context.utilities.strings.GENDER[itemIndex].name,
                        });
                      }}>
                      {context.utilities.strings.GENDER.map(item => {
                        return (
                          <Picker.Item label={item.name} value={item.name} />
                        );
                      })}
                    </Picker>
                  </View>

                  <CheckBox
                    title="Do you want to secure holiday pay?"
                    checkedColor={context.utilities.colors.appColor}
                    containerStyle={
                      context.utilities.styles.CheckBoxContainerStyle
                    }
                    textStyle={[
                      context.utilities.styles.NewToAppTextStyle,
                      {marginTop: 3},
                    ]}
                    checked={this.state.isSecurePay}
                    onPress={() =>
                      this.setState({isSecurePay: !this.state.isSecurePay})
                    }
                  />

                  <TouchableOpacity onPress={() => this.onRegisterClick()}>
                    <Text
                      style={[
                        context.utilities.styles.LoginButtonEnableTextStyle,
                        {margin: 10},
                      ]}>
                      UPDATE
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
