import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider';
import PDFView from 'react-native-view-pdf';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class EmploymentContractScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isEmploymentAccepted: false,
    };
  }

  componentDidMount() {
    this.context.showLoading(true);
  }

  onAgreeClick() {
    if (this.state.isEmploymentAccepted === false) {
      this.context.showToast('Please accept Employment Contract');
      return;
    }
    this.context.showLoading(true);
    var data = {isEmploymentAccepted: this.state.isEmploymentAccepted};
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
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={context.utilities.styles.headerLogoTextStyle}>
                  {context.utilities.strings.appName}
                </Text>
                <Text style={context.utilities.styles.headerInfoTextStyle}>
                  Employment Contract
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
                      context.utilities.strings.APP_RESOURCE_EMPLOYMENT_CONTRACT
                    ]
                  }
                  resourceType={'url'}
                  onLoad={() => this.onPDFLoad(true)}
                  onError={() => this.onPDFLoad(false)}
                />
              </View>

              <CheckBox
                title="I agree with the Employment Contract"
                checkedColor={context.utilities.colors.appColor}
                containerStyle={context.utilities.styles.CheckBoxContainerStyle}
                textStyle={[
                  context.utilities.styles.NewToAppTextStyle,
                  {marginTop: 0},
                ]}
                checked={this.state.isEmploymentAccepted}
                onPress={() =>
                  this.setState({
                    isEmploymentAccepted: !this.state.isEmploymentAccepted,
                  })
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
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
