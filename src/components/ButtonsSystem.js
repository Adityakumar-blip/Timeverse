import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './Button'; // Make sure to import the new Button component
import {useTheme} from '../../utils/ThemeContext';

const ButtonsSystem = () => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <Button
        title="Primary Button"
        onPress={() => console.log('Primary pressed')}
        size="large"
      />
      <Button
        title="Secondary Button"
        variant="secondary"
        onPress={() => console.log('Secondary pressed')}
        size="large"
      />
      {/* <Button
        title="Secondary Button"
        variant="secondary"
        onPress={() => console.log('Secondary pressed')}
      />
      <Button
        title="Outline Button"
        variant="outline"
        onPress={() => console.log('Outline pressed')}
      />
      <Button
        title="Small Button"
        size="small"
        onPress={() => console.log('Small pressed')}
      />
      <Button
        title="Large Button"
        size="large"
        onPress={() => console.log('Large pressed')}
      />
      <Button
        title="Disabled Button"
        disabled
        onPress={() => console.log('Disabled pressed')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    gap: 10, // Add some space between buttons
  },
});

export default ButtonsSystem;
