/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../utils/ThemeContext';
import EventItem from '../components/EventItem';

const {width} = Dimensions.get('window');
const WEEK_WIDTH = width;

const AgendaScreen = ({viewType, onDateChange, navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    day: '',
  });

  const flatListRef = useRef(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1000);

  useEffect(() => {
    loadEvents(selectedDate);
  }, [selectedDate]);

  const loadEvents = date => {
    const startOfWeek = date.clone().startOf('week');
    const endOfWeek = date.clone().endOf('week');
    const newEvents = {};
    const today = moment().format('YYYY-MM-DD');
    const nov26 = moment().date(26).format('YYYY-MM-DD');

    // Add sample events for today
    newEvents[today] = [
      {
        title: 'Morning Meeting',
        start: '09:00',
        end: '10:30',
        type: 'team',
      },
      {
        title: 'Lunch with Team',
        start: '12:00',
        end: '13:00',
        type: 'client',
      },
      {
        title: 'Project Review',
        start: '14:30',
        end: '16:00',
        type: 'project',
      },
      {
        title: 'Client Call',
        start: '16:30',
        end: '17:30',
        type: 'type2',
      },
    ];

    // Add sample events for November 26th
    newEvents[nov26] = [
      {
        title: 'Weekly Planning',
        start: '10:00',
        end: '11:30',
      },
      {
        title: 'Team Workshop',
        start: '13:30',
        end: '15:00',
      },
      {
        title: 'Product Demo',
        start: '15:30',
        end: '16:30',
      },
    ];

    // Fill in other days of the week with empty arrays or minimal events
    for (
      let m = moment(startOfWeek);
      m.isSameOrBefore(endOfWeek);
      m.add(1, 'days')
    ) {
      const day = m.format('YYYY-MM-DD');
      if (!newEvents[day]) {
        newEvents[day] = [];
      }
    }

    setEvents(newEvents);
  };

  // const renderTimeSlots = () => {
  //   return (
  //     <View style={styles.timeColumn}>
  //       {Array.from({length: 24}).map((_, index) => (
  //         <View key={index} style={styles.timeSlot}>
  //           <Text style={styles.timeSlotText}>{`${index
  //             .toString()
  //             .padStart(2, '0')}:00`}</Text>
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };

  const renderTimeSlots = () => {
    return (
      <>
        <View style={styles.timeColumn}>
          {Array.from({length: 24}).map((_, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{`${index
                .toString()
                .padStart(2, '0')}:00`}</Text>
            </View>
          ))}
        </View>
        {/* Render horizontal lines */}
        {Array.from({length: 24}).map(
          (_, index) =>
            index !== 0 && (
              <View
                key={`line-${index}`}
                style={[
                  styles.timeSlotHorizontalLine,
                  {
                    top: index * 60, // Position based on timeSlot height
                    left: 50, // Align with the day columns, starting after time column
                    width: '100%', // Span across all day columns
                  },
                ]}
              />
            ),
        )}
      </>
    );
  };

  const getDates = index => {
    const startDate = moment()
      .startOf('week')
      .add((index - 1000) * viewType, 'days');
    const dates = [];
    for (let i = 0; i < viewType; i++) {
      dates.push(startDate.clone().add(i, 'days'));
    }
    return dates;
  };

  const renderView = useCallback(
    ({item: index}) => {
      const dates = getDates(index);
      return (
        <View style={[styles.weekContainer, {width: WEEK_WIDTH}]}>
          <View style={styles.datesRow}>
            {dates.map(date => renderDateColumn(date))}
          </View>
          <ScrollView style={styles.timeGridScrollView}>
            <View style={styles.timeGridContainer}>
              {renderTimeSlots()}
              {renderDayColumns(dates.map(date => date.format('YYYY-MM-DD')))}
            </View>
          </ScrollView>
        </View>
      );
    },
    [events, selectedDate, viewType],
  );

  const renderDateColumn = date => {
    const isToday = date.isSame(moment(), 'day');
    const isSelected = date.isSame(selectedDate, 'day');
    const hasEvents = events[date.format('YYYY-MM-DD')]?.length > 0;

    return (
      <TouchableOpacity
        key={date.format('YYYY-MM-DD')}
        style={[styles.dateColumn, {width: `${100 / viewType}%`}]}
        onPress={() => setSelectedDate(date)}>
        <Text style={styles.dayName}>
          {date.format('ddd')[0].toUpperCase()}
        </Text>
        <View
          style={
            isSelected
              ? styles.selectedDate
              : {justifyContent: 'center', alignItems: 'center'}
          }>
          <Text
            style={[
              styles.dayDate,
              isSelected && {color: isDarkMode ? '#000' : '#fff'},
            ]}>
            {date.format('D')}
          </Text>
        </View>
        {hasEvents && (
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#007AFF',
              marginTop: isSelected ? 10 : 20,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderDayColumns = days => {
    return (
      <View style={styles.dayColumnsContainer}>
        {/* Background columns for visual separation */}
        {days.map(day => (
          <View
            key={day}
            style={[styles.dayColumn, {width: `${100 / viewType}%`}]}
          />
        ))}

        {/* Events container that spans full width */}
        <View style={styles.fullWidthEventsContainer}>
          {events[selectedDate.format('YYYY-MM-DD')]?.map((event, index) => (
            // <TouchableOpacity
            //   key={index}
            //   style={[
            //     styles.event,
            //     {
            //       top: getEventTopPosition(event.start),
            //       height: getEventHeight(event.start, event.end),
            //       width: '100%', // Make events span full width
            //       left: 0,
            //       right: 0,
            //     },
            //   ]}
            //   onPress={() => Alert.alert(event.title)}>
            //   <Text style={styles.eventText}>{event.title}</Text>
            //   <Text style={styles.eventTime}>
            //     {`${event.start} - ${event.end}`}
            //   </Text>
            // </TouchableOpacity>
            <EventItem event={event} styles={styles} />
          ))}
        </View>
      </View>
    );
  };
  const getEventTopPosition = start => {
    const [hours, minutes] = start.split(':').map(Number);
    return (hours * 60 + minutes) * (styles.timeSlot.height / 60);
  };

  const getEventHeight = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    const durationInMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    return durationInMinutes * (styles.timeSlot.height / 60);
  };

  const addEvent = () => {
    const updatedEvents = {...events};
    if (!updatedEvents[newEvent.day]) {
      updatedEvents[newEvent.day] = [];
    }
    updatedEvents[newEvent.day].push({
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
    });
    setEvents(updatedEvents);
    setModalVisible(false);
    setNewEvent({title: '', start: '', end: '', day: ''});
  };
  const [currentIndex, setCurrentIndex] = useState(1000);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
        const newDate = moment().add(
          (viewableItems[0].index - 1000) * viewType,
          'days',
        );
        setSelectedDate(newDate);
        setCurrentMonth(newDate.format('MMMM YYYY'));
      }
    },
    [viewType],
  );

  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
  const [currentMonth, setCurrentMonth] = useState(
    moment().format('MMMM YYYY'),
  );
  const [calendarVisible, setCalendarVisible] = useState(false);

  const renderMonthDisplay = () => {
    return (
      <TouchableOpacity
        style={styles.monthDisplay}
        onPress={() => setCalendarVisible(!calendarVisible)}>
        <Text style={styles.monthDisplayText}>{currentMonth}</Text>
      </TouchableOpacity>
    );
  };

  const renderCalendar = () => {
    return (
      <View>
        <Calendar
          current={selectedDate.format('YYYY-MM-DD')}
          onDayPress={day => {
            const newDate = moment(day.dateString);
            setSelectedDate(newDate);
            setCurrentMonth(newDate.format('MMMM YYYY'));
            const dayIndex =
              Math.floor(
                newDate.diff(moment().startOf('week'), 'days') / viewType,
              ) + 1000;
            flatListRef.current.scrollToIndex({
              index: dayIndex,
              animated: true,
            });
          }}
          markedDates={{
            [selectedDate.format('YYYY-MM-DD')]: {
              selected: true,
              selectedColor: 'blue',
            },
          }}
        />
        <TouchableOpacity
          style={styles.closeCalendarButton}
          onPress={() => setCalendarVisible(false)}>
          <Text style={styles.closeCalendarButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const changeViewType = newViewType => {
  //   setViewType(newViewType);
  //   const newIndex =
  //     Math.floor(((currentIndex - 1000) * viewType) / newViewType) + 1000;
  //   setCurrentIndex(newIndex);
  //   flatListRef.current.scrollToIndex({index: newIndex, animated: false});
  // };
  const styles = StyleSheet.create({
    fullWidthEventsContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 24 * 60,
      zIndex: 2,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    weekContainer: {
      width: WEEK_WIDTH,
    },
    datesRow: {
      flexDirection: 'row',
      // paddingLeft: 50,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    timeSlotHorizontalLine: {
      position: 'absolute',
      height: 1,
      backgroundColor: theme.colors.coolGrey['5'],
      zIndex: 1,
    },

    dateColumn: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    todayColumn: {
      backgroundColor: '#e6f3ff',
    },
    selectedColumn: {
      backgroundColor: '#b3d9ff',
    },
    dayName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.colors.coolGrey['10'],
    },
    selectedDate: {
      backgroundColor: theme.colors.coolGrey['12'],
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    dayDate: {
      fontSize: theme.typography.paragraphM.fontSize,
      color: theme.colors.coolGrey['12'],
      fontFamily: theme.fontFamily.SUPM,
    },
    timeGridContainer: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: theme.colors.coolGrey['3'],
    },
    timeColumn: {
      width: 50,
      borderRightWidth: 1,
      borderRightColor: theme.colors.coolGrey['5'],
    },
    dayColumnsContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'relative', // Add this to allow absolute positioning of events container
    },
    dayColumn: {
      flex: 1,
      // borderLeftWidth: 1,
      // borderLeftColor: '#eee',
    },
    timeSlot: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.coolGrey['5'],
    },
    timeSlotText: {
      fontSize: 12,
      color: '#888',
    },
    eventsContainer: {
      position: 'relative',
      height: 24 * 60,
    },

    addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
      backgroundColor: 'indigo',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    monthDisplay: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      alignItems: 'center',
    },
    monthDisplayText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    calendarModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarModalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '90%',
    },
    closeCalendarButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'indigo',
      borderRadius: 5,
      alignItems: 'center',
    },
    closeCalendarButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    addButtonText: {
      color: 'white',
      fontSize: 30,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    addEventButton: {
      backgroundColor: 'indigo',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    addEventButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    viewTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    viewTypeButton: {
      padding: 10,
      backgroundColor: 'indigo',
      borderRadius: 5,
    },
    viewTypeText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  useEffect(() => {
    onDateChange(selectedDate.format('ddd D MMM YYYY'));
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* {renderMonthDisplay()} */}

        {calendarVisible && renderCalendar()}

        <FlatList
          ref={flatListRef}
          data={Array.from({length: 2000}, (_, i) => i)}
          renderItem={renderView}
          keyExtractor={item => item.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={1000}
          getItemLayout={(data, index) => ({
            length: WEEK_WIDTH,
            offset: WEEK_WIDTH * index,
            index,
          })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('add-event')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={newEvent.title}
                onChangeText={text => setNewEvent({...newEvent, title: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Day (YYYY-MM-DD)"
                value={newEvent.day}
                onChangeText={text => setNewEvent({...newEvent, day: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Start Time (HH:MM)"
                value={newEvent.start}
                onChangeText={text => setNewEvent({...newEvent, start: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="End Time (HH:MM)"
                value={newEvent.end}
                onChangeText={text => setNewEvent({...newEvent, end: text})}
              />
              <TouchableOpacity
                style={styles.addEventButton}
                onPress={addEvent}>
                <Text style={styles.addEventButtonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AgendaScreen;
