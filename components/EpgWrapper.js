/**
 * Navigation wrapper for the EPG.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpgScreen from './EpgScreen';
import EpgDetail from './EpgDetail';

const Stack = createStackNavigator();

class EpgWrapper extends Component {

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
                        name="EpgScreen"
                        component={EpgScreen}
                    />
                    <Stack.Screen
                        name="EpgDetail"
                        component={EpgDetail}
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

export default connect(mapStateToProps)(EpgWrapper);