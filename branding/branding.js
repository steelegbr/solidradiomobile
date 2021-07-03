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
 * Provides branding functions.
 */

import { DefaultTheme, DarkTheme } from 'react-native-paper';

/**
 * Generates a station theme.
 * @param {bool} darkMode An indication if we are in dark mode.
 * @param {station} station The station this theme is for.
 */

export function generateStationTheme(darkMode, station) {

    let theme = generateTheme(darkMode);
    theme.colors.primary = station.primary_colour;
    theme.colors.accent = station.primary_colour;
    theme.mode = 'adaptive';
    return theme;

}

/**
 * Generates a theme with no station.
 * @param {bool} darkMode An indication if we are in dark mode.
 */

export function generateTheme(darkMode) {

    if (darkMode) {
        return {
            ...DarkTheme,
            roundness: 10,
            colors: {
                ...DarkTheme.colors
            }
        };
    } else {
        return {
            ...DefaultTheme,
            roundness: 10,
            colors: {
                ...DefaultTheme.colors
            }
        };
    }

}
