import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../../utils/ThemeContext';
import Button from '../../../components/Button';
import TimePicker from '../../../components/TimePicker';

const {width, height} = Dimensions.get('window');

const SendTime = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [note, setNote] = useState('');

  const handleHoursChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 2) {
      const hourValue = parseInt(numericValue);
      if (!numericValue || (hourValue >= 0 && hourValue <= 23)) {
        setHours(numericValue);
      }
    }
  };

  const handleMinutesChange = text => {
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
      backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: width * 0.04,
      paddingTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.025,
    },
    backButton: {
      backgroundColor: theme.colors.coolGrey['4'],
      height: width * 0.15,
      width: width * 0.15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    profileSection: {
      alignItems: 'center',
      marginVertical: height * 0.025,
    },
    profileImage: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.1,
    },
    userName: {
      color: theme.colors.coolGrey['12'],
      fontSize: width * 0.045,
      marginTop: 8,
      fontFamily: theme.fontFamily.CGM,
    },
    userHandle: {
      color: theme.colors.coolGrey['10'],
      fontSize: width * 0.035,
      fontFamily: theme.fontFamily.SUPM,
    },
    timeInputContainer: {
      alignItems: 'center',
      marginVertical: height * 0.05,
    },
    timeInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      color: '#FFFFFF',
      fontSize: width * 0.12,
      fontWeight: 'bold',
      width: width * 0.25,
      textAlign: 'center',
      padding: width * 0.02,
    },
    timeSeparator: {
      color: theme.colors.coolGrey['5'],
      fontSize: width * 0.08,
      fontWeight: 'bold',
      marginHorizontal: width * 0.02,
    },
    noteContainer: {
      width: '100%',
      paddingHorizontal: width * 0.05,
      marginTop: height * 0.025,
    },
    noteInput: {
      backgroundColor: 'transparent',
      borderRadius: 8,
      color: '#FFFFFF',
      padding: width * 0.04,
      fontSize: width * 0.04,
      textAlign: 'center',
      minHeight: 20,
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: width * 0.04,
      paddingBottom: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
    },
    liabilityButton: {
      backgroundColor: 'transparent',
      padding: width * 0.04,
      marginBottom: height * 0.015,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
    },
    liabilityButtonText: {
      color: theme.colors.coolGrey['10'],
      textAlign: 'center',
      fontFamily: theme.fontFamily.CGM,
      fontSize: width * 0.035,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.contentContainer}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('contact')}>
              <Icon name="arrow-back" size={width * 0.06} color="#fff" />
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
              {/* <TimePicker /> */}
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

        {/* Bottom Buttons - Always Attached */}
        <View style={styles.bottomContainer}>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendTime;
