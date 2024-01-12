import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './Button.styles';

const Button = props => {
  const {title, onPress, style} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.container, {...style}]}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
