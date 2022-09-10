import {API_PORT} from "../env";

export const DEFAULT_URL = `http://localhost:${API_PORT}/api`;
//export const DEFAULT_URL = `https://powerful-crag-89387.herokuapp.com/api`;

//Login
export const API_AUTH = `${DEFAULT_URL}/auth`
//SignUp
export const API_ADD_USER = `${DEFAULT_URL}/users`;

//Related with USER API
export const API_USER_INFO = `/users/:userId`;
export const API_USER_ACCOUNTS = `/users/:userId/accounts`;
export const API_USER_CONTACTS = `/users/:userId/contacts`;
export const API_CONTACT_INFO = `/users/:userId/contacts/:contactId`;

//transfer API
export const API_USER_TRANSFER= `/userAccounts/:userAccountId/transfer`;
export const API_USER_ETRANSFER = `/userAccounts/:userAccountId/etransfer`;


//ACCOUNT API
export const API_BANK_ACCOUNTS = `/accounts`;
export const API_OPEN_ACCOUNT = `/accounts/:accountId/open`;


//ADMIN CAN CONTROL API
export const API_USERS_ALL = `/admin/users`
export const API_ACCOUNTS_ALL = `/admin/accounts`;
export const API_ACCOUNT_PUT = `/admin/accounts/:accountId`;
export const API_ACCOUNT_DELETE = `/admin/accounts/:accountId`;

export const getRoute = (path, params) => {
    if (params === undefined)
        return path
    else {
        let newPath = path
        Object.entries(params).forEach(([key, value]) => {
            newPath = newPath.replace(':' + key, value)
        })
        return newPath
    }
}

export const getApiRoute = (path, params) => {
    if (params === undefined)
        return `${DEFAULT_URL}${path}`
    else {
        let newPath = path
        Object.entries(params).forEach(([key, value]) => {
            newPath = newPath.replace(':' + key, value)
        })
        return `${DEFAULT_URL}${newPath}`
    }
}