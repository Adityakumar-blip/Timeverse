import React, {useState, useContext} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '../../utils/ThemeContext';

const InputField = ({placeholder, disabled, error, success, onChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const theme = useTheme();

  const handleChange = text => {
    setValue(text);
    if (onChange) onChange(text);
  };

  const getBorderColor = () => {
    if (disabled) return theme.disabledColor;
    if (error) return theme.errorColor;
    if (success) return theme.successColor;
    return theme.borderColor;
  };

  const getIconName = () => {
    if (error) return 'close-circle';
    if (success) return 'checkmark-circle';
    return 'eye-outline';
  };

  const getIconColor = () => {
    if (disabled) return theme.disabledColor;
    if (error) return theme.errorColor;
    if (success) return theme.successColor;
    return theme.primaryColor;
  };

  return (
    <View
      style={[
        styles.container,
        {borderColor: getBorderColor()},
        isFocused && styles.focusedContainer,
      ]}>
      <TextInput
        style={[
          styles.input,
          {color: disabled ? theme.disabledColor : theme.textColor},
          isFocused && styles.focusedInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor={'#222'}
        onChangeText={handleChange}
        value={value}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity style={styles.iconContainer} disabled={disabled}>
        {/* <Ionicons name={getIconName()} size={24} color={getIconColor()} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e7e9ef',
    marginBottom: 16,
    height: 50,
  },
  focusedContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#181c25',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    height: '100%',
  },
  focusedInput: {
    backgroundColor: '#dadee7',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});

export default InputField;
