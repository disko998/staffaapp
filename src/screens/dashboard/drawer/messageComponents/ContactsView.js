import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import Styles from '../../../../utils/res/Styles';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class ContactsView extends Component {
  constructor(args) {
    super(args);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.context.showLoading = true;
    this.ref = this.context.apiService.getUserCollection();
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    var userData = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (this.context.currentUser.uid !== doc.id) {
        data.id = doc.id;
        userData.push(data);
      }
    });
    this.setState({users: userData});
    this.context.showLoading = false;
  };

  onItemClick(item) {
    this.context.setChatReceiver(item);
    this.context.moveToScreenPayload(
      this.props.screen,
      this.context.utilities.strings.APP_SCREEN_CHAT,
      {currentTopic: ''},
    );
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
            {this.state.users.length > 0 && (
              <FlatList
                data={this.state.users}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={context.utilities.styles.ContactsRowStyle}
                    onPress={() => {
                      this.onItemClick(item);
                    }}>
                    {item.bio && item.bio.profilePicURL && (
                      <Image
                        source={{uri: item.bio.profilePicURL}}
                        style={
                          context.utilities.styles.ContactsProfileImageStyle
                        }
                      />
                    )}
                    {item.registerData ? (
                      <Text
                        style={
                          context.utilities.styles.ContactsUserNameTextStyle
                        }>
                        {item.registerData.firstName +
                          ' ' +
                          item.registerData.lastName}
                      </Text>
                    ) : (
                      <Text
                        style={
                          context.utilities.styles.ContactsUserNameTextStyle
                        }>
                        Agency Name
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
            {this.state.users.length === 0 && (
              <View style={context.utilities.styles.CenterDataViewStyle}>
                <Text style={context.utilities.styles.NoDataTextStyle}>
                  {context.utilities.strings.msgNoContactsAvailable}
                </Text>
              </View>
            )}
          </View>
        )}
      </AppConsumer>
    );
  }
}
