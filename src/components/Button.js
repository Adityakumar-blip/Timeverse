import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';

// Import your pattern images
import primaryPattern from '../assets/images/bg1.jpg';
import secondaryPattern from '../assets/images/bg2.jpg';
import outlinePattern from '../assets/images/bg1.jpg';
import disabledPattern from '../assets/images/bg1.jpg';

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

  const getBackgroundPattern = () => {
    if (disabled) return disabledPattern;
    switch (variant) {
      case 'secondary':
        return secondaryPattern;
      case 'outline':
        return outlinePattern;
      default:
        return primaryPattern;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.coolGrey[7];
    switch (variant) {
      case 'secondary':
      case 'outline':
        return theme.colors.primary;
      default:
        return theme.colors.background;
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
        <ImageBackground
          source={getBackgroundPattern()}
          style={[styles.backgroundImage, styles.borderRadius]}
          imageStyle={styles.borderRadius}
          resizeMode="cover">
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                ...theme.typography.paragraphM,
                fontWeight: theme.fontWeights.supreme.medium,
              },
              textStyle,
            ]}>
            {title}
          </Text>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRadius: {
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
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
