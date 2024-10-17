/* eslint-disable curly */
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
import {useTheme} from '../../utils/ThemeContext';

// Import your SVG strings
import PrimarySvg from '../assets/svg/Pattern.svg';
import SecondarySvg from '../assets/svg/Vector.svg';
import SecondaryLight from '../assets/svg/Vector-light.svg';
import PrimaryDark from '../assets/svg/Dark-Prime.svg';

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
    if (disabled) return theme.colors.coolGrey[3];
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
    if (disabled) return <SecondarySvg style={styles.svg} />;
    switch (variant) {
      case 'secondary':
        return isDarkMode ? (
          <SecondarySvg style={styles.svg} />
        ) : (
          <SecondarySvg style={styles.svg} />
        );
      case 'outline':
        return <SecondarySvg style={styles.svg} />;
      default:
        return isDarkMode ? (
          <PrimarySvg style={styles.svg} />
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

  const getBorderColor = () => {
    if (disabled) return theme.colors.coolGrey[5];
    return variant === 'tertiary' ? theme.colors.coolGrey[4] : 'transparent';
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
      borderRadius: 16, //16px
      // borderWidth: 1,
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
      height: 60,
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
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center', // Vertically center the content
      justifyContent: 'center', // Horizontally center the content
      width: '100%', // Ensures the content takes full button width
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
    <Animated.View
      style={{
        transform: [{scale: animatedScale}],
      }}>
      <Animated.View
        style={{
          transform: [{scale: animatedScale}],
        }}>
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
          } // Custom fade color
          style={[
            styles.button,
            getButtonSize(),
            {
              backgroundColor: getBackgroundColor(),
              borderColor: getBorderColor(),
              borderWidth: variant === 'tertiary' ? 1 : 0,
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
      </Animated.View>
    </Animated.View>
  );
};

export default Button;
