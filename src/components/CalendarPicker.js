import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';

const CalendarPicker = ({
  isVisible,
  onClose,
  onDateSelect,
  selectedDate = new Date(),
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState(selectedDate);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <Text style={styles.headerButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <Text style={styles.headerButton}>→</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={styles.daysRow}>
        {days.map(day => (
          <Text key={day} style={styles.dayHeader}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({start: monthStart, end: monthEnd});

    const rows = [];
    let row = [];

    // Add empty cells for days before the first of the month
    const firstDayOfWeek = monthStart.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      row.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    days.forEach(day => {
      row.push(
        <TouchableOpacity
          key={day.toString()}
          style={[
            styles.dayCell,
            isSameDay(day, selected) && styles.selectedDay,
          ]}
          onPress={() => {
            setSelected(day);
            onDateSelect(day);
          }}>
          <Text
            style={[
              styles.dayText,
              isSameDay(day, selected) && styles.selectedDayText,
            ]}>
            {format(day, 'd')}
          </Text>
        </TouchableOpacity>,
      );

      if (row.length === 7) {
        rows.push(
          <View key={day.toString()} style={styles.week}>
            {row}
          </View>,
        );
        row = [];
      }
    });

    if (row.length > 0) {
      rows.push(
        <View key="lastRow" style={styles.week}>
          {row}
        </View>,
      );
    }

    return rows;
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.calendar}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onDateSelect(selected);
                onClose();
              }}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    fontSize: 24,
    color: '#666',
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayHeader: {
    color: '#666',
    fontSize: 12,
    width: 36,
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayCell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: '#fff',
  },
  selectedDayText: {
    color: '#000',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CalendarPicker;
