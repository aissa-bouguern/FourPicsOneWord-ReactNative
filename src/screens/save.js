import React from 'react';

import shuffle from 'lodash/shuffle';

import take from 'lodash/take';

import { View, Image, ScrollView, Alert, StyleSheet, Text } from 'react-native';

import Button from '../elements/Button';

import alphabet from '../data/alphabet';

import questions from '../data/questions';

import Images from '../data/images';

const stylesheet = StyleSheet.create({
  container: {
    padding: 10
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 7,
    borderColor: '#bababa',
    margin: 2
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  answerWrapper: {
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 7
  },
  answerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});

const EMPTY_BUTTON = { letter: '', location: '' };

const QuizScreen = ({ navigation }) => {
  const [answered, setAnswered] = React.useState(false);
  // Answer letters
  const [wordLetters, setWordLetters] = React.useState([]);

  const paramId = navigation.getParam('id');

  const current = questions[paramId];

  let { id, images, answer } = current;

  const answerWithoutSpaces = answer.replace(/\s/g, '').split('');

  let toPick = 16 - answerWithoutSpaces.length;

  let randomLetters = take(shuffle(alphabet), toPick);

  let suggestedLetters = shuffle(randomLetters.concat(answerWithoutSpaces));

  // Suggested letters
  const [suggested, setSuggested] = React.useState(suggestedLetters);

  React.useEffect(() => {
    const empty = answerWithoutSpaces.map(() => EMPTY_BUTTON);
    setWordLetters(empty);
    setSuggested(suggestedLetters);
    setAnswered(false);
  }, [current]);

  React.useEffect(() => {
    let selectedWord = wordLetters.map(s => s.letter).join('');
    let answerWord = answerWithoutSpaces.join('');
    let title, body;
    if (selectedWord.length === answerWord.length) {
      const isGoodAnswer = selectedWord === answerWord;

      if (isGoodAnswer) {
        title = 'Good!';
        body = 'To the next question ;)';
        setAnswered(true);
      } else {
        title = 'Wrong!';
        body = "Don't worry! Just try again";
      }

      Alert.alert(
        title,
        body,
        [
          {
            text: 'OK',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
    }
  }, [wordLetters]);

  function handleClick(letter, location) {
    // Find The first empty value
    const found = wordLetters.find(obj => {
      return obj.letter === '';
    });

    // Replace the first empty button with selected letter
    const newSelected = [...wordLetters].map((obj, i) => {
      return i === wordLetters.indexOf(found) ? { letter, location } : obj;
    });
    setWordLetters(newSelected);

    let newOptions = suggested.map((item, i) => (i === location ? '' : item));
    setSuggested(newOptions);
  }

  function removeLetter(letter, location) {
    const newOptions = suggested.map((value, i) =>
      i === location ? letter : value
    );
    setSuggested(newOptions);

    const newSelected = wordLetters.map((obj, i) =>
      obj.location === location ? EMPTY_BUTTON : obj
    );
    setWordLetters(newSelected);
  }

  return (
    <ScrollView style={stylesheet.container}>
      <View style={stylesheet.flex}>
        {images.map((image, index) => (
          <Image style={stylesheet.image} source={Images[image]} key={index} />
        ))}
      </View>

      {!answered && (
        <View style={stylesheet.flex}>
          {wordLetters.map((obj, index) => (
            <Button
              bgColor="#000"
              key={index}
              onPress={() => removeLetter(obj.letter, obj.location)}
              disabled={answered}
              style={{ width: 50, margin: 5 }}
            >
              {obj.letter}
            </Button>
          ))}
        </View>
      )}

      {answered && (
        <View style={stylesheet.answerWrapper}>
          <Text style={stylesheet.answerText}>{answer}</Text>
        </View>
      )}

      <View style={stylesheet.flex}>
        {suggested.map((letter, index) => (
          <Button
            key={index}
            onPress={letter ? () => handleClick(letter, index) : null}
            disabled={answered}
            style={{ width: 50, margin: 5 }}
          >
            {letter}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};

export default QuizScreen;
