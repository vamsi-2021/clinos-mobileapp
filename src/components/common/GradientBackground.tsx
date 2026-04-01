import React from 'react';
import {DimensionValue, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/theme';

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  width?: DimensionValue;
  height?: DimensionValue;
};

function GradientBackground({
  children,
  style,
  width,
  height,
}: GradientBackgroundProps): JSX.Element {
  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.primary]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={[styles.container, width !== undefined || height !== undefined ? {width, height, flex: 0} : null, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
