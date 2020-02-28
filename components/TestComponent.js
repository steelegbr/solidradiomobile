import React from 'react';
import { View, Component } from 'react';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

class TestComponent extends Component {

    render() {
        const { server, api_key } = this.props;
        return(
            <Text>
                Server: {server}
                Key: {api_key}
            </Text>
        );
    }

}

const mapStateToProps = state => {
    return {
        server: state.api.server,
        api_key: state.api.key
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(TestComponent);