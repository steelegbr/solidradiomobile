/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
    return (
      <StoreProvider>
        <PaperProvider>
            <App />
        </PaperProvider>
      </StoreProvider>
    );
  }

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('main', () => Main);
