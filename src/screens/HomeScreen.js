import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WeekCalendar} from 'react-native-calendars';
import AgendaScreen from '../views/WeekView';
import CalendarComponent from '../views/MonthView';
import MainView from '../views/MainView';

export default function HomeScreen({navigation}) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <View>
        {/* <WeekCalendar /> */}
        {/* <AgendaScreen /> */}
        <MainView />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
});
