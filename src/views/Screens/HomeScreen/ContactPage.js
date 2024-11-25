import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../../../utils/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CallComponent from '../../../components/CallComponent';

const ContactPage = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Sample contacts data - you'd typically get this from your contacts API
  const contacts = [
    {id: '1', name: 'John Doe'},
    {id: '2', name: 'Jane Smith'},
    // Add more contacts as needed
  ];

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const selectContact = contact => {
    setSelectedContact(contact);
    setIsVisible(false);
  };

  const requestsData = [
    {id: 1, status: 'missed', name: 'Naren Kumar', duration: '+91 8675217229'},
    {
      id: 2,
      status: 'received',
      name: 'Naren Kumar',
      duration: '+91 8675217229',
    },
    {id: 3, status: 'sent', name: 'Naren Kumar', duration: '+91 8675217229'},
    {id: 4, status: '', name: 'Naren Kumar', duration: '+91 8675217229'},
    {id: 5, status: '', name: 'Naren Kumar', duration: '+91 8675217229'},
    {id: 6, status: '', name: 'Naren Kumar', duration: '+91 8675217229'},
  ];

  const handleSendTime = () => {
    navigation.navigate('send-time');
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height: '100%',
      padding: 16,
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
    dropdownButton: {
      padding: 12,
      borderRadius: 25,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: theme.colors.coolGrey['5'],
      paddingHorizontal: 20,
    },
    dropdownButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    contactText: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.CGM,
      fontSize: theme.typography.h4.fontSize,
    },
    userText: {
      color: theme.colors.coolGrey['10'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
    },
    contactSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.coolGrey['4'],
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
      color: theme.colors.coolGrey['10'],
      marginTop: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
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

      <View style={styles.contactSection}>
        <View>
          <Text style={styles.contactText}>All Contacts</Text>
          <Text style={styles.userText}>
            Please select the user to continue
          </Text>
        </View>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}>
          <Text style={styles.dropdownButtonText}>
            {selectedContact ? selectedContact.name : 'Contacts'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.callContainer}>
        {/* <Text style={styles.requestsTitle}>ALL CREDITS (234)</Text> */}
        {requestsData.map(request => (
          <View key={request.id} style={styles.subCall}>
            <View style={styles.subCall}>
              <CallComponent status={request.status} isStatus={false} />
              <View>
                <Text style={styles.callTitle}>{request.name}</Text>
                <Text style={styles.callTimestamp}>{request.duration}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => handleSendTime()}>
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
    </View>
  );
};

export default ContactPage;
