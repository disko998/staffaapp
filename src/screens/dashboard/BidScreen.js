import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Header from '../../utils/header';
import {AppConsumer} from '../../context/AppProvider';
import MultiSelect from 'react-native-multiple-select';
import firebase from 'react-native-firebase';
import Strings from '../../utils/res/Strings';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class BidScreen extends Component {
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

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  onSubmitBid = () => {
    if (!!this.context.userData.stripe_account_id) {
      let {item} = this.state;
      let bidUids = !!item.bidUids ? item.bidUids : [];
      let data = {
        uid: this.context.currentUser.uid,
        times: this.state.selectedItems,
        date: item.date,
        price: this.state.bidPrice,
        jobId: item.id,
        name: item.name,
        freelancerName: `${this.context.userData.registerData.firstName} ${
          this.context.userData.registerData.lastName
        }`,
      };
      bidUids.push(this.context.currentUser.uid);
      const jobData = {
        ...item,
        bidUids,
        coordinates: new firebase.firestore.GeoPoint(
          item.coordinates._latitude,
          item.coordinates._longitude,
        ),
      };
      this.context.apiService.addNewBid(data.jobId, data, jobData, () => {});
      this.context.goBack(this);
    } else {
      this.context.replaceScreen(
        this.context.currentContext,
        Strings.APP_SCREEN_SETTINGS,
      );
    }
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
              title="Bid"
              {...platformHeaderProps}
            />
            <View
              style={[
                context.utilities.styles.QualificationListRowBGStyle,
                {padding: 10},
              ]}>
              <Text style={context.utilities.styles.jobStyles}>
                Job Number : {this.state.item.jobNo}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Job Name: {this.state.item.name}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Budget: {this.state.item.cost}
              </Text>
              <Text style={context.utilities.styles.jobStyles}>
                Date: {this.state.item.date}
              </Text>
              {!!this.state.item.bidUids &&
                this.state.item.bidUids.includes(context.currentUser.uid) && (
                  <Text style={context.utilities.styles.appliedStyle}>
                    Applied
                  </Text>
                )}
            </View>
            <View style={context.utilities.styles.InputTextBoxStyle}>
              <TextInput
                style={
                  this.state.bidPrice === ''
                    ? context.utilities.styles.InputTextDisableStyle
                    : context.utilities.styles.InputTextEnableStyle
                }
                placeholder="Bid Price"
                onChangeText={text => {
                  this.setState({bidPrice: text});
                }}
                returnKeyType={'next'}
                underlineColorAndroid="transparent"
                placeholderTextColor={context.utilities.colors.hintColor}
                textAlign={'center'}
                value={this.state.bidPrice}
              />
            </View>
            <View style={{width: '80%', marginLeft: '10%', marginTop: 20}}>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Available Slots"
                searchInputPlaceholderText="Search Slots..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              />
              <View>
                {this.multiSelect &&
                  this.multiSelect.getSelectedItemsExt(
                    this.state.selectedItems,
                  )}
              </View>
            </View>
            {!(
              !!this.state.item.bidUids &&
              this.state.item.bidUids.includes(context.currentUser.uid)
            ) && (
              <TouchableOpacity
                style={{width: context.screenWidth, marginTop: 20}}
                onPress={() => this.onSubmitBid()}>
                <Text
                  style={[
                    context.utilities.styles.LoginButtonEnableTextStyle,
                    {marginTop: 10, marginBottom: 30},
                  ]}>
                  Submit Bid
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </AppConsumer>
    );
  }
}
