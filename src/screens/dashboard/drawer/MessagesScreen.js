import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
// import {PagerTitleIndicator, IndicatorViewPager} from 'rn-viewpager';
import ChatsView from './messageComponents/ChatsView';
import ContactsView from './messageComponents/ContactsView';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class MessagesScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      users: [],
    };
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  _renderTitleIndicator(context) {
    // return (
    //   <PagerTitleIndicator
    //     style={context.utilities.styles.TabIndicatorStyle}
    //     trackScroll={true}
    //     itemTextStyle={context.utilities.styles.TabIndicatorTextStyle}
    //     itemStyle={{width: context.screenWidth / 2}}
    //     selectedItemStyle={{width: context.screenWidth / 2}}
    //     selectedItemTextStyle={
    //       context.utilities.styles.TabIndicatorSelectedTextStyle
    //     }
    //     selectedBorderStyle={
    //       context.utilities.styles.TabIndicatorSelectedBorderStyle
    //     }
    //     titles={context.utilities.strings.MESSAGES_TAB}
    //   />
    // );
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
              title="Messages"
              {...platformHeaderProps}
            />
            <ChatsView screen={this} />
          </View>
        )}
      </AppConsumer>
    );
  }
}
