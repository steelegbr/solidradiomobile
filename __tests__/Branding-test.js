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
 * Tests the branding functions
 */

import { generateStationTheme, generateTheme } from '../branding/branding';

it('generate-default-theme', () => {

    const generatedTheme = generateTheme(false);
    expect(generatedTheme.dark).toBe(false);
    expect(generatedTheme.roundness).toBe(10);

});

it('generate-dark-theme', () => {

    const generatedTheme = generateTheme(true);
    expect(generatedTheme.dark).toBe(true);
    expect(generatedTheme.roundness).toBe(10);

});

it('generate-default-station-theme', () => {

    const station = {
        primary_colour: "#ff0000"
    };

    const generatedTheme = generateStationTheme(false, station);
    expect(generatedTheme.dark).toBe(false);
    expect(generatedTheme.roundness).toBe(10);
    expect(generatedTheme.colors.primary).toBe(station.primary_colour);
    expect(generatedTheme.colors.accent).toBe(station.primary_colour);
    expect(generatedTheme.mode).toBe("adaptive");

});

it('generate-dark-station-theme', () => {

    const station = {
        primary_colour: "#ff0000"
    };

    const generatedTheme = generateStationTheme(true, station);
    expect(generatedTheme.dark).toBe(true);
    expect(generatedTheme.roundness).toBe(10);
    expect(generatedTheme.colors.primary).toBe(station.primary_colour);
    expect(generatedTheme.colors.accent).toBe(station.primary_colour);
    expect(generatedTheme.mode).toBe("adaptive");

});
