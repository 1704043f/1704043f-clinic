import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Physician from './components/Physician';
import History from './components/History';
import HistoryRecords from './components/HistoryRecords';
import SampleLogin from './components/SampleLogin';
import Complete from './components/Complete';
import BottomNav from './components/BottomNav';

class RouterComponent extends Component  {
    render(){
        return (
            <View style={styles.container}>
                <Router>
                    <Stack key='root' hideNavBar>
                        <Scene key='auth'>
                            <Scene key='login' component={LoginForm} title="Please Login" initial />
                        </Scene>
                        <Scene key='main'>
                            <Scene
                                key='Dashboard'
                                component={Dashboard}
                                title="Diary" 
                            />
                            <Scene
                                key='Physician'
                                component={Physician}
                                title="Physician"
                            />
                            <Scene
                                key='History'
                                component={History}
                                title="Diary History"
                            />
                            <Scene
                                key='HistoryRecords'
                                component={HistoryRecords}
                                title="Diary History Records"
                            />
                            <Scene
                                key='Complete'
                                component={Complete}
                                title="Completed Diary"
                            />
                        </Scene>
                    </Stack>
                </Router>
                <BottomNav />
            </View>

        );
    }
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default RouterComponent;