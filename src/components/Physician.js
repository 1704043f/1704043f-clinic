import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { fetchProviderInfo } from '../actions/PatientAction';
class Physician extends Component {
    componentDidMount(){
        this.props.fetchProviderInfo();
    }
    render(){
        console.log("physician props :", this.props.patientData.physicianInfo);
        const {firstname, lastname, email, office, } = this.props.patientData.physicianInfo;
        return (
            <View>
                <Card>
                    <CardSection>
                        <Text>Name</Text>
                    </CardSection>
                    <CardSection>
                        <Text>Email</Text>
                    </CardSection>
                    <CardSection>
                        <Text>Address</Text>
                    </CardSection>
                    <CardSection>
                        <Text>Phone</Text>
                    </CardSection>
                </Card>
            </View>
        ) 
    }
    
}

const mapStateToProps = state => {
    console.log("state in Physician :", state);
    return (state);
}

export default connect(mapStateToProps, { fetchProviderInfo })(Physician);