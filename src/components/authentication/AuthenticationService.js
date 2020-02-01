import axios from 'axios'
import {getloginUrl} from "../../constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

export const USER_NAME_SESSION_ATTRIBUTE_PASSWORD = 'UserPassword';

export const USER_NAME_SESSION_ATTRIBUTE_ROLE = 'UserRole';

export const USER_NAME_SESSION_ATTRIBUTE_ID = 'UserId';

class AuthenticationService {


    executeBasicAuthenticationService(username, password) {

        let role = '';
        let id = '';

        return axios.get(`${getloginUrl}`,
            { headers: { authorization: this.createBasicAuthToken(username, password),
                    "Access-Control-Allow-Origin":"*"} })
            .then((response) => {{role = response.data.roleName}{id = response.data.id}})
            .then(() => {{sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_ROLE, role)}
            {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_ID, id)}})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD, password)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_PASSWORD);
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_ROLE);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
