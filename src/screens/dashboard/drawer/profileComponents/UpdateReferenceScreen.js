import React, {Component} from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class UpdateReferenceScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      selectedData: '',
      selectedIndex: '',
    };
  }

  componentDidMount() {
    var index = this.props.navigation.state.params.index;
    this.setState({selectedIndex: index});
    this.setState({selectedData: this.context.userData.references.data[index]});
  }

  updateTotalData(image) {
    var data = this.state.selectedData;
    data.doc = image;
    this.setState({selectedData: data});
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

  updateFirestoreData(screen, data) {
    screen.context.showLoading(true);
    var allData = this.context.userData.references.data;
    allData[this.state.selectedIndex] = data;
    var myData = {
      references: {
        data: allData,
      },
    };
    screen.context.apiService.updateFirestoreUserData(
      screen.context.currentUser.uid,
      myData,
    );
    screen.context.updateUserData(user => {
      screen.context.showLoading(false);
      screen.context.goBack(screen);
    });
  }

  onNextClick() {
    if (this.state.selectedData.name === '') {
      this.context.showToast('Please enter reference name');
      return;
    }
    var data = this.state.selectedData;
    var screen = this;
    if (data.doc.length > 0) {
      screen.context.showLoading(true);
      var filePath =
        this.context.currentUser.uid +
        '/' +
        this.context.utilities.strings.FS_FILE_DIR_REFERENCES;
      this.context.apiService.uploadImage(
        filePath,
        data.doc,
        (error, response) => {
          console.log('onNextClick uploadImage response : ' + response);
          data.docURL = response;
          this.updateFirestoreData(screen, data);
        },
      );
    } else {
      this.updateFirestoreData(screen, data);
    }
  }

  updateTextChange(text) {
    var currentData = this.state.selectedData;
    currentData.name = text;
    this.setState({selectedData: currentData});
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
                  Update Reference
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={context.utilities.styles.AddQualificationImageBGStyle}>
                  <Image
                    style={context.utilities.styles.AddQualificationImageStyle}
                    source={{
                      uri: this.state.selectedData.doc
                        ? this.state.selectedData.doc
                        : this.state.selectedData.docURL,
                    }}
                  />
                </View>
                <View
                  style={[
                    context.utilities.styles.InputTextBoxStyle,
                    {marginTop: 0},
                  ]}>
                  <TextInput
                    style={
                      this.state.selectedData.name === ''
                        ? context.utilities.styles.InputTextDisableStyle
                        : context.utilities.styles.InputTextEnableStyle
                    }
                    placeholder="Name of Reference"
                    onChangeText={text => {
                      this.updateTextChange(text);
                    }}
                    returnKeyType={'done'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={context.utilities.colors.hintColor}
                    textAlign={'center'}
                    value={this.state.selectedData.name}
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
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AppConsumer>
    );
  }
}
