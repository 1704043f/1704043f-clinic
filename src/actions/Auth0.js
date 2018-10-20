import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import auth0 from 'react-native-auth0';
import { AsyncStorage } from "react-native"
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_SUCCESS } from './types';
import { Actions } from 'react-native-router-flux';

const auth0ClientId = 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh';
const auth0Domain = 'shikwan.auth0.com';

function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}
const randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/*
authUrl: `${auth0Domain}/authorize` + toQueryString({
        client_id: auth0ClientId,
        response_type: 'id_token',
        scope: 'openid email profile',
        audience: 'https://example.auth0.com/userinfo',
        nonce: await this.getNonce(),
        redirect_uri: redirectUrl,
      }),
*/

export const loginWithAuth0 = () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    //console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);

    //console.log(`QUERYSTRING THINGY : https://${auth0Domain}/authorize` + toQueryString({
     /*    client_id : auth0ClientId,
        nonce : randomString(16) ,
        scope: "openid profile email",
        response_type: "token id_token",
        audience : encodeURIComponent(`https://shikwan.auth0.com/api/v2/`),
        redirect_uri :  redirectUrl 
    })); */

    //console.log(`https://${auth0Domain}/authorize?client_id=${auth0ClientId}&nonce=${randomString(16)}&scope=profile&response_type=id_token&audience=https://shikwan.auth0.com/api/v2/&redirect_uri=${redirectUrl}`)
    return async dispatch => {
    const result = await AuthSession.startAsync({
        authUrl: `https://${auth0Domain}/authorize` + toQueryString({
            client_id: auth0ClientId,
            nonce: randomString(16),
            scope: "openid profile email",
            response_type: "token id_token",
            audience: `https://shikwan.auth0.com/api/v2/`,
            redirect_uri: redirectUrl
        })
    });
    
    //console.log("Result : ", result);
    if (result.type === 'success') {
        
            if (result.params.error) {
                Alert.alert('Error', result.params.error_description
                    || 'something went wrong while logging in');
                dispatch({
                    type: 'LOGIN_USER_FAIL',
                    payload: {
                        id_token: 'something went wrong while logging in'
                    }
                })
            }
            const encodedToken = result.params.id_token;
            const decodedToken = jwtDecode(encodedToken);
            //console.log("Decoded token : " , decodedToken);
            const username = decodedToken.name;
            dispatch({
                type: 'LOGIN_USER_SUCCESS',
                payload: {
                    name: username,
                    fullProfile: decodedToken,
                    sub : decodedToken.sub,
                    picture : decodedToken.picture,

                }
            })
            Actions.main();
        }
    }
}

export const logout = () => {
    AuthSession.dismiss();
    return (dispatch) => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload : "Logout successfully!"
        })
        Actions.auth();
    }
}