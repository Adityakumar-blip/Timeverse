import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../Screens/Auth/LoginScreen';

const PrivateContainer = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* Add other authentication-related screens here */}
    </AuthStack.Navigator>
  );
};

export default PrivateContainer;
