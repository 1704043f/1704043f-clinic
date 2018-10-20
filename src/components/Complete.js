import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';

import { Card, CardSection, Button, Header } from './common';

class Complete extends Component {
    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Header title='Completed!' />
                    </CardSection>
                </Card>
            </View>
        )
    }

}

export default Complete;