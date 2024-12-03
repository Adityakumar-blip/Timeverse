import React, {useState, useRef} from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  PanResponder,
} from 'react-native';

const {height} = Dimensions.get('screen');

const BottomSheet = ({
  visible,
  onClose,
  children,
  height: sheetHeight = '50%',
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 50) {
          // Increased threshold for more deliberate swipe
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        }
      },
    }),
  ).current;

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay} onTouchEnd={onClose}>
        <Animated.View
          style={[styles.bottomSheet, {height: sheetHeight}, animatedStyle]}
          {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white', // Changed from red for better visibility
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 2.5,
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
  },
});

export default BottomSheet;
