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
      <InputField
        placeholder="Placeholder text"
        trailingIcon={true}
        label={'TYPING'}
      />
      <InputField placeholder="Placeholder text" error leadingIcon={true} />
      <InputField placeholder="Placeholder text" success leadingIcon={true} />
      <InputField placeholder="Placeholder text" disabled trailingIcon={true} />
      <InputField
        placeholder="Placeholder text"
        hintMessage={'This is small hint message'}
      />
      <InputField
        type="textarea"
        placeholder="Enter your message"
        numberOfLines={6}
        // onChange={handleTextAreaChange}
      />
      <InputField
        type="otp"
        otpLength={4}
        // onChange={handleOtpChange}
      />
      <InputField
        type="otp"
        otpLength={6}
        // onChange={handleOtpChange}
      />
      <InputField
        type="phone"
        placeholder="Enter phone number"
        countryCodes={[
          {name: 'United States', code: '+1'},
          {name: 'United Kingdom', code: '+44'},
          // ... more country codes
        ]}
        onChange={({countryCode, phoneNumber}) =>
          console.log(countryCode, phoneNumber)
        }
      />
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
