/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BgPattern from '../../assets/svg/BGPattern.svg';
import DarkBGPattern from '../../assets/svg/dark-bgpattern.svg';
import DarkCompanyName from '../../assets/svg/dark-companyname.svg';
import CompanyName from '../../assets/svg/CompanyName.svg';
import {useTheme} from '../../../utils/ThemeContext';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();

  const navigateScreen = () => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 2000);
  };

  useEffect(() => {
    navigateScreen();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    logo: {
      width: '80%',
      height: undefined,
      aspectRatio: 1,
      maxWidth: 200,
      maxHeight: 200,
    },
    companyNameContainer: {
      position: 'absolute',
      bottom: 50,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {isDarkMode ? (
          <DarkBGPattern width={width} height={height} />
        ) : (
          <BgPattern width={width} height={height} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={
            isDarkMode
              ? require('../../assets/images/dark-logo.png')
              : require('../../assets/images/Timeverse-logo.png')
          }
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.companyNameContainer}>
        {isDarkMode ? <DarkCompanyName /> : <CompanyName />}
      </View>
    </View>
  );
};

export default SplashScreen;
