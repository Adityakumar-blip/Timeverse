import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');

  const renderCustomHeader = date => {
    const month = date.toString('MMMM');
    const year = date.getFullYear();
    const textStyle = {
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#5E60CE',
      paddingRight: 5,
    };

    return (
      <View style={styles.header}>
        <Text style={[styles.monthText, textStyle]}>{month}</Text>
        <Text style={[styles.yearText, textStyle]}>{year}</Text>
      </View>
    );
  };

  const onDayPress = day => {
    setSelected(day.dateString);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
        current={new Date().toISOString()}
        pastScrollRange={50}
        futureScrollRange={50}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#5E60CE',
            selectedTextColor: 'white',
          },
        }}
        scrollEnabled={true}
        showScrollIndicator={false}
        calendarWidth={Dimensions.get('window').width}
        calendarHeight={90}
        horizontal={false}
        pagingEnabled={false}
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#5E60CE',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#5E60CE',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#5E60CE',
          selectedDotColor: '#ffffff',
          arrowColor: '#5E60CE',
          monthTextColor: '#5E60CE',
          indicatorColor: '#5E60CE',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        onDayPress={onDayPress}
        // renderHeader={renderCustomHeader}
      />
    </SafeAreaView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: '#FFF'},
});
