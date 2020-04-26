import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Linking} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class SettingsScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      balance: 0,
    };
  }

  getBalance = () => {
    this.context.getUserData(this.context.currentUser);
    fetch('https://us-central1-staffa-13e8a.cloudfunctions.net/getBalance/', {
      method: 'POST',
      body: JSON.stringify({
        stripe_account_id: this.context.userData.stripe_account_id,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const availableBalance =
          data.result.available.length > 0
            ? data.result.available[0].amount
            : 0;
        const pendingBalance =
          data.result.pending.length > 0 ? data.result.pending[0].amount : 0;
        const balance = availableBalance + pendingBalance;
        this.setState({
          balance: balance / 100,
        });
      })
      .catch(err => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.context.setCurrentContext(this);
    this.getBalance();
    Linking.addEventListener('url', ({url}) => {
      this.getBalance();
    });
  }

  onBackPress = () => {
    this.context.goBack(this);
  };

  onConnectStripe() {
    if (!this.context.userData.stripe_account_id) {
      const redirectLink =
        'https://us-central1-staffa-13e8a.cloudfunctions.net/getStripeToken';
      Linking.openURL(
        `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${redirectLink}
        &client_id=ca_FOKgfEBbAGS0fEUXkciDxCykowJeAB0P&state=${this.context.currentUser.uid}&stripe_user[business_type]=individual`,
      ).catch(err => console.error('An error occurred', err));
    }
  }

  showStripeAccount = account => {
    fetch(
      'https://us-central1-staffa-13e8a.cloudfunctions.net/getDashboardLink/',
      {
        method: 'POST',
        body: JSON.stringify({
          stripe_account_id: this.context.userData.stripe_account_id,
          account,
        }),
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        Linking.openURL(data.url).catch(err =>
          console.error('An error occurred', err),
        );
      })
      .catch(err => {
        console.log(error);
      });
  };

  onPayout = () => {
    fetch('https://us-central1-staffa-13e8a.cloudfunctions.net/createPayout/', {
      method: 'POST',
      body: JSON.stringify({
        stripe_account_id: this.context.userData.stripe_account_id,
        amount: this.state.balance * 100,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        alert('Your payout was successful');
        this.setState({balance: 0});
      })
      .catch(err => {
        console.log(error);
      });
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
              title="Settings"
              {...platformHeaderProps}
            />

            {!!context.userData.stripe_account_id ? (
              <>
                <Text style={context.utilities.styles.NewToAppTextStyle}>
                  Dashboard
                </Text>
                <View
                  style={[
                    context.utilities.styles.QualificationListRowBGStyle,
                    {padding: 10},
                  ]}>
                  <Text style={context.utilities.styles.jobStyles}>
                    Name: {context.userData.registerData.firstName}
                  </Text>
                  <Text
                    style={
                      context.utilities.styles.jobStyles
                    }>{`Your Balance: £ ${this.state.balance}`}</Text>
                </View>
                <TouchableOpacity onPress={() => this.showStripeAccount(true)}>
                  <Text
                    style={context.utilities.styles.LoginButtonEnableTextStyle}>
                    View Stripe Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showStripeAccount(false)}>
                  <Text
                    style={context.utilities.styles.LoginButtonEnableTextStyle}>
                    View Payouts in Stripe
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={context.utilities.styles.NewToAppTextStyle}>
                  Stripe account to be paid into
                </Text>
                <TouchableOpacity onPress={() => this.onConnectStripe()}>
                  <Text
                    style={context.utilities.styles.LoginButtonEnableTextStyle}>
                    Connect with Stripe
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {this.state.balance > 0 && (
              <TouchableOpacity onPress={() => this.onPayout()}>
                <Text
                  style={context.utilities.styles.LoginButtonEnableTextStyle}>
                  Pay Out Now
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </AppConsumer>
    );
  }
}
