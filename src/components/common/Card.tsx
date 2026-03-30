import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../constants/theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

function Card({children, style}: CardProps): React.JSX.Element {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Card;
