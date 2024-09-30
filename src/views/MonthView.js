import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useTheme} from '../../utils/ThemeContext'; // Make sure to import the useTheme hook

const CalendarComponent = () => {
  const {theme, isDarkMode} = useTheme(); // Use the global theme
  const [selected, setSelected] = React.useState('');

  const renderCustomHeader = date => {
    const month = date.toString('MMMM');
    const year = date.getFullYear();
    const textStyle = {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.fontWeights.supreme.bold,
      paddingTop: theme.spacing['4S'],
      paddingBottom: theme.spacing['4S'],
      color: theme.colors.primary,
      paddingRight: theme.spacing['3XS'],
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

  const calendarTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    textSectionTitleColor: theme.colors.coolGrey[7],
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.background,
    todayTextColor: theme.colors.primary,
    dayTextColor: isDarkMode
      ? theme.colors.coolGrey[11]
      : theme.colors.coolGrey[10],
    textDisabledColor: theme.colors.coolGrey[6],
    dotColor: theme.colors.primary,
    selectedDotColor: theme.colors.background,
    arrowColor: theme.colors.primary,
    monthTextColor: theme.colors.primary,
    indicatorColor: theme.colors.primary,
    textDayFontWeight: theme.fontWeights.supreme.regular,
    textMonthFontWeight: theme.fontWeights.supreme.bold,
    textDayHeaderFontWeight: theme.fontWeights.supreme.regular,
    textDayFontSize: theme.typography.paragraphM.fontSize,
    textMonthFontSize: theme.typography.h5.fontSize,
    textDayHeaderFontSize: theme.typography.paragraphS.fontSize,
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CalendarList
        current={new Date().toISOString()}
        pastScrollRange={50}
        futureScrollRange={50}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: theme.colors.primary,
            selectedTextColor: theme.colors.background,
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
        theme={calendarTheme}
        onDayPress={onDayPress}
        renderHeader={renderCustomHeader}
        removeClippedSubviews={true}
        windowSize={3}
      />
    </SafeAreaView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    marginRight: 5,
  },
  yearText: {},
});
