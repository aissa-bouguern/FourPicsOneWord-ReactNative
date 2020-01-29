import React from 'react';

import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';

import QuizScreen from './src/screens/QuizScreen';

import QuestionsListScreen from './src/screens/QuestionsListScreen';

import EndScreen from './src/screens/EndScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerShown: false
      }),
    },
    Quiz: {
      screen: QuizScreen,
    },
    QuestionsList: {
      screen: QuestionsListScreen,
      navigationOptions: () => ({
        title: 'Questions'
      }),

    },
    End: {
      screen: EndScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => <AppContainer />;

export default App;
