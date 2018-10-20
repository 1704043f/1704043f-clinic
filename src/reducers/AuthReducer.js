import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_AUTHENTICATED,
    LOGOUT_SUCCESS,
    USER_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
    id_token: '',
    error: '',
    authenticated: 0, // 1 for authenticated 2 for not
    profile: {},
    loading: false,
    message: '',
}


export default (state = INITIAL_STATE, action) => {
    //console.log(action);

    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state, id_token: action.payload.id_token, authenticated: 1, error: '', ...{...action.payload} };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_SUCCESS:
            return { ...state, authenticated: 0, message: action.payload }
        default:
            return state;
    }
};