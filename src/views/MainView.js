import React, {useState} from 'react';
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

const MainView = ({navigation}) => {
  const {theme, isDarkMode} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(1);
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
          <AgendaScreen viewType={selectedType} />
        </View>
      )}

      {/* Modal */}
      <ViewModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleChange={onHandleChange}
      />
    </SafeAreaView>
  );
};

export default MainView;
