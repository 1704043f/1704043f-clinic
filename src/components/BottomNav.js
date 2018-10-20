
import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class BottomNav extends Component {
    state = {
        active : 'diary'
    }

    render() {
        return(
            <BottomNavigation active={this.state.active} hidden={false} >
                <BottomNavigation.Action
                    key="diary"
                    icon="dashboard"
                    label="Diary"
                    onPress={() => {
                        this.setState({ active: 'diary' }, () => {
                            console.log("redirecting to dashboard")
                            Actions.Dashboard()
                        })
                    }}
                />
                <BottomNavigation.Action
                    key="physician"
                    icon="face"
                    label="Physician"
                    onPress={() => {
                        this.setState({ active: 'physician' }, () => {
                            console.log("redirecting to physician")
                            Actions.Physician()
                        })
                    }
                    }
                />
                <BottomNavigation.Action
                    key="history"
                    icon="history"
                    label="History"
                    onPress={() => {
                        this.setState({ active: 'history' }, () => {
                            console.log("redirecting to history")
                            Actions.History()
                        })
                    }
                    }
                />
                <BottomNavigation.Action
                    key="settings"
                    icon="today"
                    label="Report"
                    onPress={() => { 
                        this.setState({ active: 'report' } , () => {
                            console.log("redirecting to report")
                        })
                    }
                    }
                />
            </BottomNavigation>
        )
    }
}

export default BottomNav;