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
 * Detailed presenter view.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import HTML from "react-native-render-html";

class PresenterDetail extends Component {

    render() {

        const { presenter, styles, navigation } = this.props;

        return (
            <ScrollView
                contentContainerStyle={styles.wrapper}
            >
                <Card
                    style={styles.card}
                >
                    <Card.Cover source={{ uri: presenter.image }} />
                    <Card.Content>
                        <Title>{presenter.name}</Title>
                        <HTML
                            html={presenter.biography}
                            contentWidth={styles.html.width}
                            tagsStyles={{
                                p: {
                                    color: styles.html.color,
                                    marginTop: styles.html.margin
                                }
                            }}
                        />
                    </Card.Content>
                </Card>
                <Button
                    mode="contained"
                    icon="arrow-left"
                    style={styles.button}
                    onPress={() => {
                        navigation.pop();
                    }}
                >
                    Back
                </Button>
            </ScrollView>
        );

    }

}

const mapStateToProps = (state, ownProps) => {

    const uiWidth = Dimensions.get('window').width * 0.9;

    return {
        presenter: ownProps.route.params.presenter,
        styles: {
            card: {
                width: uiWidth,
            },
            wrapper: {
                alignItems: 'center'
            },
            button: {
                marginTop: 10,
                marginBottom: 20,
                width: uiWidth
            },
            html: {
                color: state.theme.colors.onSurface,
                width: uiWidth - 10,
                margin: 15
            }
        },
        navigation: ownProps.navigation
    };

}

export default connect(mapStateToProps)(PresenterDetail);