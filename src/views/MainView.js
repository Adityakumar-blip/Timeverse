import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ViewModal from './ViewModal';
import AgendaScreen from './WeekView';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarComponent from './MonthView';

import Carousel from '../assets/svg/Carousel.svg';
import {useTheme} from '../../utils/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '../components/BottomSheet';
// import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const MainView = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  // const bottomSheet = useBottomSheet();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(7);
  const [selectedView, setSelectedView] = useState(7);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const openModal = () => {
    console.log('heree');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //   console.log(isModalVisible);

  const onHandleChange = type => {
    console.log('type', type);
    if (type === 'Week') {
      setSelectedType(7);
    } else if (type === 'Monthly') {
      setSelectedType(1);
    } else if (type === '5 Days') {
      setSelectedType(5);
    } else {
      setSelectedType(3);
    }
  };

  const getYear = year => {
    setCurrentYear(year);
  };

  const getDate = date => {
    setCurrentYear(date);
  };

  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback(() => {
    console.log('handleSheetChanges', index);
  }, []);

  const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: isDarkMode ? 'black' : 'white',
      marginTop: 0,
      paddingTop: 40,
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
      backgroundColor: theme.colors.coolGrey['4'],
      borderRadius: 50,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    year: {
      fontFamily: theme.fontFamily.CGM,
      color: theme.colors.coolGrey['12'],
      fontSize: theme.typography.h6.fontSize,
    },
    bottomContainer: {
      flex: 1,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'center',
    },
    option: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    optionText: {
      fontSize: 16,
      color: 'black',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.year}>{currentYear}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal} style={styles.iconButton}>
          <Carousel />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {selectedType === 1 ? (
        <View>
          <CalendarComponent onYearChange={year => getYear(year)} />
        </View>
      ) : (
        <View style={{height: '100%'}}>
          <AgendaScreen
            viewType={selectedType}
            onDateChange={date => getDate(date)}
          />
        </View>
      )}

      {/* Modal */}
      {/* <ViewModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleChange={onHandleChange}
      /> */}
      {/* <GestureHandlerRootView style={styles.bottomContainer}>
        <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView> */}
      <BottomSheet
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        height="50%">
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('Daily Planner')}>
            <Text style={styles.optionText}>Daily Planner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('03 days')}>
            <Text style={styles.optionText}>03 days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('Week Days')}>
            <Text style={styles.optionText}>Week Days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('Week Ends')}>
            <Text style={styles.optionText}>Week Ends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => onSelect('Yearly')}>
            <Text style={styles.optionText}>Yearly</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default MainView;
