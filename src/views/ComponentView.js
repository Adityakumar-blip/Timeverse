import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import {useTheme} from '../../utils/ThemeContext';
import ButtonsSystem from '../components/ButtonsSystem';
import InputField from '../components/Input';

const ComponentView = () => {
  const [text, setText] = useState('');
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <InputField placeholder="Default state" />
      <InputField placeholder="Error state" error />
      <InputField placeholder="Success state" success />
      <InputField placeholder="Disabled state" disabled />
      <ButtonsSystem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    // backgroundColor: them.colors.background,
  },
});

export default ComponentView;
