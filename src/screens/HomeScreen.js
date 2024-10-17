import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import MainView from '../views/MainView';
import ComponentView from '../views/ComponentView';
import {useTheme} from '../../utils/ThemeContext';

export default function HomeScreen({navigation}) {
  const {theme, toggleTheme, isDarkMode} = useTheme(); // Get isDarkMode from ThemeContext

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  // Use theme dynamically in styles
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.coolGrey[1],
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: theme.colors.textPrimary,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontSize: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginTop: 0,
    },
    backButton: {
      padding: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    iconButton: {
      padding: 10,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={dynamicStyles.backButton}>
        </TouchableOpacity> */}
        <Text style={{color: 'white'}}>Back</Text>
        <Text style={dynamicStyles.headerTitle}>MainView</Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={dynamicStyles.iconButton}>
          <Icon
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ComponentView />
    </View>
  );
}
