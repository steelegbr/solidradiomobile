/**
 * Navigation wrapper for the presenters.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PresentersScreen from './PresentersScreen';
import PresenterDetail from './PresenterDetail';

const Stack = createStackNavigator();

class PresentersWrapper extends Component {

    render() {

        const { theme } = this.props;

        return (
            <NavigationContainer
                theme={theme}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="PresentersScreen"
                        component={PresentersScreen}
                    />
                    <Stack.Screen
                        name="PresenterDetail"
                        component={PresenterDetail}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
        
    }

}

const mapStateToProps = (state) => {

    return {
        theme: state.theme
    };

}

export default connect(mapStateToProps)(PresentersWrapper);