import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RadialGradientBorder = ({
  children,
  width,
  height,
  borderWidth,
  borderRadius,
  colors,
}) => {
  return (
    <View style={[styles.container, {width, height}]}>
      <LinearGradient
        colors={colors}
        style={[StyleSheet.absoluteFill, {borderRadius}]}
        start={{x: 0.5, y: 0.5}}
        end={{x: 1, y: 1}}
      />
      <View
        style={[
          styles.inner,
          {
            width: 200 - borderWidth * 2,
            height: height - borderWidth * 2,
            borderRadius: borderRadius - borderWidth,
          },
        ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadialGradientBorder;
