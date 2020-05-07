/*
  Defines important string messages and string values used by app
*/

const Strings = {
  appName: 'STAFFA',

  MESSAGES_TAB: ['CHATS', 'CONTACTS'],

  GENDER: [{name: 'MALE'}, {name: 'FEMALE'}],

  DOC_TYPE: [
    {name: 'Passport'},
    {name: 'Driving Licence'},
    {name: 'Government ID Card'},
  ],

  DISTANCE_MILES: [
    {name: '5 Miles'},
    {name: '10 Miles'},
    {name: '15 Miles'},
    {name: '20 Miles'},
    {name: '25 Miles'},
    {name: '30 Miles'},
    {name: '35 Miles'},
    {name: '40 Miles'},
    {name: '45 Miles'},
    {name: '50 Miles'},
    {name: '55 Miles'},
    {name: '60 Miles'},
    {name: '65 Miles'},
    {name: '70 Miles'},
    {name: '75 Miles'},
    {name: '80 Miles'},
    {name: '85 Miles'},
    {name: '90 Miles'},
    {name: '95 Miles'},
    {name: '100 Miles'},
  ],

  DISPLAY_TIME_FORMAT_1: 'DD-MMM-YYYY hh:mm a',

  FONT_QMA: 'Queen Of The Modern Age',
  APP_SCREEN_HOME: 'HomeScreen',
  APP_SCREEN_SPLASH: 'SplashScreen',
  APP_SCREEN_LOGIN: 'LoginScreen',
  APP_SCREEN_SIGNUP: 'SignUpScreen',
  APP_SCREEN_FORGOT_PASSWORD: 'ForgotPasswordScreen',
  APP_SCREEN_VERIFY: 'VerifyMobileNumberScreen',
  APP_SCREEN_ADD_ADDRESS: 'AddAddressScreen',
  APP_SCREEN_TNC: 'TermsConditionScreen',
  APP_SCREEN_EMP_CONTRACT: 'EmploymentContractScreen',
  APP_SCREEN_INFO_SHARING: 'InfoSharingScreen',
  APP_SCREEN_NOTIFICATION_SETTINGS: 'NotificationSettingsScreen',
  APP_SCREEN_BEGIN_VERIFICATION: 'BeginVerificationScreen',
  APP_SCREEN_VERIFICATION: 'VerificationScreen',
  APP_SCREEN_PRIVACY: 'PrivacyScreen',
  APP_SCREEN_DBS: 'DBSScreen',
  APP_SCREEN_QUALIFICATION: 'QualificationScreen',
  APP_SCREEN_CERTIFICATE: 'CertificateScreen',
  APP_SCREEN_REFERENCES: 'ReferencesScreen',
  APP_SCREEN_SKILLS: 'SkillsScreen',
  APP_SCREEN_BIO: 'BioScreen',
  APP_SCREEN_BASIC_INFO: 'BasicInfoScreen',
  APP_SCREEN_QUALIFICATION_LIST_LOGIN: 'QualificationListScreenLogin',
  APP_SCREEN_REFERENCE_LIST_LOGIN: 'ReferencesListScreenLogin',
  APP_SCREEN_SUCCESS: 'SuccessScreen',

  APP_SCREEN_UPDATE_ADDRESS: 'UpdateAddressScreen',
  APP_SCREEN_UPDATE_BASIC_INFO: 'UpdateBasicInfoScreen',
  APP_SCREEN_UPDATE_BIO: 'UpdateBioScreen',
  APP_SCREEN_UPDATE_CERTIFICATE: 'UpdateCertificateScreen',
  APP_SCREEN_UPDATE_DBS: 'UpdateDBSScreen',
  APP_SCREEN_UPDATE_EMPLOYMENT_CONTRACT: 'UpdateEmploymentContractScreen',
  APP_SCREEN_UPDATE_INFO_SHARING: 'UpdateInfoSharingScreen',
  APP_SCREEN_UPDATE_NOTIFICATION_SETTINGS: 'UpdateNotificationSettingsScreen',
  APP_SCREEN_UPDATE_PRIVACY: 'UpdatePrivacyScreen',
  APP_SCREEN_UPDATE_QUALIFICATIONS: 'UpdateQualificationScreen',
  APP_SCREEN_UPDATE_REFERENCES: 'UpdateReferenceScreen',
  APP_SCREEN_UPDATE_SKILLS: 'UpdateSkillsScreen',
  APP_SCREEN_UPDATE_TERM_CONDITIONS: 'UpdateTermsConditionScreen',
  APP_SCREEN_UPDATE_VERIFICATION: 'UpdateVerificationScreen',
  APP_SCREEN_QUALIFICATION_LIST: 'QualificationListScreen',
  APP_SCREEN_ADD_QUALIFICATION: 'AddQualificationScreen',
  APP_SCREEN_REFERENCES_LIST: 'ReferencesListScreen',
  APP_SCREEN_ADD_REFERENCE: 'AddReferenceScreen',

  APP_SCREEN_PROFILE: 'Profile',
  APP_SCREEN_MESSAGES: 'Messages',
  APP_SCREEN_NOTIFICATIONS: 'Notifications',
  APP_SCREEN_CHAT: 'ChatScreen',
  APP_SCREEN_SETTINGS: 'SettingsScreen',
  APP_BID_SCREEN: 'BidScreen',
  APP_SCREEN_MY_BIDS: 'MyBidsScreen',
  APP_SCREEN_MY_CONTRACTS: 'MyContractsScreen',
  APP_SCREEN_MY_PAYMENTS: 'MyPaymentsScreen',
  APP_SCREEN_PAYMENT: 'PaymentScreen',
  APP_SCREEN_SEARCH_JOBS: 'Search Jobs',

  registerNotificationMsg:
    'We need to notify you of compliance related matters, payments and offers relating to your vocation and aspirations. \n\n You can change this settings at any time in your device settings.',
  registerVerificationMsg:
    'We need to verify your identity using your government issued identification documentation.',

  PREF_USER_DATA: 'UserData',

  FS_PDF_TNC:
    'https://firebasestorage.googleapis.com/v0/b/staffa-5e3a4.appspot.com/o/APP_DATA%2FTnC%2FUntitled.pdf?alt=media&token=db139182-4eb0-4a69-909b-d008a48c54b3',

  FS_FILE_DIR_VERIFICATION: 'VerificationDoc',
  FS_FILE_DIR_DBS: 'DBS_Doc',
  FS_FILE_DIR_QUALIfICATION: 'Qualification',
  FS_FILE_DIR_REFERENCES: 'References',
  FS_FILE_DIR_PROFILE: 'Profile',

  FS_COLLECTION_USERS: 'Users',
  FS_COLLECTION_USER_CONVERSATION: 'UserConversation',
  FS_COLLECTION_CONVERSATION: 'Conversations',
  FS_COLLECTION_TOPICS: 'Topics',
  FS_COLLECTION_MESSAGES: 'Messages',
  FS_COLLECTION_NOTIFICATIONS: 'Notifications',

  FS_COLLECTION_APP_RESOURCES: 'AppResources',
  FS_DOC_CONTRACTS: 'Contracts',
  FS_COLLECTION_JOBS: 'jobs',
  FS_COLLECTION_BIDS: 'Bids',
  FS_COLLECTION_PAYMENTS: 'payments',

  APP_RESOURCE_EMPLOYMENT_CONTRACT: 'EmploymentContract',
  APP_RESOURCE_TNC: 'TermsConditions',
  APP_RESOURCE_PRIVACY_POLICY: 'PrivacyPolicyContract',
  APP_RESOURCE_INFO_SHARING: 'InfoSharing',

  alertLogout: 'Are you sure you want to Logout?',

  msgNoContactsAvailable: 'No contacts available',
  msgNoChatFound: 'No chats found',
  msgNoNotificationsFound: 'No notifications found',
  msgNoQualificationFound: 'No qualifications found',
  msgNoReferencesFound: 'No references found',
  msgErrorLoadingPDF: 'Error in loading PDF',
  msgSomethingWentWrong: 'Something went wrong. Please try later',

  dialogButtonOK: 'OK',
  dialogButtonCancel: 'CANCEL',

  BASE_URL: 'https://us-central1-staffa-13e8a.cloudfunctions.net',
};
export default Strings;
