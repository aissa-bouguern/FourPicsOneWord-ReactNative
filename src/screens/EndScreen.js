import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Button from '../elements/Button';

const stylesheet = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20
  }
})

const EndScreen = ({navigation}) => (
  <View style={stylesheet.container}>
      <Text>Game Over!</Text>
  </View>
);

export default EndScreen;
