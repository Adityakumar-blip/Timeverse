// theme.js

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const baseTheme = {
  // Typography
  typography: {
    h1: {fontSize: 36, lineHeight: 44},
    h2: {fontSize: 32, lineHeight: 40},
    h3: {fontSize: 28, lineHeight: 36},
    h4: {fontSize: 24, lineHeight: 32},
    h5: {fontSize: 20, lineHeight: 28},
    h6: {fontSize: 18, lineHeight: 24},
    paragraphL: {fontSize: 18, lineHeight: 28},
    paragraphM: {fontSize: 16, lineHeight: 24},
    paragraphS: {fontSize: 14, lineHeight: 22},
    paragraphXS: {fontSize: 12, lineHeight: 20},
  },

  // Font Weights
  fontWeights: {
    clashGrotesk: {
      regular: '440',
      medium: '500',
      semibold: '560',
      bold: '600',
    },
    supreme: {
      regular: '400',
      medium: '500',
      bold: '700',
      extrabold: '800',
    },
  },

  // Spacing
  spacing: {
    '1XXXS': 4,
    '2XXS': 8,
    '3XS': 10,
    '4S': 12,
    '5M': 16,
    '6B': 20,
    '7XB': 24,
    '8XXB': 28,
    '9XXXB': 32,
    '10L': 40,
    '11XL': 48,
    '12XXL': 56,
    '12XXXL': 64,
    '13XXXXL': 80,
    '14XH': 96,
    '15XXH': 128,
    '16XXXH': 160,
    '17XXXXH': 192,
  },

  // Border Radius
  borderRadius: {
    square: 0,
    s: 4,
    m: 8,
    l: 10,
    xL: 16,
    xXL: 24,
    xXXL: 32,
    rounded: 9000,
  },

  // Screen dimensions
  dimensions: {
    width,
    height,
  },
};

const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#0091ff',
    background: '#ffffff',
    text: '#000000',
    red: {
      1: '#fffcfc',
      2: '#fff8f8',
      3: '#ffefef',
      4: '#ffe5e5',
      5: '#fdd8d8',
      6: '#f9c6c6',
      7: '#f3aeaf',
      8: '#eb9091',
      9: '#e5484d',
      10: '#dc3d43',
      11: '#cd2b31',
      12: '#381316',
    },
    green: {
      1: '#fbfefc',
      2: '#f2fcf5',
      3: '#e9f9ee',
      4: '#ddf3e4',
      5: '#ccebd7',
      6: '#b4dfc4',
      7: '#92ceac',
      8: '#5bb98c',
      9: '#30a46c',
      10: '#299764',
      11: '#18794e',
      12: '#153226',
    },
    amber: {
      1: '#fefdfb',
      2: '#fff9ed',
      3: '#fff4d5',
      4: '#ffecbc',
      5: '#ffe3a2',
      6: '#ffd386',
      7: '#f3ba63',
      8: '#ee9d2b',
      9: '#ffb224',
      10: '#ffa01c',
      11: '#ad5700',
      12: '#4e2009',
    },
    blue: {
      1: '#fbfdff',
      2: '#f5faff',
      3: '#edf6ff',
      4: '#e1f0ff',
      5: '#cee7fe',
      6: '#b7d9f8',
      7: '#96c7f2',
      8: '#5eb0ef',
      9: '#0091ff',
      10: '#0081f1',
      11: '#006adc',
      12: '#00254d',
    },
    coolGrey: {
      1: '#f9f9fb',
      2: '#f3f4f7',
      3: '#edeef3',
      4: '#e7e9ef',
      5: '#dadee7',
      6: '#d0d4dd',
      7: '#b6bcce',
      8: '#9da6be',
      9: '#6c799d',
      10: '#49536e',
      11: '#394156',
      12: '#181c25',
    },
    overlay: {
      1: '#00000000',
      2: '#00000007',
      3: '#0000000c',
      4: '#00000011',
      5: '#00000016',
      6: '#0000001c',
      7: '#00000023',
      8: '#00000038',
      9: '#00000070',
      10: '#0000007a',
      11: '#0000008e',
      12: '#000000e8',
    },
  },
};

const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#0091ff',
    background: '#000000',
    text: '#ffffff',
    red: {
      1: '#1f1315',
      2: '#291415',
      3: '#3c181a',
      4: '#481a1d',
      5: '#541b1f',
      6: '#671e22',
      7: '#822025',
      8: '#aa2429',
      9: '#e5484d',
      10: '#f2555a',
      11: '#ff6369',
      12: '#feecee',
    },
    green: {
      1: '#fbfefc',
      2: '#0c1f17',
      3: '#0f291e',
      4: '#113123',
      5: '#133929',
      6: '#164430',
      7: '#1b543a',
      8: '#236e4a',
      9: '#30a46c',
      10: '#3cb179',
      11: '#4cc38a',
      12: '#e5fbeb',
    },
    amber: {
      1: '#1f1300',
      2: '#271700',
      3: '#341c00',
      4: '#3f2200',
      5: '#4a2900',
      6: '#573300',
      7: '#693f05',
      8: '#824e00',
      9: '#ffb224',
      10: '#ffcb47',
      11: '#f1a10d',
      12: '#fef3dd',
    },
    blue: {
      1: '#0f1720',
      2: '#0f1b2d',
      3: '#10243e',
      4: '#102a4c',
      5: '#0f3058',
      6: '#0d3868',
      7: '#0a4481',
      8: '#0954a5',
      9: '#0091ff',
      10: '#369eff',
      11: '#52a9ff',
      12: '#eaf6ff',
    },
    coolGrey: {
      1: '#040506',
      2: '#08090c',
      3: '#0c0e12',
      4: '#101218',
      5: '#181c25',
      6: '#22262f',
      7: '#313749',
      8: '#414a62',
      9: '#626f93',
      10: '#919ab6',
      11: '#a9b1c6',
      12: '#dadee7',
    },
    overlay: {
      1: '#ffffff00',
      2: '#ffffff07',
      3: '#ffffff0c',
      4: '#ffffff11',
      5: '#ffffff16',
      6: '#ffffff1c',
      7: '#ffffff23',
      8: '#ffffff38',
      9: '#ffffff70',
      10: '#ffffff7a',
      11: '#ffffff8e',
      12: '#ffffffe8',
    },
  },
};

export {lightTheme, darkTheme};