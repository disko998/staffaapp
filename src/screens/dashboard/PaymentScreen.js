import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import Header from '../../utils/header';
import {AppConsumer} from '../../context/AppProvider';
import firebase from 'react-native-firebase';
import Strings from '../../utils/res/Strings';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      item: {},
      bidPrice: '',
    };
  }

  componentWillMount() {
    var item = this.props.navigation.state.params.item;
    this.setState({item});
  }

  componentDidMount() {
    this.context.setCurrentContext(this);
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  render() {
    const platformHeaderProps = {};
    platformHeaderProps['leftItem'] = {
      title: 'Back',
      icon: require('../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress,
    };

    const items = !!this.state.item.times
      ? this.state.item.times.map(t => {
          return {id: t, name: t};
        })
      : [];
    console.log('this.state' + JSON.stringify(this.state.item));

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
              title="Payment"
              {...platformHeaderProps}
            />
            <View
              style={[
                context.utilities.styles.QualificationListRowBGStyle,
                {padding: 10},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../images/back.png')}
                />
                <Text style={{fontSize: 38}}>asdfghjkl</Text>
              </View>

              <Text style={context.utilities.styles.jobStyles}>
                Approved Date : {this.state.item.date}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Agency Name: {this.state.item.agencyName}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Amount: {this.state.item.amount}
              </Text>
              {this.state.item.paidDate && (
                <Text style={context.utilities.styles.jobStyles}>
                  Paid Date: {this.state.item.paidDate}
                </Text>
              )}
              <Text style={context.utilities.styles.jobStyles}>
                Fees: {this.state.item.fees}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Tax: {this.state.item.tax}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Status: {this.state.item.status}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Status: {this.state.item.status}
              </Text>
            </View>
          </View>
        )}
      </AppConsumer>
    );
  }
}
