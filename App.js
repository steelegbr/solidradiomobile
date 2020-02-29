import React from 'react';
import { Component } from 'react';
import { reducer, rootSaga, initialLoad } from './redux/Sagas';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createSagaMiddleware from 'redux-saga';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import Wrapper from './components/Wrapper';

// Setup Axios

const axiosClient = axios.create({
  responseType: 'json'
});

const axiosConfig = {
  interceptors: {
    request: [
      function ({ getState, dispatch, getSourceAction }, request) {

        // Interceptor for adding authorisation token and server name to requests

        const currentState = getState();
        request.url = `https://${currentState.api.server}${request.url}`;
        request.headers.common['Authorization'] = `Token ${currentState.api.key}`;

        return request;

      }
    ]
  }
}

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
          <PaperProvider theme={theme}> 
            <Wrapper />
          </PaperProvider>
        </StoreProvider>
      );
  }

}

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colours: {
      ...DefaultTheme.colors,
      primary: "#7300AE",
      accent: "#7300AE"
  }
}

