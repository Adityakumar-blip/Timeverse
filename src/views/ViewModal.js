/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';

const ViewModal = ({isModalVisible, setModalVisible, handleChange}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Animated values for each option's sliding direction and opacity
  const slideAnimWeek = useRef(new Animated.Value(-300)).current; // Week slides from top
  const slideAnimMonthly = useRef(new Animated.Value(300)).current; // Monthly slides from bottom
  const slideAnim5Days = useRef(new Animated.Value(-300)).current; // 5 Days slides from left
  const slideAnim3Days = useRef(new Animated.Value(300)).current; // 3 Days slides from right
  const fadeAnim = useRef(new Animated.Value(0)).current; // Shared opacity fade-in/out

  console.log('ismodalvisibe', isModalVisible);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const startSlideIn = () => {
    Animated.parallel([
      // Slide and fade-in animations
      Animated.timing(slideAnimWeek, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimMonthly, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim5Days, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim3Days, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true, // Fade in
      }),
    ]).start();
  };

  const startSlideOut = () => {
    // Animated.parallel([
    //   Animated.timing(slideAnimWeek, {
    //     toValue: -300,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(slideAnimMonthly, {
    //     toValue: 300,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(slideAnim5Days, {
    //     toValue: -300,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(slideAnim3Days, {
    //     toValue: 300,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(fadeAnim, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true, // Fade out
    //   }),
    // ]).start(() => setModalVisible(false));
    setModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      startSlideIn();
    }
  }, [isModalVisible]);

  const handleSelectOption = option => {
    setSelectedOption(option);
    handleChange(option);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={startSlideOut}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>

            <View style={styles.gridContainer}>
              {/* Week Option */}
              <Animated.View
                style={[
                  styles.optionBox,
                  {transform: [{translateY: slideAnimWeek}], opacity: fadeAnim},
                ]}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('Week')}
                  style={[
                    styles.option,
                    selectedOption === 'Week' && styles.selectedOption,
                  ]}>
                  <Image
                    source={{uri: 'https://example.com/week-icon.png'}}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>Week</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Monthly Option */}
              <Animated.View
                style={[
                  styles.optionBox,
                  {
                    transform: [{translateY: slideAnimMonthly}],
                    opacity: fadeAnim,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('Monthly')}
                  style={[
                    styles.option,
                    selectedOption === 'Monthly' && styles.selectedOption,
                  ]}>
                  <Image
                    source={{uri: 'https://example.com/monthly-icon.png'}}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>Monthly</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* 5 Days Option */}
              <Animated.View
                style={[
                  styles.optionBox,
                  {
                    transform: [{translateX: slideAnim5Days}],
                    opacity: fadeAnim,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('5 Days')}
                  style={[
                    styles.option,
                    selectedOption === '5 Days' && styles.selectedOption,
                  ]}>
                  <Image
                    source={{uri: 'https://example.com/5days-icon.png'}}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>5 Days</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* 3 Days Option */}
              <Animated.View
                style={[
                  styles.optionBox,
                  {
                    transform: [{translateX: slideAnim3Days}],
                    opacity: fadeAnim,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('3 Days')}
                  style={[
                    styles.option,
                    selectedOption === '3 Days' && styles.selectedOption,
                  ]}>
                  <Image
                    source={{uri: 'https://example.com/3days-icon.png'}}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>3 Days</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Year Option */}
              <Animated.View
                style={[
                  styles.optionBox,
                  {
                    transform: [{translateY: slideAnimMonthly}],
                    opacity: fadeAnim,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('Year')}
                  style={[
                    styles.option,
                    selectedOption === 'Year' && styles.selectedOption,
                  ]}>
                  <Image
                    source={{uri: 'https://example.com/year-icon.png'}}
                    style={styles.optionImage}
                  />
                  <Text style={styles.optionText}>Year</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={startSlideOut}
              style={styles.closeButton}>
              <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionBox: {
    width: '45%',
    marginVertical: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: '#1E90FF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  optionImage: {
    width: 50,
    height: 50,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
  },
});

export default ViewModal;
