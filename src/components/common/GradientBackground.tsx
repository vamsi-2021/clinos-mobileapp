import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/theme';

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

function GradientBackground({
  children,
  style,
}: GradientBackgroundProps): React.JSX.Element {
  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.primary]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={[styles.container, style]}>
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
