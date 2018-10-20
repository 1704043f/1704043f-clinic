import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import { ListItem, Avatar } from 'react-native-material-ui'
import { Card, CardSection, Button } from './common';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
]


const HistoryRecords = () => {
    return (
        list.map((l, i) => (
            <ListItem
                key={i}
                divider
                leftElement={<Avatar text={l.name.length.toString()}></Avatar>}
                centerElement={{
                    primaryText: l.name,
                    secondaryText: l.subtitle
                }}
                rightElement="info"
                onPress={() => console.log("we are going in to " + i + " record, comrade")}
            />
        ))
    )
}

export default (HistoryRecords);