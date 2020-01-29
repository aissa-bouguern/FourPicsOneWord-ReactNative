import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../elements/Button';

const stylesheet = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20
  }
})

const HomeScreen = ({navigation}) => (
  <View style={stylesheet.container}>
    <Button onPress={() => navigation.navigate('QuestionsList')}>Start</Button>
  </View>
);

export default HomeScreen;
