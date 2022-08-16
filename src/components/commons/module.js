export const DEFAULT_URL = "http://localhost:5000/api";
export const API_LOGIN = '';
export const API_GET_USER = '';
export const API_GET_USER_ACCOUNTS = '';
export const API_ADMIN = '';
export const API_ADMIN_USERS = '';
export const API_ADMIN_ACCOUNTS_ALL = 'http://localhost:5002/api/admin/accounts';


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