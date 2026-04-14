import React from 'react';
import {View, StyleSheet, DimensionValue, ViewStyle} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {Colors} from '../../constants/theme';

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  width?: DimensionValue;
  height?: DimensionValue;
  iconSize?: number;
};

function GradientBackground({
  children,
  style,
  width,
  height,
  iconSize,
}: GradientBackgroundProps): React.JSX.Element {
  const containerSize = typeof width === 'number' ? width : 0;
  const offset = iconSize ? (containerSize - iconSize) / 2 : 0;

  return (
    <View
      style={[
        styles.container,
        width !== undefined || height !== undefined
          ? {width, height, flex: 0}
          : null,
        style,
      ]}>
      <Svg
        height="100%"
        width="100%"
        style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="1" y1="0" x2="0" y2="0">
            <Stop offset="0" stopColor={Colors.secondary} />
            <Stop offset="1" stopColor={Colors.primary} />
          </LinearGradient>
        </Defs>
        <Rect height="100%" width="100%" fill="url(#grad)" />
      </Svg>
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
    </View>
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
