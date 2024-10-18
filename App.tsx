/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';

import Navigation from './src/Navigation';
import {ThemeProvider} from './utils/ThemeContext';

function App(): React.JSX.Element {
  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }

    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
