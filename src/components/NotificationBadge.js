/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

const NotificationBadge = ({
  count = 0,
  IconComponent,
  title = 'Requests',
  activeColor = '#0066CC',
  notifyColor = '#0066CC',
  inactiveColor = '#808080',
  size = 72,
  iconSize = 24,
  borderWidth = 1,
}) => {
  const {theme} = useTheme();
  const hasRequests = count > 0;

  if (!IconComponent) {
    console.warn('IconComponent is required for NotificationBadge');
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    badge: {
      position: 'absolute',
      top: -14,
      left: 20,
      minWidth: 35,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    badgeText: {
      color: theme.colors.coolGrey['1'],
      fontSize: 12,
      fontWeight: 'bold',
    },
    title: {
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphXS.fontSize,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      {hasRequests ? (
        <View>
          <LinearGradient
            colors={[notifyColor, '#000000']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[
              styles.gradientBorder,
              {
                width: size + borderWidth * 2,
                height: size + borderWidth * 2,
                borderRadius: (size + borderWidth * 2) / 2,
                marginTop: 32, // Added to match the non-gradient version
              },
            ]}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: activeColor,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                },
              ]}>
              <View style={[styles.badge, {backgroundColor: notifyColor}]}>
                <Text style={styles.badgeText}>
                  {count < 100 ? count : '99+'}
                </Text>
              </View>
              {IconComponent}
            </View>
          </LinearGradient>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <View>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: theme.colors.coolGrey['4'],
                width: size,
                height: size,
                borderRadius: size / 2,
                marginTop: 32,
              },
            ]}>
            {IconComponent}
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationBadge;
