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

        return  (
            <ScrollView
                contentContainerStyle={styles.wrapper}
            >
                <Card
                    style={styles.card}
                >
                    <Card.Cover source={{ uri: presenter.image }} />
                    <Card.Content>
                        <Title>{ presenter.name }</Title>
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