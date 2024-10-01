import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/ThemeContext';
import ButtonsSystem from '../components/ButtonsSystem';
import InputField from '../components/Input';
import ChipMatrix from '../components/ChipsSystem';
import {ScrollView} from 'react-native-gesture-handler';

const ComponentView = () => {
  const [text, setText] = useState('');
  const {theme} = useTheme();
  return (
    <ScrollView style={styles.container}>
      <InputField placeholder="Default state" />
      <InputField placeholder="Error state" error />
      <InputField placeholder="Success state" success />
      <InputField placeholder="Disabled state" disabled />
      <ButtonsSystem />
      <ChipMatrix />
    </ScrollView>
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
