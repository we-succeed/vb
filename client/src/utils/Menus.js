export const USER_MENUS = [
    {
        id: 'accounts',
        name: 'Accounts',
        path: '/user/:userId/accounts',
        icon: 'balance'
    },
    {
        id: 'transfer',
        name: 'Transfer',
        path: '/user/:userId/transfer',
        icon: 'currency_exchange'
    },
    {
        id: 'e-transfer',
        name: 'Send Money',
        path: '/user/:userId/e-transfer',
        icon: 'monetization_on'
    },
    {
        id: 'contacts',
        name: 'Contact',
        path: '/user/:userId/contacts',
        icon: 'perm_phone_msg'
    },
    {
        id: 'admin_users',
        name: 'User Management',
        path: '/admin/users',
        icon: 'manage_accounts'
    },
    {
        id: 'admin_accounts',
        name: 'Account Management',
        path: '/admin/accounts',
        icon: 'account_balance'
    },
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
