import React from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Strings from './utils/res/Strings';
import Colors from './utils/res/Colors';

/*
    Screens
*/
import SignUpScreen from './screens/auth/signup/SignUpScreen';
import LoginScreen from './screens/auth/signin/LoginScreen';
import ForgotPasswordScreen from './screens/auth/signin/ForgotPasswordScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import MessagesScreen from './screens/messages/MessagesScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import SearchJobScreen from './screens/searchJob/SearchJobScreen';
import DrawerProfile from './screens/profile/DrawerProfile';
import MyBidsScreen from './screens/dashboard/drawer/MyBidsScreen';
import MyContractsScreen from './screens/dashboard/drawer/MyContractsScreen ';
import MyPaymentsScreen from './screens/dashboard/drawer/MyPaymentsScreen';

function inDevelopmentScreen({route, navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 15, color: '#000', fontSize: 20}}>
        {`${route.name} in development`}
      </Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
}

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={Strings.APP_SCREEN_SEARCH_JOBS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Search Jobs') {
            iconName = focused ? 'ios-search' : 'ios-search';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'md-mail' : 'md-mail';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.inactive,
        inactiveBackgroundColor: Colors.main,
        activeBackgroundColor: Colors.main,
      }}>
      <Tab.Screen
        name={Strings.APP_SCREEN_SEARCH_JOBS}
        component={SearchJobScreen}
      />
      <Tab.Screen name={Strings.APP_SCREEN_PROFILE} component={ProfileScreen} />
      <Tab.Screen
        name={Strings.APP_SCREEN_MESSAGES}
        component={MessagesScreen}
      />
      <Tab.Screen
        name={Strings.APP_SCREEN_NOTIFICATIONS}
        component={NotificationScreen}
      />
    </Tab.Navigator>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="dashboard"
      drawerContent={DrawerProfile}>
      <Drawer.Screen name={'dashboard'} component={TabNavigation} />
      <Drawer.Screen name={'shift'} component={inDevelopmentScreen} />
      <Drawer.Screen name={'bids'} component={MyBidsScreen} />
      <Drawer.Screen name={'contracts'} component={MyContractsScreen} />
      <Drawer.Screen name={'payments'} component={MyPaymentsScreen} />
      <Drawer.Screen name={'logout'} component={inDevelopmentScreen} />
      <Drawer.Screen name={'help'} component={inDevelopmentScreen} />
      <Drawer.Screen name={'feedback'} component={inDevelopmentScreen} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={Strings.APP_SCREEN_HOME}
        headerMode="none"
        screenOptions={{headerShown: false}}>
        {true ? (
          <>
            <RootStack.Screen
              name={Strings.APP_SCREEN_HOME}
              component={DrawerNavigation}
            />
          </>
        ) : (
          <>
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
            <RootStack.Screen
              name={Strings.APP_SCREEN_VERIFY}
              component={inDevelopmentScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
