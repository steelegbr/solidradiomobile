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
