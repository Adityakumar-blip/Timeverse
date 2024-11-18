import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../../utils/ThemeContext';

import QRCode from '../../../assets/svg/qrcode.svg';
import ToMobile from '../../../assets/svg/ToMobile.svg';

const HomePage = () => {
  const {isDarkMode, theme} = useTheme();

  const homeOptions = [
    {
      id: 1,
      title: 'To Mobile',
      icon: <ToMobile />,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'black',
      height: '100%',
    },
    mainHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      width: 40,
    },
    qrContainer: {
      backgroundColor: theme.colors.coolGrey['4'],
      width: 48,
      height: 48,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainNav: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Image
          source={
            isDarkMode
              ? require('../../../assets/images/dark-logo.png')
              : require('../../../assets/images/Timeverse-logo.png')
          }
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.mainNav}>
          <View style={styles.qrContainer}>
            <QRCode />
          </View>
          <View style={styles.qrContainer}>
            <Image
              source={require('../../../assets/images/profile.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View>
        {homeOptions.forEach((item, index) => {
          <View>
            <View>
              <ToMobile />
            </View>
            <Text style={{color: 'white'}}>{item.title}</Text>
          </View>;
        })}
      </View>
    </View>
  );
};

export default HomePage;
