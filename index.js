/**
 * @format
 */

// Based on https://github.com/axios/axios/issues/2235
// Fixes the atob / btoa complaint for Logstash

import {decode, encode} from 'base-64'

if (!global.btoa) {
  global.btoa = encode;
}
  
if (!global.atob) {
  global.atob = decode;
}

// Back to your normally scheduled React Native app

import * as React from 'react';
import { AppRegistry } from 'react-native';
import '@react-native-firebase/crashlytics';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
    return (
      <App />
    );
  }

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('main', () => Main);
