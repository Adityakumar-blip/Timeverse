/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated, View} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';

// Import your SVG strings
import PrimarySvg from '../assets/svg/Pattern.svg';
import SecondarySvg from '../assets/svg/Vector.svg';

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
  const {theme} = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.coolGrey[3];
    switch (variant) {
      case 'secondary':
        return theme.colors.coolGrey[4];
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.coolGrey[12];
    }
  };

  const getSvgPattern = () => {
    if (disabled) return <SecondarySvg style={styles.svg} />;
    switch (variant) {
      case 'secondary':
        return <SecondarySvg style={styles.svg} />;
      case 'outline':
        return <SecondarySvg style={styles.svg} />;
      default:
        return <PrimarySvg style={styles.svg} />;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.coolGrey[7];
    switch (variant) {
      case 'secondary':
      case 'outline':
        return theme.colors.coolGrey[12];
      default:
        return theme.colors.coolGrey[1];
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.coolGrey[5];
    return variant === 'outline' ? theme.colors.primary : 'transparent';
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
    }).start();
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const styles = StyleSheet.create({
    button: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    smallButton: {
      height: 32,
      paddingHorizontal: 12,
    },
    mediumButton: {
      height: 40,
      paddingHorizontal: 16,
    },
    largeButton: {
      height: 52,
      paddingHorizontal: 20,
    },
    animatedContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    svgContainer: {
      // ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    svg: {
      opacity: 0.5,
      resizeMode: 'contain',
    },
    text: {
      textAlign: 'center',
      position: 'absolute',
    },
  });

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.button,
        getButtonSize(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
      {...props}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {transform: [{scale: animatedScale}]},
        ]}>
        <View style={styles.svgContainer}>{getSvgPattern()}</View>
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              ...theme.typography.paragraphM,
              // fontWeight: theme.fontWeights.supreme.bold,
              fontFamily: theme.fontFamily.SUP,
            },
          ]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Button;
