import React, {Component} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import moment from 'moment';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

import {AppConsumer} from '../../../context/AppProvider';
import ApiService from '../../../network/ApiService';
import SignUpForm from '../../../components/SignUpForm';
import StaffDescription from '../../../components/StaffDescription';

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
