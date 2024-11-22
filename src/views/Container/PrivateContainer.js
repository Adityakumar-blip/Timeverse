/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View} from 'react-native';
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
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="contact" component={ContactPage} />
      <HomeStack.Screen name="send-time" component={SendTime} />
    </HomeStack.Navigator>
  );
};

const CustomTabBarIcon = ({focused, iconName, size = 15}) => {
  const {theme, isDarkMode} = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: '100%',
      }}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -7,
            width: 20,
            height: 2,
            backgroundColor: isDarkMode ? '#fff' : '#000',
            borderRadius: 1,
          }}
        />
      )}
      <MaterialIcon
        name={iconName}
        size={size}
        color={focused ? '#fff' : theme.colors.coolGrey['11']}
      />
    </View>
  );
};

const PrivateContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000',
          height: 70,
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
              iconName="notifications-none"
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
            <CustomTabBarIcon
              focused={focused}
              iconName="work-outline"
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PrivateContainer;
