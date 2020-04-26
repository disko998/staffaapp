import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
import {ScrollView} from 'react-native-gesture-handler';
import Strings from '../../../utils/res/Strings';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

const PROFILE_OPTIONS = [
  {name: 'Basic Settings', screen: Strings.APP_SCREEN_UPDATE_BASIC_INFO},
  {name: 'Address or Bank ', screen: Strings.APP_SCREEN_UPDATE_ADDRESS},
  {
    name: 'Terms & Condition',
    screen: Strings.APP_SCREEN_UPDATE_TERM_CONDITIONS,
  },
  {
    name: 'Employement Contract',
    screen: Strings.APP_SCREEN_UPDATE_EMPLOYMENT_CONTRACT,
  },
  {name: 'Privacy', screen: Strings.APP_SCREEN_UPDATE_PRIVACY},
  {name: 'Info Sharing', screen: Strings.APP_SCREEN_UPDATE_INFO_SHARING},
  {
    name: 'Notification',
    screen: Strings.APP_SCREEN_UPDATE_NOTIFICATION_SETTINGS,
  },
  {name: 'Verification', screen: Strings.APP_SCREEN_UPDATE_VERIFICATION},
  {name: 'DBS', screen: Strings.APP_SCREEN_UPDATE_DBS},
  {name: 'Qualification', screen: Strings.APP_SCREEN_QUALIFICATION_LIST},
  {name: 'Certificate', screen: Strings.APP_SCREEN_UPDATE_CERTIFICATE},
  {name: 'References', screen: Strings.APP_SCREEN_REFERENCES_LIST},
  {name: 'Skills', screen: Strings.APP_SCREEN_UPDATE_SKILLS},
  {name: 'Bio', screen: Strings.APP_SCREEN_UPDATE_BIO},
];

export default class ProfileScreen extends Component {
  constructor(args) {
    super(args);
  }

  componentDidMount() {
    this.context.setCurrentContext(this);
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  onOptionClick(item) {
    console.log('onOptionClick item : ' + JSON.stringify(item));
    console.log(
      'onOptionClick item qualifications : ' +
        this.context.userData.qualification.data,
    );
    console.log(
      'onOptionClick item qualifications : ' +
        JSON.stringify(this.context.userData.qualification.data),
    );
    this.context.moveToScreen(this, item.screen);
  }

  render() {
    const platformHeaderProps = {};
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress,
    };
    return (
      <AppConsumer>
        {context => (
          <View
            style={context.utilities.styles.root}
            ref={ref => {
              this.context = context;
            }}>
            <StatusBarPaddingIOS />
            <Header
              style={context.utilities.styles.headColor}
              title="Profile"
              {...platformHeaderProps}
            />
            <ScrollView>
              {PROFILE_OPTIONS.map(item => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => this.onOptionClick(item)}>
                    <View>
                      <View
                        style={
                          context.utilities.styles.LeftDrawerOptionsDividerStyle
                        }
                      />
                      <View
                        style={
                          context.utilities.styles.ProfileOptionsViewStyle
                        }>
                        {/* <Icon name={item.icon} size={24} color={context.utilities.colors.black}/> */}
                        <Text
                          style={
                            context.utilities.styles.LeftDrawerOptionsTextStyle
                          }>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
              <View
                style={context.utilities.styles.LeftDrawerOptionsDividerStyle}
              />
            </ScrollView>
          </View>
        )}
      </AppConsumer>
    );
  }
}
