import React, {Component} from 'react';
import {Text, Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider';
import PDFView from 'react-native-view-pdf';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class InfoSharingScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
    };
  }

  componentDidMount() {
    this.context.showLoading(true);
  }

  onAgreeClick() {
    this.context.showLoading(true);
    var data = {
      infoSharing: {
        checked1: this.state.checked1,
        checked2: this.state.checked2,
        checked3: this.state.checked3,
        checked4: this.state.checked4,
      },
    };
    this.context.apiService.updateFirestoreUserData(
      this.context.currentUser.uid,
      data,
    );
    this.context.updateUserData(user => {
      this.context.showLoading(false);
      this.context.replaceScreen(this, this.context.currentScreen);
    });
  }

  onPDFLoad = isLoaded => {
    this.context.showLoading(false);
    if (!isLoaded) {
      this.context.showToast(this.context.utilities.strings.msgErrorLoadingPDF);
    }
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
              {this.state.isDataAvailable && (
                <TouchableOpacity
                  style={{position: 'absolute', marginLeft: 10}}
                  onPress={() => context.goBack(this)}>
                  <Image
                    source={require('../../../images/back.png')}
                    style={{width: 30, height: 30}}
                    tintColor={context.utilities.colors.black}
                  />
                </TouchableOpacity>
              )}
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  Information Sharing
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={context.utilities.styles.baseStyle1}>
                <View style={context.utilities.styles.TNCBackgroundViewStyle}>
                  <PDFView
                    style={context.utilities.styles.TNCPDFViewStyle}
                    fadeInDuration={250.0}
                    resource={
                      context.appResources[
                        context.utilities.strings.APP_RESOURCE_INFO_SHARING
                      ]
                    }
                    resourceType={'url'}
                    onLoad={() => this.onPDFLoad(true)}
                    onError={() => this.onPDFLoad(false)}
                  />
                </View>

                <CheckBox
                  title="Personalised quotes &amp; Illustrations"
                  checkedColor={context.utilities.colors.appColor}
                  containerStyle={
                    context.utilities.styles.CheckBoxLeftContainerStyle
                  }
                  textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                  checked={this.state.checked1}
                  onPress={() =>
                    this.setState({checked1: !this.state.checked1})
                  }
                />
                <CheckBox
                  title="Personalised quotes &amp; Illustrations"
                  checkedColor={context.utilities.colors.appColor}
                  containerStyle={
                    context.utilities.styles.CheckBoxLeftContainerStyle
                  }
                  textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                  checked={this.state.checked2}
                  onPress={() =>
                    this.setState({checked2: !this.state.checked2})
                  }
                />
                <CheckBox
                  title="General quotes &amp; Illustrations"
                  checkedColor={context.utilities.colors.appColor}
                  containerStyle={
                    context.utilities.styles.CheckBoxLeftContainerStyle
                  }
                  textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                  checked={this.state.checked3}
                  onPress={() =>
                    this.setState({checked3: !this.state.checked3})
                  }
                />
                <CheckBox
                  title="General quotes &amp; Illustrations"
                  checkedColor={context.utilities.colors.appColor}
                  containerStyle={
                    context.utilities.styles.CheckBoxLeftContainerStyle
                  }
                  textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                  checked={this.state.checked4}
                  onPress={() =>
                    this.setState({checked4: !this.state.checked4})
                  }
                />

                <TouchableOpacity
                  style={{width: context.screenWidth}}
                  onPress={() => this.onAgreeClick()}>
                  <Text
                    style={[
                      context.utilities.styles.LoginButtonEnableTextStyle,
                      {marginTop: 30, marginBottom: 30},
                    ]}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </AppConsumer>
    );
  }
}
