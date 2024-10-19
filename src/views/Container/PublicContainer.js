import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import AuraName from '../Screens/Auth/AuraName';
import ProfileSetup from '../Screens/Auth/ProfileSetup';
import CreatePIN from '../Screens/Auth/CreateTPIN';
import OTPScreen from '../Screens/Auth/OTPScreen';
import SplashScreen from '../Screens/SplashScreen';

const PublicContainer = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        marginTop: 0,
      }}>
      <HomeStack.Screen
        name="splash"
        options={{headerShown: false, headerMode: 'none'}}
        component={SplashScreen}
      />
      <HomeStack.Screen
        name="login"
        options={{headerShown: false, headerMode: 'none'}}
        component={LoginScreen}
      />
      <HomeStack.Screen
        name="otp-screen"
        options={{headerShown: false, headerMode: 'none'}}
        component={OTPScreen}
      />
      <HomeStack.Screen
        name="create-aura"
        options={{headerShown: false, headerMode: 'none'}}
        component={AuraName}
      />
      <HomeStack.Screen
        name="create-profile"
        options={{headerShown: false, headerMode: 'none'}}
        component={ProfileSetup}
      />
      <HomeStack.Screen
        name="create-pin"
        options={{headerShown: false, headerMode: 'none'}}
        component={CreatePIN}
      />
      {/* <HomeStack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* Add other routes within the Home stack */}
    </HomeStack.Navigator>
  );
};

export default PublicContainer;
