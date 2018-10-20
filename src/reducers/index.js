import { combineReducers } from 'redux';
import PatientReducer from './PatientReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
    form: formReducer,
    auth: AuthReducer,
    patientData: PatientReducer,
    user : UserReducer,
});