import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
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

const {width, height} = Dimensions.get('window');

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
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
      paddingTop: 10,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: width * 0.04, // Responsive padding
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.015, // Responsive margin
    },
    backButton: {
      marginRight: width * 0.03,
      backgroundColor: theme.colors.coolGrey['4'],
      height: width * 0.15, // Responsive height
      width: width * 0.15, // Responsive width
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
      paddingHorizontal: width * 0.03,
      height: width * 0.15, // Responsive height
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
    },
    searchInput: {
      flex: 1,
      color: '#fff',
      fontSize: width * 0.04, // Responsive font size
      paddingVertical: 8,
    },
    searchIcon: {
      marginLeft: width * 0.02,
    },
    dropdownButton: {
      padding: width * 0.03,
      borderRadius: 25,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: theme.colors.coolGrey['5'],
      paddingHorizontal: width * 0.05,
    },
    dropdownButtonText: {
      color: theme.colors.coolGrey['12'],
      fontSize: width * 0.04, // Responsive font size
    },
    contactText: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.CGM,
      fontSize: width * 0.045, // Responsive font size
    },
    userText: {
      color: theme.colors.coolGrey['10'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: width * 0.035, // Responsive font size
    },
    contactSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.02,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.coolGrey['4'],
    },
    callContainer: {
      flexDirection: 'column',
      gap: height * 0.03, // Responsive gap
      padding: width * 0.02,
      backgroundColor: isDarkMode ? 'black' : 'white',
      borderTopWidth: 1,
      borderTopColor: theme.colors.coolGrey['4'],
    },
    subCall: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: width * 0.05, // Responsive gap
    },
    crossContainer: {
      backgroundColor: theme.colors.coolGrey['4'],
      height: width * 0.1, // Responsive height
      width: width * 0.1, // Responsive width
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkContainer: {
      backgroundColor: theme.colors.coolGrey['12'],
      height: width * 0.1, // Responsive height
      width: width * 0.1, // Responsive width
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    callTitle: {
      fontFamily: theme.fontFamily.CGM,
      fontSize: width * 0.04, // Responsive font size
      color: theme.colors.coolGrey['12'],
    },
    callTimestamp: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: width * 0.035, // Responsive font size
      color: theme.colors.coolGrey['10'],
      marginTop: 5,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}>
            <Icon
              name="arrow-back"
              size={width * 0.06} // Responsive icon size
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search here"
              placeholderTextColor="#8E8E93"
              returnKeyType="search"
            />
            <Icon
              name="search"
              size={width * 0.05} // Responsive icon size
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
          {requestsData.map(request => (
            <View key={request.id} style={styles.subCall}>
              <View style={styles.subCall}>
                <CallComponent status={request.status} isStatus={false} />
                <View>
                  <Text style={styles.callTitle}>{request.name}</Text>
                  <Text style={styles.callTimestamp}>{request.duration}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: width * 0.03,
                }}>
                <TouchableOpacity
                  style={styles.crossContainer}
                  onPress={() => handleSendTime()}>
                  <Feather
                    name="plus"
                    size={width * 0.05} // Responsive icon size
                    color={theme.colors.coolGrey['11']}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactPage;
