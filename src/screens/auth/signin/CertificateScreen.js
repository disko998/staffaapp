import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class CertificateScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      data: [
        {id: 1, name: 'Moving &amp; Handling', checked: false},
        {id: 2, name: 'Healthy &amp; Safety', checked: false},
        {id: 3, name: 'infection Control', checked: false},
        {id: 4, name: 'Medication Administration', checked: false},
        {id: 5, name: 'Safeguarding of vulnearble adults', checked: false},
        {id: 6, name: 'Life Support', checked: false},
        {id: 7, name: 'First Aid', checked: false},
        {id: 8, name: 'Equality &amp; Diversity', checked: false},
        {id: 9, name: 'Fire Safety', checked: false},
        {id: 10, name: 'Information Governance', checked: false},
        {id: 11, name: 'Preventing Redicalisation', checked: false},
        {id: 12, name: 'Food Hygiene', checked: false},
      ],
    };
  }

  onNextClick() {
    this.context.showLoading(true);
    var data = {
      certificates: {
        data: this.state.data,
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
  onCheck(index) {
    var joined = this.state.data;
    if (joined[index].checked) {
      joined[index].checked = false;
    } else {
      joined[index].checked = true;
    }
    this.setState({data: joined});
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
                  Your Certificates
                </Text>
              </View>
            </View>
            <View style={context.utilities.styles.baseStyle1}>
              <Text
                style={[
                  context.utilities.styles.NewToAppTextStyle,
                  {marginTop: 10, marginLeft: 40, marginRight: 40},
                ]}>
                Please tick to confirm that you have the following up to date
                certifications
              </Text>
              <ScrollView>
                {this.state.data.map((data, index) => {
                  return (
                    <View>
                      <CheckBox
                        title={data.name}
                        checkedColor={context.utilities.colors.appColor}
                        containerStyle={
                          context.utilities.styles.CheckBoxLeftContainerStyle
                        }
                        textStyle={[context.utilities.styles.CheckBoxTextStyle]}
                        checked={data.checked}
                        onPress={() => {
                          this.onCheck(index);
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <Text
              style={[
                context.utilities.styles.NewToAppTextStyle,
                {marginTop: 20, color: context.utilities.colors.red},
              ]}>
              Click on the title to upload of scan your certificate
            </Text>
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
