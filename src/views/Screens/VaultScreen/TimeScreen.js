import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For the back arrow
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from '../../../../utils/ThemeContext';
import Redirect from '../../../assets/svg/Redirect.svg';
import CallComponent from '../../../components/CallComponent';
import Credits from '../../../assets/svg/coin.svg';

const TimeScreen = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const [active, setActive] = useState('credit');

  const requestsData = [
    {id: 1, status: 'missed', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 2, status: 'received', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 3, status: 'sent', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 4, status: '', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 5, status: '', name: 'Naren Kumar', duration: '234 Mins'},
    {id: 6, status: '', name: 'Naren Kumar', duration: '234 Mins'},
  ];

  const handleChangeTab = tabName => {
    setActive(tabName);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.coolGrey['1'],
      paddingTop: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    backButton: {
      marginRight: 12,
      backgroundColor: theme.colors.coolGrey['4'],
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 60,
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
    },
    searchInput: {
      flex: 1,
      color: '#fff',
      fontSize: 16,
      paddingVertical: 8,
    },
    searchIcon: {
      marginLeft: 8,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 24,
      width: '100%',
      justifyContent: 'center',
    },
    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginRight: 12,
      height: 48,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
      borderRadius: 12,
    },
    tabButtonActive: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginRight: 12,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      height: 48,
      justifyContent: 'center',
    },
    tabText: {
      color: theme.colors.coolGrey['10'],
      fontSize: 16,
      fontFamily: theme.fontFamily.SUPB,
    },
    tabTextActive: {
      color: theme.colors.coolGrey['1'],
      fontSize: 16,
      fontWeight: '500',
      fontFamily: theme.fontFamily.SUPEB,
    },
    creditSection: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#15181E',
      borderBottomColor: '#15181E',
      justifyContent: 'space-between',
    },
    creditLabel: {
      color: theme.colors.coolGrey['11'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: 14,
      marginBottom: 8,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timeText: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.SUPEB,
      fontSize: 48,
    },
    coinIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.green['5'],
      alignItems: 'center',
      justifyContent: 'center',
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
      //   paddingBottom: 16,
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
    endText: {
      color: theme.colors.coolGrey['11'],
      paddingVertical: 20,
      fontFamily: theme.fontFamily.SUPM,
      fontSize: 14,
    },
    endContainer: {
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with Search */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('VaultMain')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#8E8E93"
          />
          <Icon
            name="search"
            size={20}
            color="#8E8E93"
            style={styles.searchIcon}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={
            active === 'credit' ? styles.tabButtonActive : styles.tabButton
          }
          onPress={() => handleChangeTab('credit')}>
          <Text
            style={active === 'credit' ? styles.tabTextActive : styles.tabText}>
            Credits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            active === 'liability' ? styles.tabButtonActive : styles.tabButton
          }
          onPress={() => handleChangeTab('liability')}>
          <Text
            style={
              active === 'liability' ? styles.tabTextActive : styles.tabText
            }>
            Liabilities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            active === 'request' ? styles.tabButtonActive : styles.tabButton
          }
          onPress={() => handleChangeTab('request')}>
          <Text
            style={
              active === 'request' ? styles.tabTextActive : styles.tabText
            }>
            Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* Time Credits Section */}
      <View style={styles.creditSection}>
        <Text style={styles.creditLabel}>
          {active === 'credit'
            ? 'TIME CREDITS'
            : active === 'liability'
            ? 'TIME LIABILITIES'
            : 'TIME REQUESTS'}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>2h 15m</Text>
          <View style={styles.coinIconContainer}>
            <Credits />
          </View>
        </View>
      </View>

      {/* recent credits */}
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

      {/* all credits */}
      <View style={styles.callContainer}>
        <Text style={styles.requestsTitle}>ALL CREDITS (234)</Text>
        {requestsData.map(request => (
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
     
      </View>
      <View style={styles.endContainer}>
        <Text style={styles.endText}>Thats it! You’re at the end</Text>
      </View>
    </ScrollView>
  );
};

export default TimeScreen;
