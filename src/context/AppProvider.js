import React from 'react';
import {Dimensions} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-easy-toast';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import NetInfo from '@react-native-community/netinfo';

import ApiService from '../network/ApiService';
import ProgressView from '../customViews/ProgressView';
import CustomDialogImagePicker from '../customViews/dialog/CustomDialogImagePicker';
import LeftDrawer from '../customViews/LeftDrawer.js';
import CustomDialog from '../customViews/dialog/CustomDialog.js';

import Colors from '../utils/res/Colors';
import Styles from '../utils/res/Styles';
import Strings from '../utils/res/Strings';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    let {height} = Dimensions.get('window');
    apiService = new ApiService();

    this.state = {
      screenWidth: width,
      screenHeight: height,
      showPickerDialog: false,
      showDialog: false,
      showLoading: false,
      userData: null,
      user: null,
      currentScreen: Strings.APP_SCREEN_LOGIN,
      currentContext: null,
      currentChatReceiver: null,
      FCMToken: null,

      // Notifications of user
      userNotificationCount: 0,
      userNotifications: [],
      shiftsData: [],

      openFromNotification: false,
      notificationData: null,

      isInternetAvailable: true,

      // App Resources
      appResources: null,

      okText: '',
      cancelText: '',
      dialogMsg: '',
    };
    // this.checkUserAuthentication((user) => {});
  }

  componentDidMount() {
    // this.listenTokenRefresh();
    // this.listenNotificationOpen();
    this.listenConnectionAvailability();
  }

  componentWillUnmount() {
    this.fireBaseListener && this.fireBaseListener();
    // this.notificationListener();
    // this.onTokenRefreshListener();
    // this.notificationAppAlreadyOpen();
    // this.notificationOpenApp();
    // this.userNotificationListener();
  }
  /*
    Check if user is authenticated or not.
    If yes, then retrieve user data from FireStore
    If no, then jump to Login screen
  */
  checkUserAuthentication = callBack => {
    this.getAppResources();
    this.callBack = callBack;
    this.fireBaseListener = auth().onAuthStateChanged(user => {
      console.log('checkIsUserAuthenticated USER : ' + JSON.stringify(user));
      if (user) {
        this.setCurrentUser(user);
        if (user.emailVerified) {
          this.getUserData(user);
        } else {
          this.setCurrentScreen(Strings.APP_SCREEN_LOGIN);
          if (this.callBack) {
            this.callBack(user);
          }
        }
        // this.getFCMToken();
        // this.listenNotifications();
        // this.getUserNotifications(user.uid);
      } else {
        this.setCurrentScreen(Strings.APP_SCREEN_LOGIN);
        if (this.callBack) {
          this.callBack(null);
        }
      }
    });
  };

  getAppResources() {
    apiService.getAppResources((error, response) => {
      if (!error) {
        this.setState({appResources: response});
        console.log(
          'getAppResources appResources : ' + JSON.stringify(response),
        );
      }
    });
  }

  getFCMToken() {
    console.log('getFCMToken called');
    if (this.state.FCMToken) {
      var data = {FCMToken: this.state.FCMToken};
      apiService.updateFirestoreUserData(this.state.user.uid, data);
    } else {
      var FCM = messaging();
      FCM.requestPermission();
      FCM.getToken().then(token => {
        var data = {FCMToken: token};
        apiService.updateFirestoreUserData(this.state.user.uid, data);
      });
    }
  }

  listenConnectionAvailability() {
    this.netInfoListener = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.setState({isInternetAvailable: state.isConnected});
      setTimeout(() => {
        if (this.state.isInternetAvailable === false) {
          this.showToast('Internet not available');
        }
      }, 1500);
    });
  }

  handleFirstConnectivityChange = connectionInfo => {
    console.log(
      'handleFirstConnectivityChange' +
        connectionInfo.type +
        ', effectiveType: ' +
        connectionInfo.effectiveType,
    );
  };

  performNotificationAction = screen => {
    console.log('performNotificationAction');
    if (this.state.notificationData) {
      var data = this.state.notificationData;
      console.log('performNotificationAction 1');
      switch (data.type) {
        case 'ChatMessage':
          console.log('performNotificationAction ChatMessage');
          this.replaceScreen(screen, Strings.APP_SCREEN_MESSAGES);
          break;
      }
    }
  };

  listenNotificationOpen() {
    // When app is in foreground or in background
    this.notificationAppAlreadyOpen = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        if (notificationOpen) {
          console.log(
            'notificationAppAlreadyOpen : ' +
              notificationOpen.notification.data,
          );
          console.log(
            'notificationAppAlreadyOpen : ' +
              JSON.stringify(notificationOpen.notification.data),
          );
          var data = notificationOpen.notification.data;
          if (data.type) {
            this.setState({openFromNotification: true});
            this.setState({notificationData: data});
            this.performNotificationAction(this.state.currentContext);
          }
        }
      });

    // When app is closed and notification tap opens app
    this.notificationOpenApp = firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          console.log(
            'notificationOpenApp notificationOpen -->',
            notificationOpen,
          );
          console.log(
            'notificationOpenApp : ' + notificationOpen.notification.data,
          );
          console.log(
            'notificationOpenApp : ' +
              JSON.stringify(notificationOpen.notification.data),
          );
          var data = notificationOpen.notification.data;
          if (data.type) {
            this.setState({openFromNotification: true});
            this.setState({notificationData: data});
          }
        }
      });
  }

  listenTokenRefresh() {
    this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
      console.log('onTokenRefreshListener token : ' + fcmToken);
      if (this.state.user) {
        var data = {FCMToken: fcmToken};
        apiService.updateFirestoreUserData(this.state.currentUser.uid, data);
      } else {
        this.setState({FCMToken: fcmToken});
      }
    });
  }

  listenNotifications() {
    apiService.subscribeToNotificationListeners();
    // Display notification when app is in foreground or background
    this.notificationListener = notifications().onNotification(notification => {
      console.log('onNotification notification-->', notification);
      apiService.displayNotification(notification);
    });
  }

  clearAllData = () => {
    this.setState({userData: null});
    this.setState({user: null});
    //this.setState({currentContext: null});
    this.setState({currentScreen: Strings.APP_SCREEN_LOGIN});
  };

  getUserNotifications(userID) {
    var notificationNode = apiService.getUserNotificationNode(userID);
    this.userNotificationListener = notificationNode
      .orderBy('time', 'desc')
      .onSnapshot(querySnapshot => {
        var notifications = [];
        querySnapshot.forEach(doc => {
          var data = doc.data();
          if (data.read === 0) {
            data.id = doc.id;
            notifications.push(data);
          }
        });
        this.setState({userNotificationCount: notifications.length});
        this.setState({userNotifications: notifications});
      });
  }

  /*
    Get logged-in user's data from FireStore and
    set current screen as per data entered by user
  */
  getUserData = user => {
    console.log('getUserData 1 : ' + user.uid);
    apiService.getUserData(user.uid, (error, response) => {
      if (response) {
        this.setCurrentScreen(apiService.getScreenName(response));
        this.setUserData(response);
        console.log('getUserData 2 : ' + JSON.stringify(response));
        if (this.callBack) {
          this.callBack(user, response);
        }
      }
    });
  };

  /*
   Update current user's data
 */
  updateUserData = callBack => {
    this.callBack = callBack;
    console.log('updateUserData : ' + this.state.user.uid);
    setTimeout(() => {
      this.getUserData(this.state.user);
    }, 500);
  };

  /*
    Set current screen to jump to
  */
  setCurrentScreen = screen => {
    this.setState({currentScreen: screen});
  };

  /*
    Set user's data to be accessible to all components
  */
  setUserData = userData => {
    this.setState({userData: userData});
  };
  /*
    Set current user to be accessible to all components
  */
  setCurrentUser = user => {
    this.setState({user: user});
  };

  /*
    Method will be called to replace current screen with another
    @context - Context of the component calling method
    @screen - Screen name to replace with
  */
  replaceScreen = (context, screen) => {
    console.log('context: ' + context);
    console.log(' screen: ' + screen);
    context.props.navigation.replace(screen);
  };

  replaceScreenPayload = (context, screen, data) => {
    context.props.navigation.replace(screen, data);
  };

  /*
    Method will be called to jump to other screen
    @context - Context of the component calling method
    @screen - Screen name to jump to
  */
  moveToScreen = (context, screen) => {
    context.props.navigation.navigate(screen);
  };

  /*
    Method will be called to jump to other screen
    @context - Context of the component calling method
    @screen - Screen name to jump to
  */
  moveToScreenPayload = (context, screen, data) => {
    context.props.navigation.navigate(screen, data);
  };

  goBack = context => {
    context.props.navigation.goBack();
  };
  /*
    Display a toast message with given message string
    @message - Message to display in a toast
  */
  showToast = message => {
    this.refs.toast.show(message);
  };
  /*
    This method will show progress dialog on screen
    @value - True/False to show/hide progress
  */
  showLoading = value => {
    this.setState({showLoading: value});
  };

  setChatReceiver = user => {
    this.setState({currentChatReceiver: user});
  };

  /*
    This method will show date picker dialog on screen to select a date
    @currentSelectedDate - Previously selected date or blank
    @callBack - callBack method which will be called once user selects a date from dialog
  */
  showDatePicker = (currentSelectedDate, callBack) => {
    this.datePickerCallBack = callBack;
    let dobDate = currentSelectedDate;
    if (!dobDate || dobDate == null) {
      dobDate = new Date();
    }
    this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date(),
    });
  };

  onDatePicked = date => {
    console.log('onDatePicked :' + date);
    if (this.datePickerCallBack) {
      this.datePickerCallBack(date);
    }
  };

  showImagePickerAlert = callBack => {
    this.imagePickerCallBack = callBack;
    this.setState({showPickerDialog: true});
  };

  onOptionSelected(option) {
    this.hidePickerAlert();
    if (option == 0) {
      this.openCamera(this.imagePickerCallBack);
    } else {
      this.openGallery(this.imagePickerCallBack);
    }
  }
  openCamera = callBack => {
    this.imagePickerCallBack = callBack;
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      console.log(image);
      console.log('Image.path : ' + image.path);
      if (this.imagePickerCallBack) {
        this.imagePickerCallBack(image.path);
      }
    });
  };

  openGallery = callBack => {
    this.imagePickerCallBack = callBack;
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      console.log('Image : ' + image);
      console.log('Image.path : ' + image.path);
      if (this.imagePickerCallBack) {
        this.imagePickerCallBack(image.path);
      }
    });
  };
  hidePickerAlert() {
    this.setState({showPickerDialog: false});
  }

  toggleDrawer = () => {
    if (this.state.isDrawerOpen) {
      this.setState({isDrawerOpen: false});
    } else {
      this.setState({isDrawerOpen: true});
    }
  };

  setCurrentContext = context => {
    this.setState({currentContext: context});
  };

  showDialog = (okText, cancelText, message, callBack) => {
    this.dialogCallBack = callBack;
    this.setState({okText: okText});
    this.setState({cancelText: cancelText});
    this.setState({dialogMsg: message});
    this.setState({showDialog: true});
  };

  onDialogOkClick = () => {
    this.toggleDrawer();
    this.setState({showDialog: false});
    if (this.dialogCallBack) {
      this.dialogCallBack(false, true);
    }
  };

  onDialogSkipClick = () => {
    this.setState({showDialog: false});
    if (this.dialogCallBack) {
      this.dialogCallBack(true, false);
    }
  };

  render() {
    return (
      // Values/Data mostly used by all child components
      <AppContext.Provider
        value={{
          currentContext: this.state.currentContext,
          screenWidth: this.state.screenWidth,
          screenHeight: this.state.screenHeight,
          apiService: apiService,
          utilities: {colors: Colors, styles: Styles, strings: Strings},
          checkUserAuthentication: this.checkUserAuthentication,
          setCurrentScreen: this.setCurrentScreen,
          setUserData: this.setUserData,
          getUserData: this.getUserData,
          updateUserData: this.updateUserData,
          currentUser: this.state.user,
          userData: this.state.userData,
          appResources: this.state.appResources,
          currentScreen: this.state.currentScreen,
          replaceScreen: this.replaceScreen,
          replaceScreenPayload: this.replaceScreenPayload,
          moveToScreen: this.moveToScreen,
          moveToScreenPayload: this.moveToScreenPayload,
          goBack: this.goBack,
          setCurrentContext: this.setCurrentContext,
          showToast: this.showToast,
          showLoading: this.showLoading,
          showDatePicker: this.showDatePicker,
          showImagePickerAlert: this.showImagePickerAlert,
          toggleDrawer: this.toggleDrawer,
          showDialog: this.showDialog,
          clearAllData: this.clearAllData,
          currentChatReceiver: this.state.currentChatReceiver,
          setChatReceiver: this.setChatReceiver,
          openCamera: this.openCamera,
          openGallery: this.openGallery,
          openFromNotification: this.state.openFromNotification,
          performNotificationAction: this.performNotificationAction,

          // User Notifications
          userNotificationCount: this.state.userNotificationCount,
          userNotifications: this.state.userNotifications,
          shiftsData: this.state.shiftsData,
        }}>
        {this.props.children}

        {/*
          Other views mostly used by all child components
        */}
        {this.state.isDrawerOpen && (
          <LeftDrawer onDrawerClose={this.closeDrawer} screen={this} />
        )}
        <Toast ref={'toast'} />
        {this.state.showLoading && <ProgressView />}
        <DatePickerDialog
          ref="dobDialog"
          onDatePicked={this.onDatePicked.bind(this)}
        />
        {
          <CustomDialog
            okText={this.state.okText}
            cancelText={this.state.cancelText}
            message={this.state.dialogMsg}
            onOkPress={() => {
              this.onDialogOkClick();
            }}
            onCancelPress={() => {
              this.onDialogSkipClick();
            }}
            visibility={this.state.showDialog}
          />
        }
        {
          <CustomDialogImagePicker
            onChooseOption={option => {
              this.onOptionSelected(option);
            }}
            onCancelPress={() => {
              this.hidePickerAlert();
            }}
            visibility={this.state.showPickerDialog}
          />
        }
      </AppContext.Provider>
    );
  }
}
