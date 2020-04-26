import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {AppConsumer} from '../../../../context/AppProvider';
import DialogInput from 'react-native-dialog-input';
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding';

export default class ChatScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      currentTopic: '',
      isDialogVisible: false,
      userID: '',
      receiverID: '',
      message: '',
      topicDialogDesc: 'Define topic to start conversation',
    };
  }

  componentDidMount() {
    this.setState({userID: this.context.currentUser.uid});
    this.setState({receiverID: this.context.currentChatReceiver.id});
    this.setState(
      {currentTopic: this.props.navigation.state.params.currentTopic},
      () => {
        console.log(
          'componentDidMount currentTopic : ' + this.state.currentTopic,
        );
        if (this.state.currentTopic.length === 0) {
          this.setState({isDialogVisible: true});
        } else {
          this.listenForNewMessage();
        }
      },
    );
  }

  listenForNewMessage() {
    var chatUID = this.context.apiService.getChatUID(
      this.state.receiverID,
      this.state.userID,
      this.state.currentTopic,
    );
    this.setState({chatUID: chatUID});
    console.log('listenForNewMessage chatUID : ' + chatUID);
    var screen = this;
    // Listen for messages
    this.userConversationNode = this.context.apiService.getUserConversationNode(
      this.state.userID,
      chatUID,
    );
    this.receiverConversationNode = this.context.apiService.getUserConversationNode(
      this.state.receiverID,
      chatUID,
    );
    this.messagesCollection = this.context.apiService.getConversationMessagesNode(
      chatUID,
    );
    this.messageListener = this.messagesCollection
      .orderBy('time', 'desc')
      .onSnapshot(function(querySnapshot) {
        var messages = [];
        querySnapshot.docs.map(doc => {
          console.log(
            'listenForNewMessage message : ' + JSON.stringify(doc.data()),
          );
          messages.push(doc.data());
        });
        screen.setState({messages: messages});
      });
  }

  onTopicSubmit(topicName) {
    if (topicName === '') {
      this.setState({topicDialogDesc: 'Please enter topic name'});
      return;
    }
    this.context.showLoading(true);
    var chatUID = this.context.apiService.getChatUID(
      this.state.receiverID,
      this.state.userID,
      topicName,
    );
    this.context.apiService.isTopicExist(chatUID, exists => {
      this.setState({isDialogVisible: false});
      if (exists) {
        this.context.showLoading(false);
        this.context.showToast('Topic is already exists');
        this.setState({topicDialogDesc: 'Topic is already exists'});
        this.setState({isDialogVisible: true});
      } else {
        this.setState({chatUID: chatUID});
        this.setState({isDialogVisible: false});
        this.context.apiService.addNewTopicNode(topicName, chatUID);
        this.context.apiService.setNewConversation(
          this.state.userID,
          this.state.receiverID,
          chatUID,
          topicName,
        );
        this.setState({currentTopic: topicName});
        this.listenForNewMessage();
        this.context.showLoading(false);
      }
    });
  }

  componentWillUnmount() {
    this.context.setChatReceiver(null);
    this.messageListener();
  }

  sendMessage() {
    if (this.state.message.length > 0) {
      var message = this.messagesCollection.doc();
      var data = {
        message: this.state.message,
        sender: this.state.userID,
        receiver: this.state.receiverID,
        time: new Date().toString(),
      };
      message.set(data);
      // Update last message id - sender
      this.userConversationNode.update({lastMessageID: message.id});
      // Update last message id - receiver
      this.receiverConversationNode.update({lastMessageID: message.id});
      this.setState({message: ''});
    }
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
            {context.currentChatReceiver && (
              <View style={{flex: 1}}>
                <View style={context.utilities.styles.ChatHeaderViewStyle}>
                  <TouchableOpacity onPress={() => context.goBack(this)}>
                    <Image
                      source={require('../../../../images/back.png')}
                      style={{width: 30, height: 30, marginLeft: 7}}
                      tintColor={context.utilities.colors.white}
                    />
                  </TouchableOpacity>
                  <View
                    style={[
                      context.utilities.styles.ContactsProfileImageStyle,
                      {
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={[
                        context.utilities.styles.ChatsViewTopicNameTextStyle,
                        {fontSize: 14, color: 'white', marginRight: 0},
                      ]}>
                      {context.currentChatReceiver.firstName.charAt(0) +
                        '' +
                        context.currentChatReceiver.lastName.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    style={context.utilities.styles.ChatReceiverNameTextStyle}>
                    {context.currentChatReceiver.firstName +
                      ' ' +
                      context.currentChatReceiver.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      color: context.utilities.colors.white,
                      marginRight: 10,
                    }}>
                    {this.state.currentTopic}
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  {this.state.messages && (
                    <FlatList
                      style={{padding: 10, flex: 1}}
                      data={this.state.messages}
                      inverted={true}
                      renderItem={({item}) => (
                        <View
                          style={
                            item.sender === this.state.userID
                              ? context.utilities.styles.ChatViewSenderStyle
                              : context.utilities.styles.ChatViewReceiverStyle
                          }>
                          <Text
                            style={
                              context.utilities.styles.ChatViewMessageStyle
                            }>
                            {item.message}
                          </Text>
                          <Text
                            style={context.utilities.styles.ChatViewDateStyle}>
                            {context.apiService.getFormattedTime(
                              item.time,
                              context.utilities.strings.DISPLAY_TIME_FORMAT_1,
                            )}
                          </Text>
                        </View>
                      )}
                    />
                  )}
                </View>

                {/* Bottom Bar */}
                <View
                  style={{
                    height: 45,
                    margin: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 45,
                      width: '100%',
                      marginRight: 5,
                      borderRadius: 10,
                      backgroundColor: context.utilities.colors.lightGray,
                    }}>
                    <TextInput
                      style={
                        this.state.message === ''
                          ? context.utilities.styles.InputTextDisableStyle
                          : context.utilities.styles.InputTextEnableLeftStyle
                      }
                      onChangeText={text => {
                        this.setState({message: text});
                      }}
                      returnKeyType={'done'}
                      placeholder="Type message here"
                      underlineColorAndroid="transparent"
                      placeholderTextColor={context.utilities.colors.mediumGray}
                      value={this.state.message}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.sendMessage();
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: context.utilities.colors.headerBGColor,
                      padding: 10,
                      borderRadius: 100,
                      marginLeft: 10,
                    }}>
                    <Image
                      source={require('../../../../images/send_message.png')}
                      style={{width: 18, height: 18}}
                      tintColor={context.utilities.colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title={'Conversation Topic'}
              message={this.state.topicDialogDesc}
              hintInput={'Enter Topic Name'}
              submitInput={inputText => {
                this.onTopicSubmit(inputText);
              }}
              cancelText={''}
              closeDialog={() => {}}></DialogInput>
          </View>
        )}
      </AppConsumer>
    );
  }
}
