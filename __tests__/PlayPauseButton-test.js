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
 * Tests the play/pause button.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PlayPauseButton from '../components/PlayPauseButton';
import { PlayerState } from '../audio/player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mount } from 'enzyme';

// Mocks

jest.mock("react-native-paper", () => ({
    ActivityIndicator: "ActivityIndicator",
    DefaultTheme: {
        colors: {

        }
    }
}));

// Redux

const mockStore = configureStore([]);

// Tests

it('renders-unitialised', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.UNINITIALISED
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-idle', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.IDLE
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-error', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.ERROR
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-paused', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PAUSED
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-playing', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PLAYING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-playing-big-mode', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PLAYING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton bigMode={true} iconSize={40} />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-loading', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.LOADING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('renders-loading-big-mode', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.LOADING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton bigMode={true} iconSize={40} />
        </Provider>
    ).toJSON();

    expect(playPauseButton).toMatchSnapshot();

});

it('play-pause-pressed', () => {

    // Arrange

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PLAYING
        }
    });

    const playPauseButton = mount(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    );

    // Act

    playPauseButton.find(Icon.Button).first().props().onPress();

    // Assert

    const expectedActions = [{ "type": "AUDIO_PLAYER_PLAYPAUSE", "source": "play_pause_button" }];
    expect(store.getActions()).toStrictEqual(expectedActions);

});

it('play-pause-presse-big-mode', () => {

    // Arrange

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PLAYING
        }
    });

    const playPauseButton = mount(
        <Provider store={store}>
            <PlayPauseButton bigMode={true} iconSize={40} />
        </Provider>
    );

    // Act

    playPauseButton.find(Icon.Button).first().props().onPress();

    // Assert

    const expectedActions = [{ "type": "AUDIO_PLAYER_PLAYPAUSE", "source": "play_pause_button" }];
    expect(store.getActions()).toStrictEqual(expectedActions);

});