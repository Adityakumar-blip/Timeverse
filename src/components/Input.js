/* eslint-disable curly */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/ThemeContext';

const TextArea = ({
  placeholder,
  disabled,
  error,
  success,
  onChange,
  numberOfLines = 4,
}) => {
  const {theme} = useTheme();
  const [value, setValue] = useState('');

  const handleChange = text => {
    setValue(text);
    if (onChange) onChange(text);
  };

  const styles = StyleSheet.create({
    textArea: {
      borderWidth: 1,
      borderColor: theme.colors.coolGrey[4],
      padding: 10,
      fontSize: theme.typography.paragraphM.fontSize,
      fontFamily: theme.fontFamily.CGM,
      color: disabled ? theme.colors.coolGrey[7] : theme.colors.coolGrey[10],
      backgroundColor: 'transparent',
      textAlignVertical: 'top',
    },
  });

  return (
    <TextInput
      style={styles.textArea}
      multiline
      numberOfLines={numberOfLines}
      placeholder={placeholder}
      placeholderTextColor={
        error
          ? theme.colors.red[10]
          : success
          ? theme.colors.green[10]
          : disabled
          ? theme.colors.coolGrey[7]
          : theme.colors.coolGrey[10]
      }
      onChangeText={handleChange}
      value={value}
      editable={!disabled}
    />
  );
};

const OTPInput = ({length, onChange, label}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef(
    Array(length)
      .fill(null)
      .map(() => React.createRef()),
  );
  const {theme} = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];

    // Handle pasting of full OTP
    if (text.length > 1) {
      const pastedOtp = text.slice(0, length).split('');
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedOtp[i] || '';
      }
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(''));
      // Focus on the last filled input or the last input
      const lastFilledIndex =
        newOtp.findLastIndex(digit => digit !== '') || length - 1;
      inputRefs.current[lastFilledIndex].current.focus();
      return;
    }

    // Handle single character input
    newOtp[index] = text;
    setOtp(newOtp);

    if (onChange) onChange(newOtp.join(''));

    if (text.length === 1) {
      if (index < length - 1) {
        inputRefs.current[index + 1].current.focus();
      } else {
        inputRefs.current[index].current.blur();
      }
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleFocus = index => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      width: '100%',
    },
    input: {
      width: (screenWidth - 60) / length - 10, // Adjusted for both 4 and 6 inputs
      height: 56,
      borderWidth: 1,
      borderTopColor: theme.colors.coolGrey[4],
      borderLeftColor: theme.colors.coolGrey[4],
      borderRightColor: theme.colors.coolGrey[4],
      borderBottomColor: theme.colors.coolGrey[4],
      borderRadius: 0,
      textAlign: 'center',
      fontSize: theme.typography.paragraphM.fontSize,
      fontFamily: theme.fontFamily.CGL,
      color: theme.colors.coolGrey[10],
    },
    focusedInput: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.coolGrey[10],
      backgroundColor: theme.colors.coolGrey[4],
    },
    filledInput: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.coolGrey[10],
    },
    labelText: {
      fontFamily: theme.fontFamily.SUPL,
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.paragraphXS.fontSize,
      textTransform: 'uppercase',
    },
  });

  return (
    <View>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              focusedIndex === index && styles.focusedInput,
              digit !== '' && styles.filledInput,
            ]}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={text => handleOtpChange(text, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            value={digit}
            ref={inputRefs.current[index]}
          />
        ))}
      </View>
    </View>
  );
};

