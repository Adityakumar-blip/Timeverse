import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const {width} = Dimensions.get('window');

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

const generateArray = (start, end) =>
  Array.from({length: end - start + 1}, (_, i) => start + i);

const WheelPicker = ({data, onValueChange, selectedValue, width = 100}) => {
  const scrollViewRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(
    data.indexOf(selectedValue),
  );

  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);

    if (index !== selectedIndex) {
      setSelectedIndex(index);
      onValueChange(data[index]);
    }
  };

  const scrollToIndex = index => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  // Pad the array to create scrolling effect
  const paddedData = [
    ...Array(Math.floor(VISIBLE_ITEMS / 2)).fill(''),
    ...data,
    ...Array(Math.floor(VISIBLE_ITEMS / 2)).fill(''),
  ];

  return (
    <View style={[styles.wheelContainer, {width}]}>
      <View style={styles.overlay} pointerEvents="none" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        {paddedData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.wheelItem,
              selectedIndex === index - Math.floor(VISIBLE_ITEMS / 2)
                ? styles.selectedItem
                : styles.normalItem,
            ]}>
            <Text
              style={[
                styles.wheelItemText,
                selectedIndex === index - Math.floor(VISIBLE_ITEMS / 2)
                  ? styles.selectedText
                  : styles.normalText,
              ]}>
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const TimePicker = () => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');

  const hourOptions = generateArray(1, 12);
  const minuteOptions = generateArray(0, 59).map(num =>
    num.toString().padStart(2, '0'),
  );
  const periodOptions = ['AM', 'PM'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>

      <View style={styles.pickerRow}>
        {/* Hours Picker */}
        <WheelPicker
          data={hourOptions}
          selectedValue={hours}
          onValueChange={setHours}
          width={80}
        />

        {/* Minutes Picker */}
        <WheelPicker
          data={minuteOptions}
          selectedValue={minutes.toString().padStart(2, '0')}
          onValueChange={val => setMinutes(parseInt(val, 10))}
          width={80}
        />

        {/* Period Picker */}
        <WheelPicker
          data={periodOptions}
          selectedValue={period}
          onValueChange={setPeriod}
          width={80}
        />
      </View>

      {/* Selected Time Display */}
      <Text style={styles.selectedTime}>
        Selected Time: {hours}:{minutes.toString().padStart(2, '0')} {period}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollViewContent: {
    paddingVertical: ITEM_HEIGHT * (VISIBLE_ITEMS / 2),
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  normalItem: {
    opacity: 0.3,
  },
  selectedItem: {
    opacity: 1,
  },
  wheelItemText: {
    fontSize: 24,
  },
  normalText: {
    color: '#999',
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectedTime: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default TimePicker;
