import React from 'react';
import { Component } from 'react';
import { reducer, initialLoad } from './reducers/actions';
import { rootSaga } from './sagas/sagas';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';
import { Provider as StoreProvider } from 'react-redux';
import Wrapper from './components/Wrapper';
import { axiosConfig } from './middleware/auth-token';

// Setup Axios

const axiosClient = axios.create({
  responseType: 'json'
});

// Setup Reux and Sagas

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, 
  applyMiddleware(
    thunkMiddleware,
    axiosMiddleware(axiosClient, axiosConfig),
    sagaMiddleware
  )
);

// Pull in our application settings

sagaMiddleware.run(rootSaga);
store.dispatch(initialLoad());

// The main app component
// TODO: Splash screen for loading!

export default class SolidRadioApp extends Component {
  render() {
      return (
        <StoreProvider store={store}>
          <Wrapper />
        </StoreProvider>
      );
  }

}


