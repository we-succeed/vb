import {API_PORT} from "../../env";

export const DEFAULT_URL = `http://localhost:${API_PORT}/api`;
export const API_ADMIN_ACCOUNTS_ALL = `/admin/accounts`;
export const API_ACCOUNTS_ALL = `/accounts`;
export const API_USER_ACCOUNTS_ALL = `/users/:userId/accounts`;
export const API_ACCOUNT_ITEM = `/accounts/:accountId`;
export const API_ACCOUNT_PUT = `/admin/accounts/:dataId`;
export const API_ACCOUNT_DELETE = `/admin/accounts/:accountId`;
export const API_USERS_ALL = `/users`;
export const API_USER_PUT = `/users/:dataId`;
export const API_USER_DELETE = `/users/:userId`;



export const USER_MENUS = [
    {
        name:'Accounts',
        path:'/user/:userId/accounts',
        icon:'balance'
    },
    {
        name:'Transfer',
        path:'/user/:userId/transfer',
        icon:'currency_exchange'
    },
    {
        name:'Bill Payment',
        path:'/user/:userId/bills',
        icon:'monetization_on'
    },
]

export const ADMIN_MENUS = [
    {
        name:'User Management',
        path:'/admin/users',
        icon:'manage_accounts'
    },
    {
        name:'Account Management',
        path:'/admin/accounts',
        icon:'account_balance'
    },
]

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
        Object.entries(params).forEach(([key,value]) => {
            newPath = newPath.replace(':' + key, value)
        })
        return `${DEFAULT_URL}${newPath}`
    }
}