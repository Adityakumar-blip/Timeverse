import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';
import PatternImage from '../assets/svg/SecondaryDark.svg';
import PrimaryDark from '../assets/svg/PrimaryDark.svg';
import PrimarySvg from '../assets/svg/Pattern.svg';
import EventDark1 from '../assets/svg/EventDark1.svg';

const eventDarkBackgroundColors = [
  {
    type: 'team',
    bg: '#541b33',
    stroke: '#e93d82',
  },
  {
    bg: '#32275f',
    stroke: '#6e56cf',
    type: 'client',
  },
  {
    bg: '#432155',
    stroke: '#8e4ec6',
    type: 'project',
  },
  {bg: '#3e2c22', stroke: '#ad758b', type: 'proposal'},
  {
    bg: '#4a2900',
    stroke: '#ffb224',
    type: 'one-on-one',
  },
  {
    bg: '#133929',
    stroke: '#30a46c',
    type: 'type2',
  },
  {
    bg: '#0f3058',
    stroke: '#3e63dd',
    type: 'type3',
  },
];

const EventItem = ({event, styles}) => {
  const {theme, isDarkMode} = useTheme();

  const eventColorConfig =
    eventDarkBackgroundColors.find(config => config.type === event.type) ||
    eventDarkBackgroundColors[0];

  const getSvgPattern = () => {
    return isDarkMode ? (
      <PrimaryDark style={localStyles.svg} />
    ) : (
      <PrimarySvg style={localStyles.svg} />
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

  const localStyles = StyleSheet.create({
    event: {
      position: 'absolute',
      left: 0,
      right: 0,
      padding: 0,
      backgroundColor: eventColorConfig.bg,
      margin: 0.5,
      width: '100%',
      borderLeftWidth: 3,
      borderLeftColor: eventColorConfig.stroke,
    },
    eventText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    eventTime: {
      fontSize: 10,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    svgContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1,
      overflow: 'hidden',
    },
    svg: {
      resizeMode: 'contain',
    },
  });

  return (
    <TouchableOpacity
      onPress={() => alert(event.title)}
      style={[
        localStyles.event,
        {
          top: getEventTopPosition(event.start),
          height: getEventHeight(event.start, event.end),
          width: '100%',
          left: 0,
          right: 0,
        },
      ]}>
      <View style={localStyles.contentContainer}>
        <View style={localStyles.svgContainer}>
          <PatternImage style={localStyles.svg} />
        </View>
        <Text style={styles.eventText}>{event.title}</Text>
        <Text style={styles.eventTime}>{`${event.start} - ${event.end}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
