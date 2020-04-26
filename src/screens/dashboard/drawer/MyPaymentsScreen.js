import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
import Strings from '../../../utils/res/Strings';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class MyPaymentsScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      paymentsData: [],
    };
  }

  componentDidMount() {
    this.context.setCurrentContext(this);
    this.context.apiService.getPayments(
      this.context.currentUser.uid,
      (err, res) => {
        this.setState({paymentsData: res});
      },
    );
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  showPayment = item => () => {
    this.context.moveToScreenPayload(this, Strings.APP_SCREEN_PAYMENT, {item});
  };

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
              title="My Payments"
              {...platformHeaderProps}
            />
            <View style={context.utilities.styles.baseStyle1}>
              <FlatList
                extraData={this.state.paymentsData}
                data={this.state.paymentsData}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={this.showPayment(item)}>
                    <View
                      style={[
                        context.utilities.styles.QualificationListRowBGStyle,
                        {padding: 10},
                      ]}>
                      <Text style={context.utilities.styles.jobStyles}>
                        Approved Date : {item.date}
                      </Text>
                      <Text style={context.utilities.styles.jobStyles}>
                        Agency Name: {item.agencyName}
                      </Text>
                      <Text style={context.utilities.styles.jobStyles}>
                        Amount: {item.amount}
                      </Text>
                      {item.paidDate && (
                        <Text style={context.utilities.styles.jobStyles}>
                          Paid Date: {item.paidDate}
                        </Text>
                      )}
                      <Text style={context.utilities.styles.jobStyles}>
                        Status: {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
