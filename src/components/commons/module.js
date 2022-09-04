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
export const API_CONTACTS_ALL = `/contacts/:userId`;
export const API_CONTACT_DELETE = `/contacts/:contact_id`;
export const API_CONTACT_PUT = `/contacts/:dataId`;


export const API_USER_INFO = `/users/:userId`;
export const API_AUTH = `http://localhost:${API_PORT}/auth`
export const API_USERS = `http://localhost:${API_PORT}/api/users`
export const API_OPEN_ACCOUNT = `/accounts/:accountId/open`;
export const API_USER_ACCOUNT_INFO = `/tx/:accountId`;

export const API_USER_TX = `/tx/:userAccountId`;
export const API_TX_POST = `/tx`;

export const API_USER_TR = `/tranfer/:userAccountId`;
export const API_TR_POST = `/transfer`;

export const USER_MENUS = [
    {
        name:'Accounts',
        path:'/user/:userId/accounts',
        icon:'balance'
    },
    {
        name:'Transfer',
        path:'/user/:userId/txs',
        icon:'currency_exchange'
    },
    {
        name:'Etransfer',
        path:'/user/:userId/transfer',
        icon:'monetization_on'
    },
    {
        name:'Bill Payment',
        path:'/user/:userId/bills',
        icon:'monetization_on'
    },
    {
        name:'Contact',
        path:'/user/:userId/contacts',
        icon:'perm_phone_msg'
    }

  
    
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
        console.log(`${DEFAULT_URL}${newPath}`);
        return `${DEFAULT_URL}${newPath}`
    }
}