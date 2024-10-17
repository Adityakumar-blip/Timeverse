import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/ThemeContext';

const Chip = ({
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  style,
  labelStyle,
  variant = 'default', // 'default', 'active', 'disabled'
  shape = 'semi', // 'semi' or 'full'
}) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing['2XXS'],
      marginVertical: 4,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: theme.colors.coolGrey[4],
      alignSelf: 'flex-start',
    },
    semiRounded: {
      borderRadius: 8,
    },
    fullRounded: {
      borderRadius: 20,
    },
    activeChip: {
      backgroundColor: theme.colors.coolGrey[12],
    },
    darkChip: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.coolGrey[3],
    },
    label: {
      fontSize: theme.typography.paragraphM.fontSize,
      lineHeight: theme.typography.paragraphM.lineHeight,
      // fontWeight: 400,
      fontFamily: theme.fontFamily.CGM,
    },
    lightLabel: {
      color:
        variant === 'active'
          ? theme.colors.coolGrey[5]
          : theme.colors.coolGrey[9],
    },
    darkLabel: {
      color: theme.colors.coolGrey[7],
    },
    leadingIcon: {
      marginRight: 8,
    },
    trailingIcon: {
      marginLeft: 8,
    },
    paddingLeft: {
      paddingLeft: theme.spacing['5M'], // 16px
    },
    paddingRight: {
      paddingRight: theme.spacing['5M'], // 16px
    },
    paddingLeftWithIcon: {
      paddingLeft: theme.spacing['2XXS'], // 8px
    },
    paddingRightWithIcon: {
      paddingRight: theme.spacing['2XXS'], // 8px
    },
  });

  const containerStyle = [
    styles.chip,
    shape === 'full' ? styles.fullRounded : styles.semiRounded,
    variant === 'active' && styles.activeChip,
    variant === 'disabled' && styles.darkChip,
    leadingIcon ? styles.paddingLeftWithIcon : styles.paddingLeft,
    trailingIcon ? styles.paddingRightWithIcon : styles.paddingRight,
    style,
  ];

  const textStyle = [
    styles.label,
    variant === 'disabled' ? styles.darkLabel : styles.lightLabel,
    labelStyle,
  ];

  const iconColor =
    variant === 'disabled'
      ? theme.colors.coolGrey[7]
      : variant === 'active'
      ? theme.colors.coolGrey[5]
      : theme.colors.coolGrey[9];

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
        <MaterialIcon
          name={trailingIcon}
          size={20}
          color={iconColor}
          style={styles.trailingIcon}
        />
      )}
    </TouchableOpacity>
  );
};

export default Chip;
