/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import CallComponent from '../../../components/CallComponent';
import {useTheme} from '../../../../utils/ThemeContext';

import Cross from '../../../assets/svg/Cross.svg';
import Check from '../../../assets/svg/Check.svg';
import Redirect from '../../../assets/svg/Redirect.svg';
import Liabilities from '../../../assets/svg/transaction-minus.svg';
import Credits from '../../../assets/svg/coin.svg';
import Expenses from '../../../assets/svg/money-send.svg';
import Scanner from '../../../assets/svg/Scan.svg';
import Requests from '../../../assets/svg/timer-pause.svg';
import QRCode from '../../../assets/svg/qrcode.svg';

const VaultScreen = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const menuItems = [
    {title: 'Credits', icon: <Credits />, duration: '10h 30m'},
    {title: 'Liabilities', icon: <Liabilities />, duration: '2h 10m'},
    {title: 'Requests', icon: <Requests />, duration: '30m'},
  ];

  const requestsData = [
    {id: 1, status: 'missed', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 2, status: 'received', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 3, status: 'sent', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 4, status: '', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 5, status: '', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 6, status: '', name: 'Naren Kumar', duration: '234 Mins'},
  ];

  const styles = StyleSheet.create({
    gradientContainer: {
      // height: '100%',
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerIcons: {
      flexDirection: 'row',
      gap: 15,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuContainer: {
      gap: 15,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      padding: 20,
      borderRadius: 15,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    menuItemText: {
      color: theme.colors.coolGrey['12'],
      fontSize: 18,
      fontWeight: '500',
      fontFamily: theme.fontFamily.CGM,
    },
    menuItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    duration: {
      color: theme.colors.coolGrey['12'],
      fontSize: 16,
      opacity: 0.8,
      fontFamily: theme.fontFamily.CGM,
    },
    requestsTitle: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
      color: theme.colors.coolGrey['10'],
    },
    callContainer: {
      flexDirection: 'column',
      gap: 25,
      padding: 16,
      backgroundColor: 'black',
      borderTopWidth: 1,
      borderTopColor: theme.colors.coolGrey['4'],
    },
    subCall: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
    },
    crossContainer: {
      backgroundColor: theme.colors.coolGrey['4'],
      height: 40,
      width: 40,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkContainer: {
      backgroundColor: theme.colors.coolGrey['12'],
      height: 40,
      width: 40,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    callTitle: {
      fontFamily: theme.fontFamily.CGM,
      fontSize: theme.typography.paragraphL.fontSize,
      color: theme.colors.coolGrey['12'],
    },
    callTimestamp: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
      color: theme.colors.coolGrey['12'],
    },
    moreContainer: {
      backgroundColor: theme.colors.coolGrey['3'],
      height: 60,
      marginBottom: 24,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    moreTexts: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
    },
    people: {
      fontFamily: theme.fontFamily.SUPB,
      fontSize: theme.typography.paragraphS.fontSize,

      color: theme.colors.coolGrey['10'],
    },
  });

  const handleCreditNavigation = () => {
    navigation.navigate('time-screen');
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={[
          '#441A3B', // Deep purple
          '#2D1B30', // Mid purple
          '#1A1B2E', // Dark blue
          '#141B2E', // Deeper blue
        ]}
        locations={[0, 0.3, 0.7, 1]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Vault C</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <QRCode />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="account-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleCreditNavigation()}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <View style={styles.menuItemRight}>
                <Text style={styles.duration}>{item.duration}</Text>
                <Redirect />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <View style={styles.callContainer}>
        <Text style={styles.requestsTitle}>UPCOMING DUES</Text>
        {requestsData.slice(0, 4).map(request => (
          <View key={request.id} style={styles.subCall}>
            <View style={styles.subCall}>
              <CallComponent status={request.status} />
              <View>
                <Text style={styles.callTitle}>{request.name}</Text>
                <Text style={styles.callTimestamp}>{request.duration}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <TouchableOpacity style={styles.crossContainer}>
                <Cross />
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkContainer}>
                <Feather
                  name="check"
                  size={20}
                  color={isDarkMode ? 'black' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {requestsData.length > 4 && (
          <View style={styles.moreContainer}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                padding: 16,
              }}>
              <Text style={styles.moreTexts}>
                {requestsData.length - 4} more requests
              </Text>
              <Redirect />
            </View>
          </View>
        )}
      </View>

      {/* request container */}
      <View style={styles.callContainer}>
        <Text style={styles.requestsTitle}>06 NEW REQUESTS</Text>
        {requestsData.slice(0, 4).map(request => (
          <View key={request.id} style={styles.subCall}>
            <View style={styles.subCall}>
              <CallComponent status={request.status} />
              <View>
                <Text style={styles.callTitle}>{request.name}</Text>
                <Text style={styles.callTimestamp}>{request.duration}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <TouchableOpacity style={styles.crossContainer}>
                <Cross />
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkContainer}>
                <Feather
                  name="check"
                  size={20}
                  color={isDarkMode ? 'black' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {requestsData.length > 4 && (
          <View style={styles.moreContainer}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                padding: 16,
              }}>
              <Text style={styles.moreTexts}>
                {requestsData.length - 4} more requests
              </Text>
              <Redirect />
            </View>
          </View>
        )}
      </View>

      {/* recent Credits */}
      <View style={styles.callContainer}>
        <Text style={styles.requestsTitle}>RECENT CREDITS</Text>
        {requestsData.slice(0, 4).map(request => (
          <View key={request.id} style={styles.subCall}>
            <View style={styles.subCall}>
              <CallComponent status={request.status} />
              <View>
                <Text style={styles.callTitle}>{request.name}</Text>
                <Text style={styles.callTimestamp}>{request.duration}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <TouchableOpacity style={styles.crossContainer}>
                <Feather
                  name="plus"
                  size={20}
                  color={theme.colors.coolGrey['11']}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {requestsData.length > 4 && (
          <View style={styles.moreContainer}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
                padding: 16,
              }}>
              <Text style={styles.moreTexts}>
                {requestsData.length - 4} more requests
              </Text>
              <Redirect />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default VaultScreen;
