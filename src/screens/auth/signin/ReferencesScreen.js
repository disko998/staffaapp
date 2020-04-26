import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class ReferencesScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      data: [{id: 1, name: '', doc: '', docURL: ''}],
      selectedData: '',
      selectedIndex: '',
    };
  }

  updateTotalData(image) {
    var data = this.state.selectedData;
    data.doc = image;
    var allData = this.state.data;
    allData[this.state.selectedIndex] = data;
    this.setState({data: allData});
    console.log('updateTotalData array : ' + JSON.stringify(this.state.data));
  }

  onScanClick(data, index) {
    this.setState({selectedData: data});
    this.setState({selectedIndex: index});
    this.context.openCamera(image => {
      this.updateTotalData(image);
    });
  }

  onUploadClick(data, index) {
    this.setState({selectedData: data});
    this.setState({selectedIndex: index});
    this.context.openGallery(image => {
      this.updateTotalData(image);
    });
  }

  updateFirestoreData(allData) {
    this.context.showLoading(true);
    setTimeout(() => {
      var myData = {
        references: {
          data: allData,
        },
      };
      this.context.apiService.updateFirestoreUserData(
        this.context.currentUser.uid,
        myData,
      );
      this.context.showLoading(false);
      this.context.updateUserData(user => {
        this.context.showLoading(false);
        this.context.replaceScreen(this, this.context.currentScreen);
      });
    }, 3000);
  }

  onNextClick() {
    console.log('onNextClick array : ' + JSON.stringify(this.state.data));
    var allData = this.state.data;
    console.log('onNextClick length : ' + allData.length);
    var previousEntry = allData[allData.length - 1];
    if (previousEntry.name === '') {
      this.context.showToast('Please enter name for previous document');
    }
    if (previousEntry.doc === '' && previousEntry.docURL === '') {
      this.context.showToast('Please upload doc for previous document');
      return;
    }
    allData[this.state.data.length - 1] = previousEntry;
    console.log('onAddClick joined : ' + JSON.stringify(allData));
    this.setState({data: allData});

    this.context.showLoading(true);
    var allData = this.state.data;
    allData.map((data, index) => {
      if (data.doc.length > 0) {
        var filePath =
          this.context.currentUser.uid +
          '/' +
          this.context.utilities.strings.FS_FILE_DIR_REFERENCES;
        this.context.apiService.uploadImage(
          filePath,
          data.doc,
          (error, response) => {
            console.log('onNextClick uploadImage response : ' + response);
            console.log('onNextClick uploadImage error : ' + error);
            console.log('onNextClick uploadImage index : ' + index);
            allData[index].docURL = response;
            allData[index].doc = '';
            if (index === allData.length - 1) {
              this.updateFirestoreData(allData);
            }
          },
        );
      } else {
        allData[index].doc = '';
        console.log('onNextClick uploadImage else index : ' + index);
        if (index === allData.length - 1) {
          this.updateFirestoreData(allData);
        }
      }
    });
  }

  onAddClick() {
    console.log('onAddClick array : ' + JSON.stringify(this.state.data));
    var allData = this.state.data;
    console.log('onAddClick length : ' + allData.length);
    var previousEntry = allData[allData.length - 1];
    if (previousEntry.name === '') {
      this.context.showToast('Please enter name for previous document');
      return;
    }
    if (previousEntry.doc === '' && previousEntry.docURL === '') {
      this.context.showToast('Please upload doc for previous document');
      return;
    }
    allData[this.state.data.length - 1] = previousEntry;
    var joined = allData.concat({
      id: this.state.data.length + 1,
      name: '',
      doc: '',
      docURL: '',
    });
    console.log('onAddClick joined : ' + JSON.stringify(joined));
    this.setState({data: joined});
  }

  updateTextChange(index, text) {
    var currentData = this.state.data[index];
    currentData.name = text;
    var allData = this.state.data;
    allData[index] = currentData;
    this.setState({data: allData});
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
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  References
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {marginTop: 10},
                ]}>
                Upload your references
              </Text>
              <ScrollView>
                {this.state.data.map((data, index) => {
                  return (
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <View
                        style={{
                          margin: 10,
                          height: 150,
                          width: 150,
                          borderColor: context.utilities.colors.black,
                          borderWidth: 1,
                          borderRadius: 1,
                        }}>
                        {data.doc !== '' && (
                          <Image
                            style={{width: 148, height: 148}}
                            source={{uri: data.doc}}
                          />
                        )}
                      </View>
                      <View
                        style={[
                          context.utilities.styles.InputTextBoxStyle,
                          {marginTop: 0},
                        ]}>
                        <TextInput
                          style={
                            data.name === ''
                              ? context.utilities.styles.InputTextDisableStyle
                              : context.utilities.styles.InputTextEnableStyle
                          }
                          placeholder="Name of Reference"
                          onChangeText={text => {
                            this.updateTextChange(index, text);
                          }}
                          returnKeyType={'done'}
                          underlineColorAndroid="transparent"
                          placeholderTextColor={
                            context.utilities.colors.hintColor
                          }
                          textAlign={'center'}
                          value={data.name}
                        />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.onScanClick(data, index);
                          }}>
                          <Text
                            style={[
                              context.utilities.styles
                                .LoginButtonEnableTextStyle,
                              {
                                width: 90,
                                marginTop: 5,
                                borderRadius: 10,
                                height: 50,
                              },
                            ]}>
                            Scan
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.onUploadClick(data, index);
                          }}>
                          <Text
                            style={[
                              context.utilities.styles
                                .LoginButtonEnableTextStyle,
                              {
                                width: 90,
                                marginTop: 5,
                                borderRadius: 10,
                                height: 50,
                              },
                            ]}>
                            Upload
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: context.utilities.colors.black,
                          height: 1,
                          marginTop: 5,
                          width: context.screenWidth,
                        }}></View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={{width: context.screenWidth}}
              onPress={() => this.onAddClick()}>
              <Text
                style={[
                  context.utilities.styles.LoginButtonEnableTextStyle,
                  {marginTop: 30},
                ]}>
                ADD REFERENCE
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
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </AppConsumer>
    );
  }
}
