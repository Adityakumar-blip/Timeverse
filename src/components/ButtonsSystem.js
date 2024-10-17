import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from './Button'; // Make sure to import the new Button component
import {useTheme} from '../../utils/ThemeContext';

const ButtonsSystem = () => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: 'black',
            marginBottom: 8,
            fontSize: 16,
            fontWeight: 600,
          }}>
          Primary
        </Text>
        <Button
          title="CONTINUE"
          onPress={() => console.log('Primary pressed')}
          size="large"
        />
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            marginBottom: 8,
            fontSize: 16,
            fontWeight: 600,
          }}>
          Secondary
        </Text>
        <Button
          title="CONTINUE"
          variant="secondary"
          onPress={() => console.log('Secondary pressed')}
          size="large"
        />
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            marginBottom: 8,
            fontSize: 16,
            fontWeight: 600,
          }}>
          Tertiary
        </Text>
        <Button
          title="CONTINUE"
          variant="tertiary"
          size="large"
          // disabled
          onPress={() => console.log('Disabled pressed')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    gap: 10, // Add some space between buttons
  },
});

export default ButtonsSystem;
