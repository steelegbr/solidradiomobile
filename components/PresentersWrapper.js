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