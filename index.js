/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * @format
 */

// Based on https://github.com/axios/axios/issues/2235
// Fixes the atob / btoa complaint for Logstash

import { decode, encode } from 'base-64'

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
import { name as appName } from './app.json';

export default function Main() {
  return (
    <App />
  );
}

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('main', () => Main);
