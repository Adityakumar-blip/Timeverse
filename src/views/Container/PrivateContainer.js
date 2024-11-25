/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import HomePage from '../Screens/HomeScreen/HomePage';
import {useTheme} from '../../../utils/ThemeContext';
import MainView from '../MainView';
import VaultScreen from '../Screens/VaultScreen/VaultScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TimeScreen from '../Screens/VaultScreen/TimeScreen';
import ContactPage from '../Screens/HomeScreen/ContactPage';
import SendTime from '../Screens/HomeScreen/SendTime';

import HomeDarkFocused from '../../assets/svg/home-dark-selected.svg';
import HomeLightFocused from '../../assets/svg/home-light-selected.svg';
import HomeOutline from '../../assets/svg/home-outline.svg';
import CalendarDarkFocused from '../../assets/svg/calendar-dark.svg';
import CalendarLightFocused from '../../assets/svg/calendar-light.svg';
import BellLightFocused from '../../assets/svg/bell-light-focused.svg';
import BellDarkFocused from '../../assets/svg/bell-dark-focused.svg';
import WalletLightFocused from '../../assets/svg/wallet-light-focused.svg';
import WalletDarkFocused from '../../assets/svg/wallet-dark-focused.svg';
import CalendarOutline from '../../assets/svg/wallet-outline.svg';
import BellOutline from '../../assets/svg/bell-outline.svg';
import WalletOutline from '../../assets/svg/wallet-outline.svg';
// Placeholder screens - replace with your actual screens
const HomeScreen = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  />
);

const CalendarScreen = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  />
);

const AddScreen = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  />
);

const NotificationScreen = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  />
);

const Tab = createBottomTabNavigator();
const VaultStack = createStackNavigator();
const HomeStack = createStackNavigator();

const VaultStackNavigation = () => {
  return (
    <VaultStack.Navigator screenOptions={{headerShown: false}}>
      <VaultStack.Screen name="VaultMain" component={VaultScreen} />
      <VaultStack.Screen name="time-screen" component={TimeScreen} />
    </VaultStack.Navigator>
  );
};

const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator  screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="contact" component={ContactPage} />
      <HomeStack.Screen name="send-time" component={SendTime} />
    </HomeStack.Navigator>
  );
};

const CustomTabBarIcon = ({focused, iconName, size = 15}) => {
  const {theme, isDarkMode} = useTheme();

  const ICON_MAPPING = {
    home: {
      focused: {
        dark: HomeDarkFocused,
        light: HomeLightFocused,
      },
      default: HomeOutline,
    },
    'calendar-today': {
      focused: {
        dark: CalendarDarkFocused,
        light: CalendarLightFocused,
      },
      default: CalendarOutline,
    },
    notification: {
      focused: {
        dark: BellDarkFocused,
        light: BellLightFocused,
      },
      default: BellOutline,
    },
    wallet: {
      focused: {
        dark: WalletDarkFocused,
        light: WalletLightFocused,
      },
      default: WalletOutline,
    },
  };

  const renderIcon = () => {
    const iconConfig = ICON_MAPPING[iconName];

    if (iconConfig) {
      if (focused) {
        const FocusedIcon = iconConfig.focused[isDarkMode ? 'dark' : 'light'];
        if (FocusedIcon) {
          return <FocusedIcon />;
        }
      } else if (iconConfig.default) {
        const DefaultIcon = iconConfig.default;
        return <DefaultIcon />;
      }
    }

    return (
      <MaterialIcon
        name={iconName}
        size={size}
        color={focused ? '#fff' : theme.colors.coolGrey['11']}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: '100%',
    },
    focusedLine: {
      position: 'absolute',
      top: -7,
      width: '100%',
      height: 10,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      borderRadius: 1,
    },
    gradientContainer: {
      position: 'absolute',
      top: -3, // Align with the focused line
      bottom: 0,
      width: '100%',
    },
    gradient: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: 60,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      {focused ? (
        <>
          <View style={styles.focusedLine} />
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={
                isDarkMode ? ['#0f1115', '#0b0a0e'] : ['#E8EBF1', '#ffffff']
              }
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View style={styles.iconContainer}>{renderIcon()}</View>
            </LinearGradient>
          </View>
        </>
      ) : (
        renderIcon()
      )}
    </View>
  );
};

const PrivateContainer = () => {
  const {isDarkMode} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} iconName="home" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={MainView}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              focused={focused}
              iconName="calendar-today"
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              focused={focused}
              iconName="add-circle"
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon
              focused={focused}
              iconName="notification"
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bag"
        component={VaultStackNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomTabBarIcon focused={focused} iconName="wallet" size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PrivateContainer;
