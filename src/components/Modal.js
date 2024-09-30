import React from 'react';
import {Modal, View} from 'react-native';

const ModalView = ({children, isVisible, onClose}) => {
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View>{children}</View>
    </Modal>
  );
};

export default ModalView;
