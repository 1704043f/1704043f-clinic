import axios from 'axios';
import { USER_PROFILE } from './types';
import { AsyncStorage } from 'react-native';

let userRole, userId; 

export const fetchUserDetails = (sub) => {
    console.log("Sub : ", sub);
    const url = `https://lit-island-56219.herokuapp.com/api/user/${sub.toString()}`;
    const request = axios.get(url);
    let userInfo, userRole, userID;
    return (dispatch) => {
        request.then( res => {
            //console.log("Result in fetchUserDetail : ", res.data);
            userInfo = res.data[0];
            multiSetPairs = [
                ['role', userInfo.role],
                ['userID', userInfo.id],
                ['sub', userInfo.sub],
            ]
            AsyncStorage.multiSet(multiSetPairs);
            userRole = userInfo.role
            userID = userInfo.id;
            //console.log("User ID : ", userID);
            
        }, (error) => console.log("Error in getting user details : ", error)).then(() => {
            const url = userRole === 'patient' ? `https://lit-island-56219.herokuapp.com/api/patient_info/find/${userID}` : `https://lit-island-56219.herokuapp.com/api/provider/${userID}`
            //console.log("Url to run : " + url);
            const request = axios.get(url);
            
            request.then( res2 => {
                //console.log("result from find user patient info : ", res2.data);
                getUserRole().then(result => {
                    userRole = result;
                    getUserID().then(result2 => {
                        userID = result2;
                        //console.log("User role : ", userRole);
                        //console.log("User ID : ", userID)
                        setItemAsyncStorage('patientProviderID', res2.data.primary_provider_id);
                        setItemAsyncStorage('patientDataID', res2.data.patient_data_id);
                        //AsyncStorage.setItem('patientProviderID', res.data.primary_provider_id);
                        dispatch({
                            type: USER_PROFILE,
                            payload: {
                                role: userRole,
                                id: userID,
                                patient_data_id : res2.data.patient_data_id,
                                details: res2.data,
                            }
                        })
                        
                    })
                });
                
            }, (error) => {
                console.log("Error in fetching user details interior: ", error)
            })

        }, (error) => { console.log("Error in fetching user details exterior : ", error) });
    }
}

const getUserRole =  async () => {
    try {
        userRole = await AsyncStorage.getItem('role') || '';
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    return userRole;
}

const getUserID = async () => {
    try {
       userId = await AsyncStorage.getItem('userID') || '';
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    return userId;
}

const setItemAsyncStorage = async (key, val) => {
    try {
        await AsyncStorage.setItem(key, val);
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};