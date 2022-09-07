export const USER_MENUS = [
    {
        name: 'Accounts',
        path: '/user/:userId/accounts',
        icon: 'balance'
    },
    {
        name: 'Transfer History',
        path: '/user/:userId/transfer',
        icon: 'currency_exchange'
    },
    {
        name: 'Transfer Tx',
        path: '/user/:userId/transfer/tx',
        icon: 'currency_exchange'
    },
    {
        name: 'Send Money History',
        path: '/user/:userId/e-transfer',
        icon: 'monetization_on'
    },
    {
        name: 'Send Money Tx',
        path: '/user/:userId/e-transfer/tx',
        icon: 'monetization_on'
    },
    {
        name: 'Contact',
        path: '/user/:userId/contacts',
        icon: 'perm_phone_msg'
    }
]

export const ADMIN_MENUS = [
    {
        name: 'User Management',
        path: '/admin/users',
        icon: 'manage_accounts'
    },
    {
        name: 'Account Management',
        path: '/admin/accounts',
        icon: 'account_balance'
    },
]
