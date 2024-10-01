import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainView from '../views/MainView';
import ComponentView from '../views/ComponentView';
import {useTheme} from '../../utils/ThemeContext';

export default function HomeScreen({navigation}) {
  const {theme, toggleTheme} = useTheme(); // Get theme and toggleTheme from ThemeContext

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  // Use theme dynamically in styles
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.coolGrey[1], // Use theme-based color
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: theme.colors.textPrimary, // Dynamic text color based on theme
    },
    button: {
      backgroundColor: theme.colors.primary, // Use theme-based button color
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.buttonText, // Dynamic button text color
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
    },
    iconButton: {
      padding: 10,
      color: 'white',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={dynamicStyles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>MainView</Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={dynamicStyles.iconButton}>
          <Text style={{color: 'white'}}>+</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Toggle Theme" /> */}
      {/* Render your MainView or ComponentView */}
      {/* <MainView /> */}
      <ComponentView />
    </View>
  );
}
