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

const SendTime = ({navigation}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

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

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{uri: 'profile_image_url'}}
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
            placeholderTextColor="#666"
            maxLength={2}
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TextInput
            style={styles.input}
            value={minutes}
            onChangeText={handleMinutesChange}
            keyboardType="numeric"
            placeholder="MM"
            placeholderTextColor="#666"
            maxLength={2}
          />
        </View>
        <Text style={styles.addNoteText}>Add Note</Text>
      </View>

      {/* Liability Button */}
      <TouchableOpacity style={styles.liabilityButton}>
        <Text style={styles.liabilityButtonText}>Mark as Liability</Text>
      </TouchableOpacity>

      {/* Send Request Button */}
      <TouchableOpacity style={styles.sendRequestButton}>
        <Text style={styles.sendRequestText}>SEND REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
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
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 8,
  },
  userHandle: {
    color: '#808080',
    fontSize: 14,
  },
  timeInputContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
    padding: 8,
  },
  timeSeparator: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  addNoteText: {
    color: '#808080',
    fontSize: 14,
    marginTop: 16,
  },
  liabilityButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  liabilityButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sendRequestButton: {
    backgroundColor: '#333333',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  sendRequestText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SendTime;
