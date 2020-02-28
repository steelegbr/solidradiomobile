import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { reducer, rootSaga, initialLoad } from './redux/Sagas';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';

const TestRoute = () => <Text>Test!</Text>

// Setup Redux

const client = axios.create({
  responseType: 'json'
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, 
  applyMiddleware(
    thunkMiddleware,
    axiosMiddleware(client),
    sagaMiddleware
  )
);

// Pull in our application settings

sagaMiddleware.run(rootSaga);
store.dispatch(initialLoad());

// The main app component

export default class SolidRadioApp extends React.Component {
  state = {
    index: 0,
    routes: [
        {
            key: 'radio',
            title: 'Radio',
            icon: 'radio'
        },
        {
          key: 'schedule',
          title: 'Schedule',
          icon: 'calendar-today'
        },
        {
          key: 'podcasts',
          title: 'Podcasts',
          icon: 'library-music'
        },
        {
          key: 'presenters',
          title: 'Presenters',
          icon: 'face'
      },
    ]
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
      radio: TestRoute,
      schedule: TestRoute,
      podcasts: TestRoute,
      presenters: TestRoute
  })

  render() {
      return (
          <BottomNavigation
              navigationState={this.state}
              onIndexChange={this._handleIndexChange}
              renderScene={this._renderScene}
          />
      );
  }

}