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

const LoginScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [isOtpScreen, setIsOtpScreen] = useState(false);
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
        {isOtpScreen && <View style={styles.backContainer}></View>}
        <View style={styles.topContent}>
          {isOtpScreen && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}>
              <Icon
                name="arrow-back"
                size={24}
                color={theme.colors.coolGrey[12]}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.heading}>
            {isOtpScreen ? 'Enter Security Code' : "Let's do Time Travel"}
          </Text>
          <Text style={styles.subtitle}>
            {isOtpScreen
              ? 'Please enter the 6-digit code sent to your phone'
              : 'To travel through Timeverse, Use your mobile number to continue'}
          </Text>
          <View style={styles.inputContainer}>
            {isOtpScreen ? (
              <View>
                <InputField
                  type="otp"
                  otpLength={6}
                  onChange={handleOtpChange}
                  label="ENTER OTP"
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center', marginTop: 15}}>
                    Send a OTP to email
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      textAlign: 'center',
                      marginTop: 15,
                      textDecorationStyle: 'solid',
                    }}>
                    Re-send Code
                  </Text>
                </View>
              </View>
            ) : (
              <InputField
                type="phone"
                placeholder="Enter phone number"
                countryCodes={[
                  {name: 'United States', code: '+1'},
                  {name: 'United Kingdom', code: '+44'},
                ]}
                onChange={({countryCode, phoneNumber}) => {
                  console.log(countryCode, phoneNumber);
                  setPhoneNumber(phoneNumber);
                }}
                label="Mobile Number"
              />
            )}
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
            title={isOtpScreen ? 'VERIFY' : 'CONTINUE'}
            variant="secondary"
            size="large"
            disabled={!phoneNumber && !isOtpScreen}
            onPress={isOtpScreen ? () => handleSubmitOtp() : handlePhoneSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
