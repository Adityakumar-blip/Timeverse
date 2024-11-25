/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {useTheme} from '../../utils/ThemeContext';

import PrimarySvg from '../assets/svg/Pattern.svg';
import SecondarySvg from '../assets/svg/SecondaryLight.svg';
import SecondaryDark from '../assets/svg/SecondaryDark.svg';
import PrimaryDark from '../assets/svg/PrimaryDark.svg';
import RadialGradient from 'react-native-radial-gradient';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const {theme, isDarkMode} = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;

  const getBackgroundColor = () => {
    if (disabled && variant === 'primary') return theme.colors.coolGrey['12'];
    switch (variant) {
      case 'secondary':
        return theme.colors.coolGrey[4];
      case 'tertiary':
        return isDarkMode ? '#000000' : '#FFFFFF';
      default:
        return theme.colors.coolGrey[12];
    }
  };

  const getSvgPattern = () => {
    // if (disabled) return <SecondarySvg style={styles.svg} />;
    switch (variant) {
      case 'secondary':
        return isDarkMode ? (
          <SecondaryDark style={styles.svg} />
        ) : (
          <SecondarySvg style={styles.svg} />
        );
      case 'outline':
        return <SecondarySvg style={styles.svg} />;
      default:
        return isDarkMode ? (
          <PrimaryDark style={styles.svg} />
        ) : (
          <PrimarySvg style={styles.svg} />
        );
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.coolGrey[7];
    switch (variant) {
      case 'secondary':
      case 'tertiary':
        return theme.colors.coolGrey[12];
      default:
        return theme.colors.coolGrey[1];
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {});
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{scale: animatedScale}],
        borderRadius: 19,
        overflow: 'hidden',
      }}>
      <RadialGradient
        colors={
          isPressed ? ['#313749', '#fff'] : ['transparent', 'transparent']
        }
        style={[styles.gradient, getButtonSize()]}
        stops={[0, 0.7, 1]}
        center={[100, 100]}
        radius={400}>
        <TouchableHighlight
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
          underlayColor={
            variant === 'primary'
              ? theme.colors.coolGrey[12]
              : variant === 'secondary'
              ? theme.colors.coolGrey[6]
              : theme.colors.coolGrey[3]
          }
          style={[
            styles.button,
            {
              backgroundColor: getBackgroundColor(),
              borderWidth: 0, // No border here as LinearGradient is used for border effect
            },
            style,
          ]}
          {...props}>
          <View style={styles.contentContainer}>
            {variant !== 'tertiary' && (
              <View style={styles.svgContainer}>{getSvgPattern()}</View>
            )}
            <Text
              style={[
                styles.text,
                {
                  color: getTextColor(),
                  ...theme.typography.paragraphM,
                  fontFamily: theme.fontFamily.SUP,
                },
                textStyle,
              ]}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
      </RadialGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  gradient: {
    borderRadius: 19,
    padding: 2,
  },
  smallButton: {
    height: 32,
    width: 100,
  },
  mediumButton: {
    height: 40,
    width: 150,
  },
  largeButton: {
    height: 70,
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  svg: {
    opacity: 0.7,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
  },
});

export default Button;
