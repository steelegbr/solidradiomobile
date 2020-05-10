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
