import React, {Component} from 'react';
import {Text, Picker, View, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class UpdateVerificationScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      avatarSource: '',
      docURL: '',
      docType: '',
    };
  }

  componentDidMount() {
    if (this.context.userData && this.context.userData.docVerification) {
      this.setState(this.context.userData.docVerification);
    }
  }

  onNextClick() {
    if (this.state.avatarSource === '') {
      this.updateData(this.state.docURL);
    } else {
      this.uploadImage();
    }
  }

  uploadImage() {
    this.context.showLoading(true);
    var filePath =
      this.context.currentUser.uid +
      '/' +
      this.context.utilities.strings.FS_FILE_DIR_VERIFICATION;
    this.context.apiService.uploadImage(
      filePath,
      this.state.avatarSource,
      (error, response) => {
        console.log('onNextClick response : ' + response);
        console.log('onNextClick error : ' + error);
        if (response.length > 0) {
          this.updateData(response);
        } else {
          this.context.showToast('File not uploaded');
        }
      },
    );
  }

  updateData(url) {
    this.context.showLoading(true);
    var data = {
      docVerification: {
        docType: this.state.docType,
        docURL: url,
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

  onScanClick() {
    this.context.showImagePickerAlert(image => {
      this.setState({avatarSource: image});
    });
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
                  Verification
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {marginTop: 50},
                ]}>
                Select Document Type
              </Text>
              <View
                style={[
                  context.utilities.styles.InputTextBoxStyle,
                  {marginTop: 50},
                ]}>
                <Picker
                  selectedValue={this.state.docType}
                  style={{height: 45, flex: 1}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      docType:
                        context.utilities.strings.DOC_TYPE[itemIndex].name,
                    });
                  }}>
                  {context.utilities.strings.DOC_TYPE.map(item => {
                    return <Picker.Item label={item.name} value={item.name} />;
                  })}
                </Picker>
              </View>

              <View
                style={{
                  margin: 30,
                  height: 200,
                  width: context.screenWidth - 60,
                  borderColor: context.utilities.colors.black,
                  borderWidth: 1,
                  borderRadius: 1,
                }}>
                {(this.state.avatarSource !== '' ||
                  this.state.docURL !== '') && (
                  <Image
                    style={{width: context.screenWidth - 64, height: 200}}
                    source={{
                      uri:
                        this.state.avatarSource.length > 0
                          ? this.state.avatarSource
                          : this.state.docURL,
                    }}
                  />
                )}
              </View>
              <TouchableOpacity
                style={{width: context.screenWidth}}
                onPress={() => this.onScanClick()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {marginTop: 30, marginBottom: 30},
                  ]}>
                  {this.state.avatarSource === ''
                    ? 'Upload Document'
                    : 'Scan Document'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: context.screenWidth}}
                onPress={() => this.onNextClick()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {marginTop: 10, marginBottom: 30},
                  ]}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
