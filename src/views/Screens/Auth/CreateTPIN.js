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

import BackIcon from '../../../assets/svg/back-icon.svg';

const CreatePIN = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handlePinSubmit = () => {
    if (step === 1 && pin.length === 6) {
      setStep(2);
    } else if (step === 2 && confirmPin.length === 6) {
      if (pin === confirmPin) {
        navigation.navigate('create-aura');
      } else {
        // Handle pin mismatch error
        console.log('PINs do not match');
      }
    }
  };

  const handleBackPress = () => {
    if (step === 2) {
      setStep(1);
      setConfirmPin('');
    } else {
      navigation.goBack();
    }
  };

  const handlePinChange = enteredPin => {
    if (step === 1) {
      setPin(enteredPin);
    } else {
      setConfirmPin(enteredPin);
    }
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
      paddingBottom: '80%',
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
      fontFamily: theme.fontFamily.SUPL,
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
      fontFamily: theme.fontFamily.CGEL,
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
            {/* <Icon
              name="arrow-back"
              size={24}
              color={theme.colors.coolGrey[12]}
            /> */}
            <BackIcon />
          </TouchableOpacity>

          <Text style={styles.heading}>
            {step === 1 ? 'Create T-PIN' : 'Confirm T-PIN'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1
              ? 'Please create your Time Pin to send and receive time with your loved ones'
              : 'Please confirm your Time Pin to send and receive time with your loved one’s'}
          </Text>
          <View style={styles.inputContainer}>
            <View>
              <InputField
                type="otp"
                otpLength={6}
                onChange={handlePinChange}
                label={step === 1 ? 'CREATE TIME PIN' : 'CONFIRM TIME PIN'}
                value={step === 1 ? pin : confirmPin}
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
                  fontFamily: theme.fontFamily.CGL,
                }}>
                1M+ Trusted Users in 2030
              </Text>
            </View>
          </View>
          <Button
            title={'CONTINUE'}
            variant="primary"
            size="large"
            disabled={pin.length !== 6}
            onPress={handlePinSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePIN;