const PhoneInput = ({
  placeholder,
  disabled,
  error,
  success,
  onChange,
  countryCodes,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const {theme} = useTheme();

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setIsOpen(false);
    if (onChange) onChange({countryCode: country.code, phoneNumber});
  };

  const handlePhoneChange = number => {
    setPhoneNumber(number);
    if (onChange)
      onChange({countryCode: selectedCountry.code, phoneNumber: number});
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    pickerContainer: {
      marginRight: 10,
      zIndex: 1, // Ensure the picker is above the input field
    },
    picker: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      // backgroundColor: theme.colors.coolGrey[2],
      borderWidth: 1,
      borderColor: theme.colors.coolGrey[4],
      width: 96,
      height: 56,
    },
    pickerText: {
      fontSize: theme.typography.paragraphM.fontSize,
      fontFamily: theme.fontFamily.CGM,
      color: theme.colors.coolGrey[10],
    },
    dropdownContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.coolGrey[1],
      borderWidth: 1,
      borderColor: theme.colors.coolGrey[4],
      borderTopWidth: 0,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      maxHeight: 200,
      zIndex: 1000, // Ensure the dropdown is above all other components
    },
    option: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.coolGrey[4],
    },
    optionText: {
      fontSize: theme.typography.paragraphM.fontSize,
      fontFamily: theme.fontFamily.CGM,
      color: theme.colors.coolGrey[10],
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: theme.typography.paragraphM.fontSize,
      fontFamily: theme.fontFamily.CGM,
      color: theme.colors.coolGrey[10],
      borderWidth: 1,
      borderColor: theme.colors.coolGrey[4],
      height: 56,
    },
    checkIcon: {
      position: 'absolute',
      right: 10,
      top: 12,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
      zIndex: 999, // Just below the dropdown
    },
    labelText: {
      fontFamily: theme.fontFamily.SUPL,
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.paragraphXS.fontSize,
      textTransform: 'uppercase',
    },
  });

  return (
    <View style={{zIndex: 1}}>
      {/* Wrapper to contain dropdown */}
      {label && <Text style={styles.labelText}>{label}</Text>}

      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setIsOpen(!isOpen)}
              disabled={disabled}>
              <Text style={styles.pickerText}>{selectedCountry.code}</Text>
              <MaterialIcon
                name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color={theme.colors.coolGrey[10]}
              />
            </TouchableOpacity>
            {isOpen && (
              <>
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                  <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <ScrollView style={styles.dropdownContainer}>
                  {countryCodes.map((country, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.option}
                      onPress={() => handleCountrySelect(country)}>
                      <Text style={styles.optionText}>
                        {country.name} ({country.code})
                      </Text>
                      {selectedCountry.code === country.code && (
                        <Icon
                          name="check"
                          size={18}
                          color={theme.colors.coolGrey[10]}
                          style={styles.checkIcon}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.coolGrey[7]}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            editable={!disabled}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const InputField = ({
  placeholder,
  disabled,
  error,
  success,
  onChange,
  type = 'text',
  numberOfLines,
  otpLength,
  options,
  countryCodes,
  hint,
  hintMessage,
  leadingIcon,
  trailingIcon,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const {theme, isDarkMode} = useTheme();

  const handleChange = text => {
    setValue(text);
    if (onChange) onChange(text);
  };

  const getBottomBorderColor = () => {
    if (disabled && isFocused) return theme.colors.coolGrey[7];
    if (error && isFocused) return theme.colors.red[10];
    if (success && isFocused) return theme.colors.green[10];
    return isFocused ? theme.colors.coolGrey[10] : theme.colors.coolGrey[4];
  };

  const getIconName = () => {
    if (error) return 'checkmark-circle';
    if (success) return 'checkmark-circle';
    return 'checkmark-circle';
  };

  const getIconColor = () => {
    if (disabled) return theme.colors.coolGrey[7];
    if (error) return theme.colors.red[10];
    if (success) return theme.colors.green[10];
    return theme.colors.coolGrey[10];
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderTopColor: theme.colors.coolGrey[4],
      borderLeftColor: theme.colors.coolGrey[4],
      borderRightColor: theme.colors.coolGrey[4],
      height: theme.spacing['12XXXL'],
      borderBottomWidth: isFocused ? 2 : 1,
      borderBottomColor: getBottomBorderColor(),
    },
    input: {
      flex: 1,
      fontSize: theme.typography.paragraphM.fontSize,
      paddingHorizontal: leadingIcon ? 0 : theme.spacing['5M'],
      height: '100%',
      fontFamily: theme.fontFamily.CGM,
    },
    iconContainer: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isFocused ? theme.colors.coolGrey[2] : 'transparent',
    },
    hintText: {
      fontFamily: theme.fontFamily.SUPR,
      color: theme.colors.coolGrey[10],
    },
    labelText: {
      fontFamily: theme.fontFamily.SUPL,
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.paragraphXS.fontSize,
      textTransform: 'uppercase',
    },
  });

  if (type === 'textarea') {
    return (
      <TextArea
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        success={success}
        onChange={onChange}
        numberOfLines={numberOfLines}
      />
    );
  }

  if (type === 'otp') {
    return <OTPInput length={otpLength} onChange={onChange} label={label} />;
  }

  if (type === 'phone') {
    return (
      <PhoneInput
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        success={success}
        onChange={onChange}
        countryCodes={countryCodes}
        label={label}
      />
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing['4S'],
        marginBottom: 16,
      }}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <View style={styles.container}>
        {leadingIcon && (
          <TouchableOpacity style={styles.iconContainer} disabled={disabled}>
            <Icon
              name={getIconName(leadingIcon)}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: disabled
                ? theme.colors.coolGrey[7]
                : theme.colors.coolGrey[10],
              backgroundColor: isFocused
                ? theme.colors.coolGrey[2]
                : 'transparent',
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            error
              ? theme.colors.red[10]
              : success
              ? theme.colors.green[10]
              : disabled
              ? theme.colors.coolGrey[7]
              : theme.colors.coolGrey[8]
          }
          onChangeText={handleChange}
          value={value}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {trailingIcon && (
          <TouchableOpacity style={styles.iconContainer} disabled={disabled}>
            <Icon
              name={getIconName(trailingIcon)}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>
      {hintMessage && <Text style={styles.hintText}>{hintMessage}</Text>}
    </View>
  );
};

export default InputField;
