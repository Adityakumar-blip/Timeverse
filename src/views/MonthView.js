/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useTheme} from '../../utils/ThemeContext';

const CalendarComponent = ({onYearChange}) => {
  const {theme, isDarkMode} = useTheme();
  const [selected, setSelected] = React.useState('');
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date().toISOString().split('T')[0], // Set initial month dynamically
  );

  console.log('current year: ' + currentYear);

  const events = [
    {date: '2024-11-15', title: 'Meeting'},
    {date: '2024-02-20', title: 'Conference'},
  ];

  const tasks = [
    {date: '2024-09-10', title: 'Project deadline'},
    {date: '2024-11-21', title: 'Review report'},
  ];

  const renderCustomHeader = date => {
    // Convert month to 3-letter abbreviation
    const month = date.toString('MMM');
    const year = date.getFullYear();
    const textStyle = {
      fontSize: theme.typography.paragraphM.fontSize,
      paddingTop: theme.spacing['4S'],
      paddingBottom: theme.spacing['4S'],
      color: theme.colors.coolGrey['12'],
      paddingRight: theme.spacing['3XS'],
      fontFamily: theme.fontFamily.SUPB,
    };

    return (
      <View style={styles.header}>
        {/* <Text style={[styles.yearText, textStyle]}>{year}</Text> */}
        <Text style={[styles.monthText, textStyle]}>{month}</Text>
      </View>
    );
  };

  const onDayPress = day => {
    setSelected(day.dateString);
  };

  const handleVisibleMonthsChange = months => {
    if (months && months.length > 0) {
      const firstVisibleMonth = months[0];
      const yearFromVisibleMonth = firstVisibleMonth.year;

      // Update current month to the first visible month
      const newCurrentMonth = `${yearFromVisibleMonth}-${String(
        firstVisibleMonth.month,
      ).padStart(2, '0')}-01`;

      // Only update if the month has actually changed
      setCurrentMonth(newCurrentMonth);
      onYearChange(yearFromVisibleMonth);

      console.log('Current visible month:', newCurrentMonth);
    }
  };

  const calendarTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.coolGrey['2'],
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

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const renderDayNames = () => {
    return (
      <View
        style={[
          styles.dayNamesContainer,
          {
            paddingHorizontal: theme.spacing['3XS'],
          },
        ]}>
        {dayNames.map((day, index) => (
          <View key={index} style={styles.dayNameItem}>
            <Text
              style={[
                styles.dayNameText,
                {
                  color: theme.colors.coolGrey['10'],
                  fontFamily: theme.fontFamily.SUPL,
                  // fontWeight: '500',
                  fontSize: theme.typography.paragraphXS.fontSize,
                },
              ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const markedDates = {
    // Mark current date with white circular background
    [new Date().toISOString().split('T')[0]]: {
      today: true,
    },
    // Add selected date
    ...(selected
      ? {
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: theme.colors.primary,
            selectedTextColor: theme.colors.background,
          },
        }
      : {}),
  };

  // Add events and tasks dots
  if (events) {
    events.forEach(event => {
      markedDates[event.date] = {
        ...(markedDates[event.date] || {}),
        dots: [
          ...(markedDates[event.date]?.dots || []),
          {color: '#2AA248', key: 'event'},
        ],
      };
    });
  }

  if (tasks) {
    tasks.forEach(task => {
      markedDates[task.date] = {
        ...(markedDates[task.date] || {}),
        dots: [
          ...(markedDates[task.date]?.dots || []),
          {color: '#0091FF', key: 'task'},
        ],
      };
    });
  }

  const CustomDayComponent = ({date, state, marking, onPress}) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.dayContainer,
            {
              width: '200%',
              borderBottomWidth: 0.5,
              borderBottomColor: theme.colors.coolGrey['5'],
            },
          ]}>
          <Text
            style={[
              styles.dayText,
              state === 'disabled' ? {color: theme.colors.coolGrey[6]} : {},
              marking?.selected && {
                color: theme.colors.background,
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => onPress(date)}>
            {date.day}
          </Text>
          {marking?.dots && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 2,
              }}>
              {marking.dots.map((dot, index) => (
                <View
                  key={index}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 2.5,
                    backgroundColor: dot.color,
                    marginHorizontal: 1,
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      textAlign: 'left',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    yearText: {
      marginRight: 10,
    },
    monthText: {},
    dayNamesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,

      width: '100%',
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    dayNameItem: {
      flex: 1,
      alignItems: 'center',
    },
    dayNameText: {
      textAlign: 'center',
      width: '100%',
      paddingBottom: 10,
    },
    dayContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 10,
      paddingBottom: 10,
    },
    dayText: {
      textAlign: 'center',
      marginBottom: 10,
    },
  });

  const generateMinMaxDates = () => {
    const minDate = new Date(currentYear - 1, 11, 31);
    const maxDate = new Date(currentYear + 1, 11, 31)
      .toISOString()
      .split('T')[0];
    return {minDate, maxDate};
  };

  const {minDate, maxDate} = generateMinMaxDates();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.coolGrey['2']}]}>
      {renderDayNames()}
      <CalendarList
        // current={currentMonth}
        initialNumToRender={3} // Render only 3 months initially
        maxToRenderPerBatch={3} // Render 3 months per batch
        windowSize={5}
        minDate={minDate}
        maxDate={maxDate}
        markedDates={markedDates}
        dayComponent={CustomDayComponent}
        scrollEnabled={true}
        hideDayNames={true}
        updateCellsBatchingPeriod={50}
        showScrollIndicator={false}
        calendarWidth={Dimensions.get('window').width}
        calendarHeight={90}
        horizontal={false}
        pagingEnabled={false}
        onVisibleMonthsChange={handleVisibleMonthsChange}
        theme={{
          ...calendarTheme,
        }}
        onDayPress={onDayPress}
        renderHeader={renderCustomHeader}
        removeClippedSubviews={true}
        style={{
          backgroundColor: theme.colors.coolGrey['2'],
        }}
      />
    </SafeAreaView>
  );
};

export default CalendarComponent;
