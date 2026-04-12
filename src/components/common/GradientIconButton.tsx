import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Colors} from '../../constants/theme';
import {
  IconGradientBGIcon,
} from '../../assets/icons';

interface GradientIconButtonProps {
  size?: number;
  iconSize?: number;
  borderRadius?: number;
  icon: React.ReactElement;
}

const GradientIconButton: React.FC<GradientIconButtonProps> = ({
  size = 44,
  iconSize = 22,
  borderRadius = 8,
  icon,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
        },
      ]}
    >
      <IconGradientBGIcon
        width={size}
        height={size}
        style={styles.background}
      />
      {React.cloneElement(icon, {
        width: iconSize,
        height: iconSize,
        stroke: (icon.props as any).stroke ?? Colors.white,
      } as any)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
  },
});

export default GradientIconButton;