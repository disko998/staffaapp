import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Strings from './utils/res/Strings';

/*
    Screens
*/
// import SplashScreen from './screens/SplashScreen';
import SignUpScreen from './screens/auth/signup/SignUpScreen';
import LoginScreen from './screens/auth/signin/LoginScreen';
import ForgotPasswordScreen from './screens/auth/signin/ForgotPasswordScreen';
// import AddAddressScreen from './screens/auth/signin/AddAddressScreen';
// import TermsConditionScreen from './screens/auth/signin/TermsConditionScreen';
// import EmploymentContractScreen from './screens/auth/signin/EmploymentContractScreen';
// import PrivacyScreen from './screens/auth/signin/PrivacyScreen';
// import InfoSharingScreen from './screens/auth/signin/InfoSharingScreen';
// import NotificationSettingsScreen from './screens/auth/signin/NotificationSettingsScreen';
// import BeginVerificationScreen from './screens/auth/signin/BeginVerificationScreen';
// import VerificationScreen from './screens/auth/signin/VerificationScreen';
// import DBSScreen from './screens/auth/signin/DBSScreen';
// import CertificateScreen from './screens/auth/signin/CertificateScreen';
// import SkillsScreen from './screens/auth/signin/SkillsScreen';
// import BioScreen from './screens/auth/signin/BioScreen';
// import SuccessScreen from './screens/auth/signin/SuccessScreen';
// import VerifyMobileNumberScreen from './screens/auth/signin/VerifyMobileNumberScreen';
// import QualificationListScreenLogin from './screens/auth/signin/QualificationListScreenLogin';
// import ReferencesListScreenLogin from './screens/auth/signin/ReferencesListScreenLogin';

// import UpdateAddressScreen from './screens/dashboard/drawer/profileComponents/UpdateAddressScreen';
// import UpdateBasicInfoScreen from './screens/dashboard/drawer/profileComponents/UpdateBasicInfoScreen';
// import UpdateBioScreen from './screens/dashboard/drawer/profileComponents/UpdateBioScreen';
// import UpdateCertificateScreen from './screens/dashboard/drawer/profileComponents/UpdateCertificateScreen';
// import UpdateDBSScreen from './screens/dashboard/drawer/profileComponents/UpdateDBSScreen';
// import UpdateEmploymentContractScreen from './screens/dashboard/drawer/profileComponents/UpdateEmploymentContractScreen';
// import UpdateInfoSharingScreen from './screens/dashboard/drawer/profileComponents/UpdateInfoSharingScreen';
// import UpdateNotificationSettingsScreen from './screens/dashboard/drawer/profileComponents/UpdateNotificationSettingsScreen';
// import UpdatePrivacyScreen from './screens/dashboard/drawer/profileComponents/UpdatePrivacyScreen';
// import UpdateQualificationScreen from './screens/dashboard/drawer/profileComponents/UpdateQualificationScreen';
// import UpdateReferenceScreen from './screens/dashboard/drawer/profileComponents/UpdateReferenceScreen';
// import UpdateSkillsScreen from './screens/dashboard/drawer/profileComponents/UpdateSkillsScreen';
// import UpdateTermsConditionScreen from './screens/dashboard/drawer/profileComponents/UpdateTermsConditionScreen';
// import UpdateVerificationScreen from './screens/dashboard/drawer/profileComponents/UpdateVerificationScreen';
// import QualificationListScreen from './screens/dashboard/drawer/profileComponents/QualificationListScreen';
// import AddQualificationScreen from './screens/dashboard/drawer/profileComponents/AddQualificationScreen';
// import ReferencesListScreen from './screens/dashboard/drawer/profileComponents/ReferencesListScreen';
// import AddReferenceScreen from './screens/dashboard/drawer/profileComponents/AddReferenceScreen';

// import HomeScreen from './screens/dashboard/HomeScreen';
// import BidScreen from './screens/dashboard/BidScreen';
// import PaymentScreen from './screens/dashboard/PaymentScreen';
// import ProfileScreen from './screens/dashboard/drawer/ProfileScreen';
// import SettingsScreen from './screens/dashboard/drawer/SettingsScreen';
// import MessagesScreen from './screens/dashboard/drawer/MessagesScreen';
// import MyPaymentsScreen from './screens/dashboard/drawer/MyPaymentsScreen';
// import MyBidsScreen from './screens/dashboard/drawer/MyBidsScreen';
// import MyContractsScreen from './screens/dashboard/drawer/MyContractsScreen';
// import NotificationsScreen from './screens/dashboard/drawer/NotificationsScreen';
// import ChatScreen from './screens/dashboard/drawer/messageComponents/ChatScreen';

const RootStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={Strings.APP_SCREEN_HOME}
        headerMode="none"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name={Strings.APP_SCREEN_LOGIN}
          component={LoginScreen}
        />
        <RootStack.Screen
          name={Strings.APP_SCREEN_SIGNUP}
          component={SignUpScreen}
        />
        <RootStack.Screen
          name={Strings.APP_SCREEN_FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
