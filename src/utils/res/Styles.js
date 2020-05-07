'use strict';
import {StyleSheet, Dimensions} from 'react-native';
import Colors from './Colors';
import Strings from './Strings';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
const marginBetweenElements = 13;

module.exports = StyleSheet.create({
  /*
  New styles for each UI Component
  */
  darkTitle: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',
  },
  grayText: {
    fontSize: 17,
  },
  mainText: {
    fontSize: 18,
    color: Colors.main,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  messageWrapper: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    overflow: 'hidden',
  },
  messageContentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  messageTitle: {
    fontSize: 18,
    color: Colors.main,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  messageContent: {
    color: Colors.inactive,
  },
  messageDate: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: Colors.inactive,
  },

  notificationLink: {
    color: Colors.inactive,
    textDecorationLine: 'underline',
    marginLeft: 10,
    fontSize: 18,
  },
  notificationTitle: {
    fontSize: 18,
    color: Colors.main,
    textAlign: 'left',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold',
    overflow: 'hidden',
    height: 30,
  },

  profileBanner: {
    backgroundColor: Colors.secondary,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileBannerName: {color: Colors.white, fontWeight: 'bold', fontSize: 20},
  profileBannerTitle: {color: Colors.white, fontSize: 18},

  editProfileButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  editButtonText: {color: Colors.white, marginLeft: 5},

  avatarStyle: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  avatarMessageStyle: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.white,
    width: 55,
    height: 55,
    marginRight: 15,
  },
  avatarWrapper: {padding: 2, borderRadius: 50},

  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: Colors.main,
  },
  headerTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 25,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

  center: {width: '100%', justifyContent: 'center', alignItems: 'center'},

  ratingText: {
    color: Colors.white,
    marginLeft: 10,
  },

  label: {
    color: Colors.inactive,
    fontSize: 18,
    marginRight: 15,
  },
  darkText: {
    fontSize: 18,
    color: Colors.black,
  },
  itemText: {
    fontSize: 18,
    color: Colors.main,
    flex: 1,
  },

  vm: {
    marginVertical: marginBetweenElements,
  },

  settingsLink: {
    color: Colors.inactive,
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },

  searchJobsInputWrapper: {
    backgroundColor: Colors.transparentMain(0.7),
    padding: 5,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  },
  searchJobsInputStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    color: Colors.white,
    marginLeft: 15,
  },

  applyJobCardStyle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: Colors.transparentMain(0.6),
    elevation: 5,
    overflow: 'hidden',
  },
  infoContainer: {
    padding: 15,
    flex: 1,
    backgroundColor: Colors.transparentMain(0.6),
  },

  whiteTitleText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  whiteText: {
    fontSize: 16,
    color: Colors.white,
    marginVertical: 3,
  },

  mainButton: {
    backgroundColor: Colors.main,
    color: Colors.white,
    fontWeight: 'bold',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: Colors.appBGColor,
    overflow: 'hidden',
  },
  ForgotPasswordText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    color: Colors.white,
    marginVertical: marginBetweenElements,
  },

  ForgotPasswordLinkText: {
    fontSize: 15,
    color: Colors.white,
  },

  headColor: {
    backgroundColor: Colors.black,
  },

  formTitle: {
    color: Colors.white,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: marginBetweenElements,
  },

  splashLogoTextStyle: {
    fontSize: 30,
    fontFamily: Strings.FONT_QMA,
    color: Colors.white,
  },

  headerLogoTextStyle: {
    fontSize: 40,
    fontWeight: '600',
    fontFamily: Strings.FONT_QMA,
    color: Colors.white,
    marginVertical: marginBetweenElements,
    textAlign: 'center',
  },

  headerInfoTextStyle: {
    fontSize: 18,
    marginTop: 15,
    fontStyle: 'normal',
    color: Colors.white,
    marginVertical: marginBetweenElements,
    textAlign: 'left',
  },

  baseStyle1: {
    flex: 1,
    padding: 15,
  },

  inputLabel: {
    color: Colors.white,
    marginBottom: 10,
  },

  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginVertical: marginBetweenElements,
    marginLeft: 0,
    padding: 0,
  },

  checkboxlabel: {
    color: Colors.white,
  },

  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: marginBetweenElements,
  },

  InputTextBoxStyle: {
    borderColor: Colors.white,
    borderRadius: 5,
    borderWidth: 0.5,
    height: 50,
    width: '100%',
    backgroundColor: Colors.white,
    padding: 5,
  },
  defaultButton: {
    backgroundColor: Colors.main,
    height: 50,
    marginVertical: marginBetweenElements,
  },

  typeButton: {
    height: 50,
    marginVertical: marginBetweenElements,
    borderColor: Colors.white,
    borderWidth: 1.5,
  },

  logoStyle: {
    height: 100,
    width: 100,
    overflow: 'hidden',
  },

  // *****************
  /*
   OLD styles UI Components
  */
  // *****************

  InputTextDisableStyle: {
    flex: 1,
    fontSize: 15,
    color: Colors.hintColor,
    marginRight: 10,
  },

  InputTextEnableStyle: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.black,
    marginRight: 10,
  },

  InputTextEnableLeftStyle: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    marginRight: 10,
  },

  NewToAppTextStyle: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.mediumGray,
    marginTop: 50,
  },

  RegisterLinkTextStyle: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.appColor,
  },

  LoginButtonEnableTextStyle: {
    fontWeight: 'bold',
    color: Colors.white,
    borderRadius: 50,
    backgroundColor: Colors.appColor,
    marginLeft: 50,
    marginRight: 50,
    padding: 15,
    marginTop: 20,
    textAlign: 'center',
  },

  MarkReadTextStyle: {
    padding: 5,
    fontSize: 9,
    color: Colors.mediumGray,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  QualificationScanButtonStyle: {
    fontWeight: 'bold',
    color: Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.appColor,
    marginLeft: 5,
    marginRight: 5,
    padding: 12,
    textAlign: 'center',
    width: 90,
    marginTop: 5,
  },

  LoginButtonBackgroundStyle: {
    width: windowWidth,
    height: 50,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TNCBackgroundViewStyle: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: windowWidth - 50,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: 30,
    padding: 1,
  },

  TNCPDFViewStyle: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: windowWidth - 53,
    height: 347,
  },

  TNCFixBackgroundViewStyle: {
    borderColor: Colors.black,
    borderWidth: 1,
    height: 200,
    backgroundColor: Colors.white,
    margin: 30,
    padding: 10,
  },

  TNCTextStyle: {
    fontSize: 11,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.mediumGray,
  },

  CheckBoxContainerStyle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    borderRadius: 0,
    marginLeft: 40,
    marginTop: 10,
    marginRight: 40,
  },

  CheckBoxLeftContainerStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    width: windowWidth - 80,
    marginLeft: 40,
    marginRight: 40,
  },

  CheckBoxTextStyle: {
    fontSize: 12,
    color: Colors.mediumGray,
  },

  LeftDrawerRootViewStyle: {
    height: windowHeight,
    width: 280,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FFBC40',
  },

  LeftDrawerImageStyle: {
    height: 100,
    width: 100,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },

  LeftDrawerUserNameTextStyle: {
    fontSize: 13,
    marginTop: 2,
    color: Colors.black,
  },

  LeftDrawerCloseImageStyle: {
    height: 20,
    width: 20,
    position: 'absolute',
    left: 20,
    top: 15,
  },

  LeftDrawerModelViewStyle: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    backgroundColor: Colors.alertTransparentColor,
  },

  LeftDrawerOptionsDividerStyle: {
    height: 1,
    backgroundColor: Colors.lightGray,
  },

  LeftDrawerOptionsViewStyle: {
    width: 280,
    backgroundColor: '#FFBC40',
    padding: 15,
    flexDirection: 'row',
  },

  ProfileOptionsViewStyle: {
    width: windowWidth,
    backgroundColor: 'orange',
    padding: 15,
    flexDirection: 'row',
  },

  LeftDrawerBadgeStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 23,
    height: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
    marginRight: 5,
    backgroundColor: Colors.headerBGColor,
    borderRadius: 100,
  },

  LeftDrawerOptionsTextStyle: {
    fontSize: 16,
    flex: 1,

    color: Colors.black,
    marginLeft: 10,
    marginRight: 10,
  },

  LeftDrawerOptionsIconStyle: {
    width: 30,
    height: 30,
  },

  TabIndicatorViewPagerStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
  },

  TabIndicatorStyle: {
    backgroundColor: Colors.lightGray,
    height: 48,
  },

  TabIndicatorTextStyle: {
    fontSize: 14,
    color: Colors.headerBGColor,
  },

  TabIndicatorSelectedTextStyle: {
    fontSize: 14,
    color: Colors.headerBGColor,
    fontWeight: 'bold',
  },

  TabIndicatorSelectedBorderStyle: {
    height: 3,
    backgroundColor: Colors.headerBGColor,
  },

  ContactsRowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },

  ContactsProfileImageStyle: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderColor: Colors.black,
    borderWidth: 0.5,
  },

  ContactsUserNameTextStyle: {
    color: Colors.black,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },

  ChatsViewTopicNameTextStyle: {
    color: Colors.mediumGray,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },

  ChatsViewLastMessageTextStyle: {
    flex: 1,
    color: Colors.mediumGray,
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },

  ChatsViewLastMessageDateStyle: {
    color: Colors.mediumGray,
    fontSize: 12,
    marginRight: 10,
  },

  ChatViewReceiverStyle: {
    width: '60%',
    alignSelf: 'flex-start',
    backgroundColor: '#7cb342',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
  },

  ChatViewSenderStyle: {
    width: '60%',
    alignSelf: 'flex-end',
    backgroundColor: '#00897b',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
  },

  ChatViewMessageStyle: {
    color: Colors.white,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 7,
    fontSize: 16,
  },

  ChatViewDateStyle: {
    color: Colors.mediumGray,
    paddingRight: 3,
    paddingBottom: 3,
    fontSize: 10,
    alignSelf: 'flex-end',
  },

  NoDataTextStyle: {
    color: Colors.mediumGray,
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },

  CenterDataViewStyle: {
    flex: 1,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ChatHeaderViewStyle: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.headerBGColor,
  },

  ChatProfileImageStyle: {
    width: 43,
    height: 43,
    borderRadius: 100,
    borderColor: Colors.white,
    borderWidth: 0.5,
    marginLeft: 0,
  },

  ChatReceiverNameTextStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {width: windowWidth, flex: 1, backgroundColor: Colors.appBGColor},

  QualificationListRowBGStyle: {
    width: windowWidth - 10,
    margin: 5,
    backgroundColor: '#fce1a4',
    borderColor: Colors.black,
    borderWidth: 0,
    borderRadius: 5,
  },

  QualificationListRowImageStyle: {
    flex: 1,
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  QualificationListRowNameStyle: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: 'bold',
    margin: 10,
  },

  QualificationListRowOptionBGStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 5,
  },

  QualificationListRowOptionBGInnerStyle: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: Colors.alertTransparentColor,
  },
  QualificationListTopImageStyle: {
    width: 30,
    height: 30,
  },

  AddQualificationImageBGStyle: {
    margin: 10,
    height: 200,
    width: windowWidth - 20,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 1,
  },

  AddQualificationImageStyle: {
    width: windowWidth - 22,
    height: 198,
  },

  AddQualificationUploadButtonStyle: {
    width: 90,
    height: 50,
    fontWeight: 'bold',
    color: Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.appColor,
    marginLeft: 50,
    marginRight: 50,
    padding: 15,
    marginTop: 5,
    textAlign: 'center',
  },

  /**
    Alert Dialog style
  **/
  Alert_Main_BG: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.alertTransparentColor,
  },

  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: 200,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
  },

  Alert_Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    padding: 10,
  },

  Alert_Option: {
    fontSize: 17,
    color: Colors.darkGray,
    padding: 10,
  },

  Alert_Message: {
    fontSize: 17,
    color: Colors.darkGray,
    textAlign: 'center',
    padding: 20,
  },

  Alert_ButtonStyle: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Alert_TextStyle: {
    color: Colors.headerBGColor,
    textAlign: 'center',
    fontSize: 15,
  },
  jobStyles: {
    marginTop: 6,
    fontWeight: '500',
    fontSize: 16,
  },
  appliedStyle: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
