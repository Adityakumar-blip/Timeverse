import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrivateContainer from './views/Container/PrivateContainer.js';
import PublicContainer from './views/Container/PublicContainer.js';

const Stack = createStackNavigator();

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    // Check for authentication token on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStatusBarHeight: 0,
          marginTop: 0,
        }}>
        {isAuthenticated ? (
          <Stack.Screen name="private" component={PrivateContainer} />
        ) : (
          <Stack.Screen
            name="public"
            options={{headerShown: false, headerMode: 'none'}}
            component={PublicContainer}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
