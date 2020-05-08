import React from 'react';
import { Component } from 'react';
import { reducer, initialLoad } from './reducers/actions';
import { rootSaga } from './sagas/sagas';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';
import { Provider as StoreProvider } from 'react-redux';
import Wrapper from './components/Wrapper';
import { axiosConfig } from './middleware/auth-token';
import logger from 'redux-logger';
import TrackPlayer from 'react-native-track-player';

let reduxMiddleware = [];

// Setup Axios

const axiosClient = axios.create({
  responseType: 'json'
});

reduxMiddleware.push(axiosMiddleware(axiosClient, axiosConfig));

// Setup Reux and Sagas

const sagaMiddleware = createSagaMiddleware();
reduxMiddleware.push(sagaMiddleware);

// Logging in DEV only

if (__DEV__) {
  reduxMiddleware.push(logger);
}

// Create the store

const store = createStore(reducer, 
  applyMiddleware(...reduxMiddleware)
);

// Pull in our application settings

sagaMiddleware.run(rootSaga);
store.dispatch(initialLoad());

// Setup the audio player

TrackPlayer.registerPlaybackService(() => require('./audio/callbacks'));

// The main app component

export default class SolidRadioApp extends Component {
  render() {
      return (
        <StoreProvider store={store}>
          <Wrapper />
        </StoreProvider>
      );
  }

}


