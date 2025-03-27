import React, {useState} from 'react';
import Chip from '../../../components/Chips';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../../../utils/ThemeContext';
import CustomToggleRow from '../../../components/CustomToggleRow';
import {PlusIcon} from 'lucide-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CalendarPicker from '../../../components/CalendarPicker';

const IncreMentComponent = ({handleIncrement, handleDecrement, unit}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    iconContainer: {
      backgroundColor: theme.colors.coolGrey['4'],
      borderRadius: 100,
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Text>{unit}</Text>
      <TouchableOpacity
        onPress={() => handleDecrement()}
        style={styles.iconContainer}>
        <Icon name="minus" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIncrement()}
        style={styles.iconContainer}>
        <Icon name="plus" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const RepeatView = () => {
  const {theme, isDarkMode} = useTheme();
  const [activeChip, setActiveChip] = useState('Daily');
  const [value, setValue] = useState(2);
  const [unit, setUnit] = useState('days');
  const [activeOption, setActiveOption] = useState('never');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // New state for selected weekdays
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const formatDate = date => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const unitValues = ['days', 'weeks', 'months', 'years'];

  const handleOptionSelect = option => {
    setActiveOption(option);
  };

  const handleIncrement = () => {
    setValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setValue(prev => (prev > 1 ? prev - 1 : 1));
  };

  const formatNumber = num => {
    return num.toString().padStart(2, '0');
  };

  const options = [
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly',
    'Workdays',
    'Weekends',
  ];

  const repeatOptions = [
    {title: 'Never End', value: 'never', icon: 'refresh'},
    {title: 'Add End Date', value: 'date', icon: 'calendar'},
    {title: 'Add Count', value: 'count', icon: 'math'},
  ];

  const weekDays = [
    {title: 'M', value: 'Mon'},
    {title: 'T', value: 'Tue'},
    {title: 'W', value: 'Wed'},
    {title: 'T', value: 'Thu'},
    {title: 'F', value: 'Fri'},
    {title: 'S', value: 'Sat'},
    {title: 'S', value: 'Sun'},
  ];

  // New function to handle weekday selection
  const handleWeekdaySelect = value => {
    setSelectedWeekdays(prev => {
      if (prev.includes(value)) {
        return prev.filter(day => day !== value);
      }
      return [...prev, value];
    });
  };

  const handleChipPress = option => {
    setActiveChip(option);

    // Handle weekday selection based on option
    switch (option) {
      case 'Weekly':
        setSelectedWeekdays([]);
        break;
      case 'Workdays':
        setSelectedWeekdays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
        break;
      case 'Weekends':
        setSelectedWeekdays(['Sat', 'Sun']);
        break;
      case 'Monthly':
        setUnit('Monthly');
      case 'Yearly':
        setUnit('Yearly');
      default:
        setSelectedWeekdays([]);
    }
  };

  const styles = StyleSheet.create({
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      paddingVertical: 10,
    },
    scaleTitle: {
      fontFamily: theme.fontFamily.SUPM,
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    repeatString: {
      fontFamily: theme.fontFamily.SUPM,
      color: theme.colors.coolGrey['10'],
      fontSize: 12,
    },
  });

  return (
    <View>
      <View>
        <Text style={styles.scaleTitle}>Scale</Text>
        <View style={styles.chipContainer}>
          {options.map(option => (
            <Chip
              key={option}
              label={option}
              onPress={() => handleChipPress(option)}
              shape="full"
              variant={activeChip === option ? 'active' : 'default'}
            />
          ))}
        </View>
        {activeChip === 'Daily' ? (
          <View>
            {/* <Text style={styles.scaleTitle}>Every (frequency)</Text>
            <CustomToggleRow
              label={formatNumber(value)}
              endComponent={
                <IncreMentComponent
                  unit={unit}
                  handleDecrement={() => handleDecrement()}
                  handleIncrement={() => handleIncrement()}
                />
              }
            /> */}
          </View>
        ) : ['Yearly', 'Monthly'].includes(activeChip) ? (
          <View>
            <Text style={styles.scaleTitle}>Repeat on</Text>
            <CustomToggleRow
              label={formatNumber(value)}
              endComponent={
                <IncreMentComponent
                  unit={unit}
                  handleDecrement={() => handleDecrement()}
                  handleIncrement={() => handleIncrement()}
                />
              }
            />
          </View>
        ) : ['Weekly', 'Workdays', 'Weekends'].includes(activeChip) ? (
          <View>
            <Text style={styles.scaleTitle}>Scale</Text>
            <View style={styles.chipContainer}>
              {weekDays.map(option => (
                <Chip
                  key={option.title}
                  label={option.title}
                  onPress={() => handleWeekdaySelect(option.value)}
                  shape="full"
                  variant={
                    selectedWeekdays.includes(option.value)
                      ? 'active'
                      : 'default'
                  }
                />
              ))}
            </View>
          </View>
        ) : null}

        <View>
          <Text style={styles.scaleTitle}>Every (frequency)</Text>
          <CustomToggleRow
            label={formatNumber(value)}
            endComponent={
              <IncreMentComponent
                unit={unit}
                handleDecrement={() => handleDecrement()}
                handleIncrement={() => handleIncrement()}
              />
            }
          />
        </View>

        {/* Rest of the component remains the same */}
        <View>
          <Text style={styles.scaleTitle}>End Repeat</Text>
          <View style={styles.chipContainer}>
            {repeatOptions.map(option => (
              <Chip
                key={option.title}
                label={option.title}
                onPress={() => handleOptionSelect(option.value)}
                shape="full"
                leadingIcon={option.icon}
                variant={activeOption === option.value ? 'active' : 'default'}
              />
            ))}
          </View>
        </View>
        <View style={{paddingBottom: 40}}>
          {activeOption === 'date' ? (
            <View>
              <Text style={styles.scaleTitle}>Repeat end date</Text>
              <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                <CustomToggleRow
                  label={
                    selectedDate ? formatDate(selectedDate) : 'Pick Date & Time'
                  }
                  endComponent={<Icon name="calendar" size={20} />}
                />
              </TouchableOpacity>
              <Text style={styles.repeatString}>
                Repeating will be off at "{formatDate(selectedDate)}"
              </Text>
            </View>
          ) : (
            activeOption === 'count' && (
              <View>
                <Text style={styles.scaleTitle}>Repeat count</Text>
                <CustomToggleRow
                  label={formatNumber(value)}
                  endComponent={
                    <IncreMentComponent
                      unit={unit}
                      handleDecrement={() => handleDecrement()}
                      handleIncrement={() => handleIncrement()}
                    />
                  }
                />
                <Text style={styles.repeatString}>
                  Event will repeat for {formatNumber(value)} times
                </Text>
              </View>
            )
          )}
        </View>
        <CalendarPicker
          isVisible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </View>
    </View>
  );
};

export default RepeatView;
