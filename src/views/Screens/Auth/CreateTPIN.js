/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../components/Button';
import InputField from '../../../components/Input';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../utils/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CreatePIN = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [confirmPin, setConfirmPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = () => {
    if (phoneNumber) {
      setIsOtpScreen(true);
    }
  };

  const handleSubmitOtp = () => {
    navigation.navigate('create-aura');
  };

  const handleBackPress = () => {
    setIsOtpScreen(false);
  };

  const handleOtpChange = otp => {
    console.log('OTP entered:', otp);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.coolGrey[1],
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    topContent: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: isOtpScreen ? '80%' : '15%',
    },
    backContainer: {
      position: 'absolute',
      top: 100,
      left: 20,
    },
    backButton: {
      backgroundColor: theme.colors.coolGrey[4],
      borderRadius: theme.spacing['4S'],
      height: theme.spacing['11XL'],
      width: theme.spacing['11XL'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    heading: {
      color: theme.colors.coolGrey[12],
      fontSize: theme.typography.h3.fontSize,
      lineHeight: theme.typography.h4.lineHeight,
      fontFamily: theme.fontFamily.CGM,
      marginBottom: 10,
    },
    subtitle: {
      color: theme.colors.coolGrey[10],
      fontFamily: theme.fontFamily.CGL,
      fontSize: theme.typography.paragraphS.fontSize,
      lineHeight: theme.typography.paragraphS.lineHeight,
      marginBottom: 20,
    },
    inputContainer: {
      marginTop: 20,
    },
    bottomContent: {
      marginBottom: 20,
    },
    trustContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    trust: {
      borderWidth: 2,
      borderColor: theme.colors.coolGrey[4],
      paddingVertical: theme.spacing['1XXXS'],
      paddingHorizontal: theme.spacing['2XXS'],
      color: theme.colors.coolGrey[11],
      fontFamily: theme.fontFamily.CGM,
      borderRadius: 100,
      height: theme.spacing['10L'],
      width: 219,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon
              name="arrow-back"
              size={24}
              color={theme.colors.coolGrey[12]}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Create T-PIN</Text>
          <Text style={styles.subtitle}>
            Please create yout Time Pin to send and receive time with your loved
            ones
          </Text>
          <View style={styles.inputContainer}>
            <View>
              <InputField
                type="otp"
                otpLength={6}
                onChange={handleOtpChange}
                label="CREATE TIME PIN"
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.trustContainer}>
            <View style={styles.trust}>
              <Icon
                name={'checkmark-circle'}
                size={20}
                color={theme.colors.coolGrey[10]}
              />
              <Text
                style={{
                  color: theme.colors.coolGrey[11],
                }}>
                1M+ Trusted Users in 2030
              </Text>
            </View>
          </View>
          <Button
            title={'CONTINUE'}
            variant="primary"
            size="large"
            onPress={confirmPin ? () => handleSubmitOtp() : handlePhoneSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePIN;
