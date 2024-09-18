// theme.js
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Colors
const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C7C7CC',
  error: '#FF3B30',
  success: '#4CD964',
  warning: '#FF9500',
};

// Typography
const typography = {
  fontFamily: {
    regular: 'System',
    bold: 'System-Bold',
    italic: 'System-Italic',
  },
  fontSize: {
    tiny: 10,
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 20,
    huge: 24,
  },
  lineHeight: {
    tiny: 14,
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 28,
    xxlarge: 32,
    huge: 38,
  },
};

// Spacing
const spacing = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

// Border Radius
const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  round: 9999,
};

// Shadows
const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
};

// Layout
const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

// Common styles
const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  commonStyles,
};

export default theme;
