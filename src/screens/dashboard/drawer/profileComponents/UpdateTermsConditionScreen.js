import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../../context/AppProvider';
import PDFView from 'react-native-view-pdf';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class TermsConditionScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isTermsAccepted: false,
    };
  }

  componentDidMount() {
    this.context.showLoading(true);
    if (this.context.userData && this.context.userData.isTermsAccepted) {
      this.setState({isTermsAccepted: this.context.userData.isTermsAccepted});
    }
  }

  onAgreeClick() {
    if (this.state.isTermsAccepted === false) {
      this.context.showToast('Please accept terms &amp; conditions');
      return;
    }
    this.context.showLoading(true);
    var data = {isTermsAccepted: this.state.isTermsAccepted};
    this.context.apiService.updateFirestoreUserData(
      this.context.currentUser.uid,
      data,
    );
    this.context.updateUserData(user => {
      this.context.showLoading(false);
      this.context.goBack(this);
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
                  Terms &amp; Conditions
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <View style={context.utilities.styles.TNCBackgroundViewStyle}>
                <PDFView
                  style={context.utilities.styles.TNCPDFViewStyle}
                  fadeInDuration={250.0}
                  resource={
                    context.appResources[
                      context.utilities.strings.APP_RESOURCE_TNC
                    ]
                  }
                  resourceType={'url'}
                  onLoad={() => this.onPDFLoad(true)}
                  onError={() => this.onPDFLoad(false)}
                />
              </View>

              <CheckBox
                title="I agree to the Terms &amp; Conditions"
                checkedColor={context.utilities.colors.appColor}
                containerStyle={context.utilities.styles.CheckBoxContainerStyle}
                textStyle={[
                  context.utilities.styles.NewToAppTextStyle,
                  {marginTop: 0},
                ]}
                checked={this.state.isTermsAccepted}
                onPress={() =>
                  this.setState({isTermsAccepted: !this.state.isTermsAccepted})
                }
              />

              <TouchableOpacity
                style={{width: context.screenWidth}}
                onPress={() => this.onAgreeClick()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {margin: 5, marginBottom: 30},
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
