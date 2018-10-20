import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, CardSection, Input, Button, Spinner } from './common';
import { loginWithAuth0 } from '../actions/Auth0';


class LoginForm extends Component {
    
    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.props.loginWithAuth0}>
                        Login
                    </Button>
                </CardSection> 
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
}

function mapStatsToProps(state) {
    console.log("state in login form ");
    return (state);
}

export default connect(mapStatsToProps, {loginWithAuth0})(LoginForm);