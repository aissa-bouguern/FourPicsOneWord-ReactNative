import React from 'react';

import { View, StyleSheet, FlatList } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Button from '../elements/Button';

import questions from '../data/questions';

const stylesheet = StyleSheet.create({
  container: {
    padding: 20
  },
  button: {
    marginBottom: 10
  },
});


const QuestionsListScreen = ({navigation}) => {

  const [lastAnsweredIndex, setLastAnsweredIndex] = React.useState(-1);

  React.useEffect(() => {

   const didFocusEvent = navigation.addListener('didFocus', () => {

      AsyncStorage.getItem('lastAnswerIndex').then(value => {

         if (value !== null) {
           setLastAnsweredIndex(JSON.parse(value));
         }
      });

    });

    return () => {
      // Cleaning
      didFocusEvent.remove();
    };
 }, []);

  return (
      <FlatList
      contentContainerStyle={stylesheet.container}
      data={questions}
      renderItem={({ item, index }) => {

        const disabled =  index <= lastAnsweredIndex + 1 ? false : true;

        return (
          <Button style={stylesheet.button} disabled={disabled} onPress={() => navigation.navigate('Quiz', {id: index})}>Question {index + 1}</Button>
        )
      }}
      keyExtractor={item => item.id}
    />
  )
};

export default QuestionsListScreen;
