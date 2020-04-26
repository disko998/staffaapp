import React, {Component} from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class AddQualificationScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      data: {name: '', doc: '', docURL: ''},
    };
  }

  updateTotalData(image) {
    var data = this.state.data;
    data.doc = image;
    this.setState({data: data});
  }

  onUploadClick() {
    this.context.openGallery(image => {
      this.updateTotalData(image);
    });
  }

  onScanClick() {
    this.context.openCamera(image => {
      this.updateTotalData(image);
    });
  }

  updateFirestoreData(screen, singleData) {
    screen.context.showLoading(true);
    var allData = [];
    if (this.context.userData.qualification) {
      allData = this.context.userData.qualification.data;
    }
    console.log('onNextClick updateFirestoreData length : ' + allData.length);
    allData.push(singleData);
    console.log('onNextClick updateFirestoreData length 1 : ' + allData.length);
    var myData = {qualification: {data: allData}};
    screen.context.apiService.updateFirestoreUserData(
      screen.context.currentUser.uid,
      myData,
    );
    screen.context.updateUserData(user => {
      console.log(
        'onNextClick updateFirestoreData length 2 : ' +
          this.context.userData.qualification.data.length,
      );
      screen.context.showLoading(false);
      screen.context.goBack(screen);
    });
  }

  onNextClick() {
    if (this.state.data.name === '') {
      this.context.showToast('Please enter qualification name');
      return;
    }
    if (this.state.data.doc === '') {
      this.context.showToast('Please select document');
      return;
    }
    var data = this.state.data;
    var screen = this;
    screen.context.showLoading(true);
    var filePath =
      this.context.currentUser.uid +
      '/' +
      this.context.utilities.strings.FS_FILE_DIR_QUALIfICATION;
    this.context.apiService.uploadImage(
      filePath,
      data.doc,
      (error, response) => {
        console.log('onNextClick uploadImage response : ' + response);
        data.docURL = response;
        this.updateFirestoreData(screen, data);
      },
    );
  }

  updateTextChange(text) {
    var currentData = this.state.data;
    currentData.name = text;
    this.setState({data: currentData});
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
                  style={
                    context.utilities.styles.QualificationListTopImageStyle
                  }
                  tintColor={context.utilities.colors.black}
                />
              </TouchableOpacity>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  Add Qualification
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={context.utilities.styles.AddQualificationImageBGStyle}>
                  <Image
                    style={context.utilities.styles.AddQualificationImageStyle}
                    source={{uri: this.state.data.doc}}
                  />
                </View>
                <View style={context.utilities.styles.InputTextBoxStyle}>
                  <TextInput
                    style={
                      this.state.data.name === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Name of Qualification"
                    onChangeText={text => {
                      this.updateTextChange(text);
                    }}
                    returnKeyType={'done'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.data.name}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onScanClick();
                    }}>
                    <Text
                      style={
                        context.utilities.styles
                          .AddQualificationUploadButtonStyle
                      }>
                      Scan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.onUploadClick();
                    }}>
                    <Text
                      style={
                        context.utilities.styles
                          .AddQualificationUploadButtonStyle
                      }>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{width: context.screenWidth}}
              onPress={() => this.onNextClick()}>
              <Text
                style={[
                  context.utilities.styles.LoginButtonEnableTextStyle,
                  {marginTop: 10, marginBottom: 30},
                ]}>
                ADD
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AppConsumer>
    );
  }
}
