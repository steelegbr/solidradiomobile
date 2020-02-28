import React from 'react';
import { Component } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { reducer, rootSaga, initialLoad } from './redux/Sagas';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';
import TestComponent from './components/TestComponent';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

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
// TODO: Splash screen for loading!

export default class SolidRadioApp extends Component {
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

  handleIndexChange = index => this.setState({ index });

  renderScene = BottomNavigation.SceneMap({
      radio: TestComponent,
      schedule: TestComponent,
      podcasts: TestComponent,
      presenters: TestComponent
  });

  render() {
      return (
        <StoreProvider store={store}>
          <PaperProvider>
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this.handleIndexChange}
                renderScene={this.renderScene}
            />
          </PaperProvider>
        </StoreProvider>
      );
  }

}