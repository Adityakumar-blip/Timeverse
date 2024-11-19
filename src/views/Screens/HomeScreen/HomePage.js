/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../../../utils/ThemeContext';

import QRCode from '../../../assets/svg/qrcode.svg';
import ToMobile from '../../../assets/svg/ToMobile.svg';
import Aura from '../../../assets/svg/ghost.svg';
import Scanner from '../../../assets/svg/Scan.svg';
import AddCircle from '../../../assets/svg/add-circle.svg';
import Liabilities from '../../../assets/svg/transaction-minus.svg';
import Credits from '../../../assets/svg/coin.svg';
import Expenses from '../../../assets/svg/money-send.svg';
import Requests from '../../../assets/svg/timer-pause.svg';
import NotificationBadge from '../../../components/NotificationBadge';
import CallComponent from '../../../components/CallComponent';
import Cross from '../../../assets/svg/Cross.svg';
import Check from '../../../assets/svg/Check.svg';
import Redirect from '../../../assets/svg/Redirect.svg';
const HomePage = () => {
  const {isDarkMode, theme} = useTheme();

  const homeOptions = [
    {
      id: 1,
      title: 'To Mobile',
      icon: <ToMobile />,
    },
    {
      id: 2,
      title: 'Aura ID',
      icon: <Aura />,
    },
    {
      id: 3,
      title: 'Scan QR',
      icon: <Scanner />,
    },
    {
      id: 4,
      title: 'Create',
      icon: <AddCircle />,
    },
  ];

  const notificationData = [
    {
      id: 1,
      title: 'Liabilities',
      IconComponent: <Liabilities />,
      count: 2,
      activeColor: theme.colors.red['5'],
      notifyColor: theme.colors.red['11'],
    },
    {
      id: 2,
      title: 'Credits',
      IconComponent: <Credits />,
      count: 5,
      activeColor: theme.colors.green['5'],
      notifyColor: theme.colors.green['11'],
    },
    {
      id: 3,
      title: 'Expenses',
      IconComponent: <Expenses />,
    },
    {
      id: 4,
      title: 'Requests',
      IconComponent: <Requests />,
      count: 5,
      activeColor: theme.colors.blue['5'],
      notifyColor: theme.colors.blue['11'],
    },
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
    iconContainer: {
      backgroundColor: theme.colors.coolGrey['4'],
      height: 72,
      width: 72,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
    parent: {
      alignItems: 'center',
    },
    iconTitle: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphXS.fontSize,
      marginTop: 20,
    },
    requestsTitle: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
    },
    callContainer: {
      marginTop: 50,
      flexDirection: 'column',
      gap: 25,
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
    },
    callTimestamp: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
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
  });

  return (
    <ScrollView style={styles.container}>
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

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {homeOptions.map((item, index) => (
          <View style={styles.parent} key={item.id}>
            <TouchableOpacity style={styles.iconContainer}>
              {item.icon}
            </TouchableOpacity>
            <Text style={styles.iconTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {notificationData.map((item, index) => (
          <View style={styles.parent} key={item.id}>
            <NotificationBadge {...item} />
          </View>
        ))}
      </View>

      <View style={styles.callContainer}>
        <Text style={styles.requestsTitle}>07 NEW REQUESTS</Text>
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
                <Check />
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

export default HomePage;
