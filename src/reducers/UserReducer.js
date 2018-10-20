import { USER_PROFILE } from '../actions/types';

const INITIAL_STATE = {
    role : '',
    id : '',
    details : {},
}


export default (state = INITIAL_STATE, action) => {
    //console.log("Patient reducer : " , action);

    switch (action.type) {
        case USER_PROFILE : 
        return {
            role : action.payload.role,
            id : action.payload.id,
            details : action.payload.details
        }
        default : 
        return state;
    }

};