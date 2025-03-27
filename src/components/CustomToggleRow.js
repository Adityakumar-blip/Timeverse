import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';

const CustomToggleRow = ({icon, label, endComponent}) => {
  const {theme, isDarkMode} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.coolGrey['4'],
      height: 75,
      marginVertical: 16,
    },
    iconContainer: {
      marginRight: 12,
    },
    label: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.coolGrey['10'],
    },
    endComponent: {
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.endComponent}>{endComponent}</View>
    </View>
  );
};

export default CustomToggleRow;
