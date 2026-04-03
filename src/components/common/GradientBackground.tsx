import React from 'react';
import {DimensionValue, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/theme';

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  width?: DimensionValue;
  height?: DimensionValue;
  iconSize?: number; // ← add this
};

function GradientBackground({
  children,
  style,
  width,
  height,
  iconSize,
}: GradientBackgroundProps): JSX.Element {
  const containerSize = typeof width === 'number' ? width : 0;
  const offset = iconSize ? (containerSize - iconSize) / 2 : 0;

  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.primary]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      style={[
        styles.container,
        width !== undefined || height !== undefined 
          ? {width, height, flex: 0} 
          : null,
        style,
      ]}>
      {iconSize
        ? React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                  style: [
                    (child as React.ReactElement<any>).props.style,
                    {position: 'absolute', top: offset, left: offset},
                  ],
                })
              : child,
          )
        : children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientBackground;