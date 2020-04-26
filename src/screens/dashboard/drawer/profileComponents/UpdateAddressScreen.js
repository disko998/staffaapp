import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class UpdateAddressScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      address1: '',
      address2: '',
      address3: '',
      postcode: '',
      accountName: '',
      bankName: '',
      accountNumber: '',
      sortCode: '',
    };
    this.refAdd1 = React.createRef();
    this.refAdd2 = React.createRef();
    this.refAdd3 = React.createRef();
    this.refPostcode = React.createRef();

    this.refAccountName = React.createRef();
    this.refBankName = React.createRef();
    this.refAccountNumber = React.createRef();
    this.refSortCode = React.createRef();
  }

  componentDidMount() {
    if (this.context.userData && this.context.userData.addressData) {
      this.setState(this.context.userData.addressData);
    }
  }

  onNextClick() {
    if (!this.isInputValid()) {
      return;
    }
    this.context.showLoading(true);
    var data = {
      addressData: {
        address1: this.state.address1,
        address2: this.state.address2,
        address3: this.state.address3,
        postcode: this.state.postcode,
        accountName: this.state.accountName,
        accountNumber: this.state.accountNumber,
        bankName: this.state.bankName,
        sortCode: this.state.sortCode,
      },
    };
    this.context.apiService.updateFirestoreUserData(
      this.context.currentUser.uid,
      data,
    );
    this.context.updateUserData(user => {
      this.context.showLoading(false);
      this.context.goBack(this);
    });
  }

  isInputValid() {
    if (this.state.address1 === '') {
      this.context.showToast('Please enter address1');
      return false;
    }
    if (this.state.address2 === '') {
      this.context.showToast('Please enter address2');
      return false;
    }
    if (this.state.address3 === '') {
      this.context.showToast('Please enter address3');
      return false;
    }
    if (this.state.postcode === '') {
      this.context.showToast('Please enter postcode');
      return false;
    }
    if (this.state.accountName === '') {
      this.context.showToast('Please enter account name');
      return false;
    }
    if (this.state.bankName === '') {
      this.context.showToast('Please enter bank name');
      return false;
    }
    if (this.state.accountNumber === '') {
      this.context.showToast('Please enter account number');
      return false;
    }
    if (this.state.sortCode === '') {
      this.context.showToast('Please enter sort code');
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
                  Account
                </Text>
              </View>
            </View>

            <View style={context.utilities.styles.baseStyle1}>
              <View style={{width: context.screenWidth}}>
                <View style={context.utilities.styles.InputTextBoxStyle}>
                  <TextInput
                    ref={this.refAdd1}
                    style={
                      this.state.address1 === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Address 1"
                    onChangeText={text => {
                      this.setState({address1: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.address1}
                    onSubmitEditing={() => {
                      this.refAdd2.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refAdd2}
                    style={
                      this.state.address2 === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Address 2"
                    onChangeText={text => {
                      this.setState({address2: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.address2}
                    onSubmitEditing={() => {
                      this.refAdd3.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refAdd3}
                    style={
                      this.state.address3 === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Address 3"
                    onChangeText={text => {
                      this.setState({address3: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.address3}
                    onSubmitEditing={() => {
                      this.refPostcode.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refPostcode}
                    style={
                      this.state.postcode === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Postcode"
                    onChangeText={text => {
                      this.setState({postcode: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.postcode}
                    onSubmitEditing={() => {
                      this.refAccountName.current.focus();
                    }}
                  />
                </View>
                <Text style={context.utilities.styles.NewToAppTextStyle}>
                  Bank account to be paid into
                </Text>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 10},
                  ]}>
                  <TextInput
                    ref={this.refAccountName}
                    style={
                      this.state.accountName === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Account Name"
                    onChangeText={text => {
                      this.setState({accountName: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.accountName}
                    onSubmitEditing={() => {
                      this.refBankName.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refBankName}
                    style={
                      this.state.bankName === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Bank Name"
                    onChangeText={text => {
                      this.setState({bankName: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.bankName}
                    onSubmitEditing={() => {
                      this.refAccountNumber.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refAccountNumber}
                    style={
                      this.state.accountNumber === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Bank Account Number"
                    onChangeText={text => {
                      this.setState({accountNumber: text});
                    }}
                    returnKeyType={'next'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.accountNumber}
                    onSubmitEditing={() => {
                      this.refSortCode.current.focus();
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 2},
                  ]}>
                  <TextInput
                    ref={this.refSortCode}
                    style={
                      this.state.sortCode === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Sortcode"
                    onChangeText={text => {
                      this.setState({sortCode: text});
                    }}
                    returnKeyType={'done'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.sortCode}
                    onSubmitEditing={() => {
                      this.onNextClick();
                    }}
                  />
                </View>

                <TouchableOpacity onPress={() => this.onNextClick()}>
                  <Text
                    style={context.utilities.styles.LoginButtonEnableTextStyle}>
                    UPDATE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
