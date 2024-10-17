/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  //   const {user} = useSelector(({AuthSlice}) => AuthSlice);

  const navigateScreen = () => {
    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 2000);
  };

  //   useEffect(() => {
  //     if (!user) {
  //       navigateScreen();
  //     }
  //   }, []);

  //setNavigationProps

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Image
        source={require('../../Assets/Images/decorus_logo.png')}
        style={{height: 100, width: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'blue',
  },
});

export default SplashScreen;
