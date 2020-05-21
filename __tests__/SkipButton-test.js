/**
 * Tests the skip button.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SkipButton from '../components/SkipButton';
import { PlayerState } from '../audio/player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mount } from 'enzyme';
import { generateTheme } from '../branding/branding';

// Redux

const mockStore = configureStore([]);
let store;

// Tests

describe('mid-playlist', () => {

    beforeEach(() => {
        store = mockStore({
            theme: generateTheme(false),
            player: {
                playlist: [ {}, {}, {} ],
                currentItem: 1
            }
        });

    });

    it('renders-forward-small', () => {

        // Arrange

        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={0} iconSize={12} />
            </Provider>
        ).toJSON();

        // Act

        // Assert

        expect(skipButton).toMatchSnapshot();

    });
    
    it('renders-forward-large', () => {

        // Arrange

        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={0} bigMode={true} size={40} />
            </Provider>
        ).toJSON();

        // Act

        // Assert

        expect(skipButton).toMatchSnapshot();
    
    });
    
    it('renders-backward-small', () => {

        // Arrange

        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={1} />
            </Provider>
        ).toJSON();

        // Act

        // Assert

        expect(skipButton).toMatchSnapshot();
    
    });
    
    it('renders-backward-large', () => {

        // Arrange

        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={1} bigMode={true} iconSize={40} />
            </Provider>
        ).toJSON();

        // Act

        // Assert

        expect(skipButton).toMatchSnapshot();
    
    });

    it('renders-unexpected-direction', () => {

        // Arrange
    
        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={5} />
            </Provider>
        ).toJSON();
    
        // Act
    
        // Assert
    
        expect(skipButton).toMatchSnapshot();
    
    });

    /*

    it('skip-pressed-forward', () => {

        // Arrange
    
        const skipButton = mount(
            <Provider store={store}>
                <SkipButton direction={0} />
            </Provider>
        );
    
        // Act
    
        skipButton.find(Icon.Button).first().props().onPress();
    
        // Assert
    
        const expectedActions = [ { "type": "AUDIO_PLAYER_PLAYPAUSE", "source": "play_pause_button" } ];
        expect(store.getActions()).toStrictEqual(expectedActions);
    
    });

    it('skip-pressed-backward', () => {

        // Arrange
    
        const skipButton = renderer.create(
            <Provider store={store}>
                <SkipButton direction={1} />
            </Provider>
        ).toJSON();
    
        // Act
    
        skipButton.find(Icon.Button).first().props().onPress();
    
        // Assert
    
        const expectedActions = [ { "type": "AUDIO_PLAYER_PLAYPAUSE", "source": "play_pause_button" } ];
        expect(store.getActions()).toStrictEqual(expectedActions);
    
    });

    */

});


it('renders-forward-disable', () => {

    // Arrange

    store = mockStore({
        theme: generateTheme(false),
        player: {
            playlist: [ {}, {}, {} ],
            currentItem: 2
        }
    });

    const skipButton = renderer.create(
        <Provider store={store}>
            <SkipButton direction={0} />
        </Provider>
    ).toJSON();

    // Act

    // Assert

    expect(skipButton).toMatchSnapshot();

});

it('renders-backward-disable', () => {

    // Arrange

    store = mockStore({
        theme: generateTheme(false),
        player: {
            playlist: [ {}, {}, {} ],
            currentItem: 0
        }
    });

    const skipButton = renderer.create(
        <Provider store={store}>
            <SkipButton direction={1} />
        </Provider>
    ).toJSON();

    // Act

    // Assert

    expect(skipButton).toMatchSnapshot();

});