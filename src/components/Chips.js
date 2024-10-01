import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chip = ({
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  style,
  labelStyle,
  variant = 'default', // 'default', 'active', 'dark'
  shape = 'semi', // 'semi' or 'full'
}) => {
  const containerStyle = [
    styles.chip,
    shape === 'full' ? styles.fullRounded : styles.semiRounded,
    variant === 'active' && styles.activeChip,
    variant === 'dark' && styles.darkChip,
    style,
  ];

  const textStyle = [
    styles.label,
    variant === 'dark' ? styles.darkLabel : styles.lightLabel,
    labelStyle,
  ];

  const iconColor = variant === 'dark' ? '#FFFFFF' : '#1F1F1F';

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          size={20}
          color={iconColor}
          style={styles.leadingIcon}
        />
      )}
      <Text style={textStyle}>{label}</Text>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={20}
          color={iconColor}
          style={styles.trailingIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignSelf: 'flex-start', // This allows the chip to size to its content
  },
  semiRounded: {
    borderRadius: 8,
  },
  fullRounded: {
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: '#F5F5F5',
  },
  darkChip: {
    backgroundColor: '#1F1F1F',
    borderColor: '#1F1F1F',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  lightLabel: {
    color: '#1F1F1F',
  },
  darkLabel: {
    color: '#FFFFFF',
  },
  leadingIcon: {
    marginRight: 8,
  },
  trailingIcon: {
    marginLeft: 8,
  },
});

export default Chip;
