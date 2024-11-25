import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../../utils/ThemeContext';
import Button from '../../../components/Button';

const SendTime = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [note, setNote] = useState('');
  const handleHoursChange = text => {
    // Only allow numbers and limit to 2 digits
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 2) {
      const hourValue = parseInt(numericValue);
      if (!numericValue || (hourValue >= 0 && hourValue <= 23)) {
        setHours(numericValue);
      }
    }
  };

  const handleMinutesChange = text => {
    // Only allow numbers and limit to 2 digits
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 2) {
      const minuteValue = parseInt(numericValue);
      if (!numericValue || (minuteValue >= 0 && minuteValue <= 59)) {
        setMinutes(numericValue);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      paddingHorizontal: 16,
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 20,
      marginTop: 30,
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
    backButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
    },
    profileSection: {
      alignItems: 'center',
      marginVertical: 20,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    userName: {
      color: theme.colors.coolGrey['12'],
      fontSize: 18,
      marginTop: 8,
      fontFamily: theme.fontFamily.CGM,
    },
    userHandle: {
      color: theme.colors.coolGrey['10'],
      fontSize: 14,
      fontFamily: theme.fontFamily.SUPM,
    },
    timeInputContainer: {
      alignItems: 'center',
      marginVertical: 40,
    },
    timeInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      color: '#FFFFFF',
      fontSize: 45,
      fontWeight: 'bold',
      width: 100,
      textAlign: 'center',
      padding: 8,
    },
    timeSeparator: {
      color: theme.colors.coolGrey['5'],
      fontSize: 32,
      fontWeight: 'bold',
      marginHorizontal: 8,
    },
    addNoteText: {
      color: '#808080',
      fontSize: 14,
      marginTop: 16,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: 20, // Add padding at the bottom for better spacing
      paddingHorizontal: 16,
    },
    liabilityButton: {
      backgroundColor: 'transparent',
      padding: 16,
      // marginHorizontal: 16,
      marginBottom: 12, // Add margin between buttons
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
    },
    liabilityButtonText: {
      color: theme.colors.coolGrey['10'],
      textAlign: 'left',
      fontFamily: theme.fontFamily.CGM,
      fontSize: theme.typography.paragraphS.fontSize,
    },
    sendRequestButton: {
      backgroundColor: '#333333',
      padding: 16,
      marginHorizontal: 16,
      borderRadius: 8,
    },
    sendRequestText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    noteContainer: {
      paddingHorizontal: 20,
      width: '100%',
      marginTop: 20,
    },
    noteInput: {
      backgroundColor: 'transparent',
      borderRadius: 8,
      color: '#FFFFFF',
      padding: 16,
      fontSize: 16,
      textAlign: 'center',
      minHeight: 50,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('contact')}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://cdn.dribbble.com/users/5109848/screenshots/10997928/media/b611b150b5a84fc420fc1d7c51b21d53.png?resize=1000x750&vertical=center',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Narenkumar Muthukumaran</Text>
          <Text style={styles.userHandle}>@narenmuthukumaran</Text>
        </View>

        {/* Time Input */}
        <View style={styles.timeInputContainer}>
          <View style={styles.timeInput}>
            <TextInput
              style={styles.input}
              value={hours}
              onChangeText={handleHoursChange}
              keyboardType="numeric"
              placeholder="HH"
              placeholderTextColor={theme.colors.coolGrey['5']}
              maxLength={2}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              style={styles.input}
              value={minutes}
              onChangeText={handleMinutesChange}
              keyboardType="numeric"
              placeholder="MM"
              placeholderTextColor={theme.colors.coolGrey['5']}
              maxLength={2}
            />
          </View>
          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Add Note"
              placeholderTextColor="#808080"
              multiline={true}
              textAlignVertical="center"
            />
          </View>
        </View>
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Liability Button */}
        <TouchableOpacity style={styles.liabilityButton}>
          <Text style={styles.liabilityButtonText}>Mark as Liability</Text>
        </TouchableOpacity>

        {/* Send Request Button */}
        <Button
          title={'SEND REQUEST'}
          variant="primary"
          size="large"
          disabled={!hours && !minutes}
          onPress={() => handlePhoneSubmit()}
        />
      </View>
    </SafeAreaView>
  );
};

export default SendTime;
