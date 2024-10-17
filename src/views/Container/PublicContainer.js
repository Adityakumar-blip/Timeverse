import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import AuraName from '../Screens/Auth/AuraName';

const PublicContainer = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        marginTop: 0,
      }}>
      <HomeStack.Screen
        name="login"
        options={{headerShown: false, headerMode: 'none'}}
        component={LoginScreen}
      />
      <HomeStack.Screen
        name="create-aura"
        options={{headerShown: false, headerMode: 'none'}}
        component={AuraName}
      />
      {/* <HomeStack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* Add other routes within the Home stack */}
    </HomeStack.Navigator>
  );
};

export default PublicContainer;
