import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';

const BottomSheet = ({visible, onClose, children, title, bgColor}) => {
  const {theme, isDarkMode} = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    bottomSheet: {
      backgroundColor: bgColor ? bgColor : isDarkMode ? 'black' : 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      // paddingBottom: 20,
      // maxHeight: Dimensions.get('window').height * 0.7,
    },
    handle: {
      width: 40,
      height: 5,
      backgroundColor: '#E0E0E0',
      borderRadius: 2.5,
      alignSelf: 'center',
      marginVertical: 10,
    },
    titleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    contentContainer: {
      paddingVertical: 10,
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      alignSelf: 'center',
    },
    closeButtonText: {
      color: 'blue',
      fontSize: 16,
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.handle} />

              {/* {title && <Text style={styles.titleStyle}>{title}</Text>} */}

              <View style={styles.contentContainer}>{children}</View>

              {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;
