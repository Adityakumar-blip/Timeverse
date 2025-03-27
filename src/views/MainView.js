import React, {useCallback, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AgendaScreen from './WeekView';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarComponent from './MonthView';

import Carousel from '../assets/svg/Carousel.svg';
import {useTheme} from '../../utils/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '../components/BottomSheet';
// import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import Cross from '../assets/svg/Cross.svg';
import Button from '../components/Button';

const VIEW_OPTIONS = [
  {label: 'Daily Planner', value: 'Week', days: 7},
  {label: '03 Days', value: '03 days', days: 3},
  {label: 'Week Days', value: '5 days', days: 5},
  {label: 'Week Ends', value: 'Week Ends', days: 2},
  {label: 'Yearly', value: 'Monthly', days: 1},
];

const MainView = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();

  // State Management
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(7);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedOption, setSelectedOption] = useState(VIEW_OPTIONS[0].value);

  // Handlers
  const handleOptionPress = useCallback(option => {
    setSelectedOption(option);
  }, []);

  const onContinueClick = useCallback(() => {
    const selectedView = VIEW_OPTIONS.find(
      option => option.value === selectedOption,
    );
    if (selectedView) {
      setSelectedType(selectedView.days);
      setModalVisible(false);
    }
  }, [selectedOption]);

  const updateYear = useCallback(year => {
    setCurrentYear(year);
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
      backgroundColor: isDarkMode ? 'black' : 'white',
      height: 'max-content',
      width: '100%',
    },
    bottomHeader: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    crossButton: {
      backgroundColor: theme.colors.coolGrey['4'],
      padding: 18,
      borderRadius: 10,
    },
    bottomHeading: {
      fontFamily: theme.fontFamily.CGM,
      fontSize: theme.typography.h4.fontSize,
      color: theme.colors.coolGrey['12'],
    },
    bottomPara: {
      fontFamily: theme.fontFamily.SUPM,
      fontSize: theme.typography.paragraphS.fontSize,
      color: theme.colors.coolGrey['10'],
    },
    optionsContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.coolGrey['2'],
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 10,
      marginHorizontal: 8,
      marginVertical: 8,
      justifyContent: 'space-between',
    },
    radioButton: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.colors.coolGrey['12'],
      borderRadius: 10,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      backgroundColor: theme.colors.coolGrey['12'],
      borderRadius: 6,
    },
    optionText: {
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.year}>{currentYear}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconButton}>
          <Carousel />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {selectedType === 1 ? (
        <CalendarComponent onYearChange={updateYear} />
      ) : (
        <AgendaScreen
          viewType={selectedType}
          onDateChange={updateYear}
          navigation={navigation}
        />
      )}

      {/* Bottom Sheet */}
      <BottomSheet
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Time Scale">
        <View style={styles.bottomContainer}>
          <View style={styles.bottomHeader}>
            <View>
              <Text style={styles.bottomHeading}>Time Scale</Text>
              <Text style={styles.bottomPara}>Select your preferred view</Text>
            </View>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setModalVisible(false)}>
              <Cross />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {VIEW_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionButton}
                onPress={() => handleOptionPress(option.value)}>
                <Text style={styles.optionText}>{option.label}</Text>
                <View
                  style={[
                    styles.radioButton,
                    selectedOption === option.value && {
                      borderColor: theme.colors.primary,
                    },
                  ]}>
                  {selectedOption === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="CONTINUE"
            variant="primary"
            size="large"
            onPress={onContinueClick}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default React.memo(MainView);
