//Data that make up page
export const Forms = {
    Profile: {
        schema: [
            {id: 'firstName', label: 'First Name', name: 'firstName', type: 'default', required: true},
            {id: 'lastName', label: 'Last Name', name: 'lastName', type: 'default', required: true},
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required: true, disabled: true},
            {id: 'address', label: 'Address', name: 'address', type: 'default'},
            {id: 'city', label: 'City', name: 'city', type: 'default'},
            {id: 'province', label: 'Province', name: 'province', type: 'default'},
            {id: 'postalCode', label: 'Postal Code', name: 'postalCode', type: 'default'},
            {id: 'phoneNumber', label: 'Phone Number', name: 'phoneNumber', type: 'default'}
        ]
    },
    Contact: {
        schema: [
            {id: 'name', label: 'Name', name: 'name', type: 'default', required: true},
            {id: 'email', label: 'Email', name: 'email', type: 'default', required: true},
            {id: 'mobile', label: 'Mobile', name: 'mobile', type: 'default', required: true},
        ]
    },
    SignUp: {
        schema: [
            {id: 'firstName', label: 'First Name', name: 'firstName', type: 'default', required: true},
            {id: 'lastName', label: 'Last Name', name: 'lastName', type: 'default', required: true},
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required: true},
            {id: 'password', label: 'Password', name: 'password', type: 'password', required: true},
            {id: 'confirmPassword', label: 'Confirm Password', name: 'confirmPassword', type: 'password', required: true}
        ]
    },
    Login: {
        schema: [
            {id: 'email', label: 'Email', name: 'email', type: 'default', required: true},
            {id: 'password', label: 'Password', name: 'password', type: 'password', required: true}
        ]
    },
    UserAccount: {
        schema: [
            {head: 'Type', cols: 'account.type', format: 'default'},
            {head: 'Interest', cols: 'account.interest', format: 'default'},
            {head: 'Account Name', cols: 'name', format: 'default'},
            {head: 'Account Description', cols: 'description', format: 'default'},
            {head: 'Balance($)', cols: 'balance', format: 'default'},
        ]
    },
    AdminUser: {
        schema: [
            {id: 'firstName', label: 'First Name', name: 'firstName', type: 'default', required: true},
            {id: 'lastName', label: 'Last Name', name: 'lastName', type: 'default', required: true},
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required: true, disabled: true},
            {id: 'address', label: 'Address', name: 'address', type: 'default'},
            {id: 'city', label: 'City', name: 'city', type: 'default'},
            {id: 'province', label: 'Province', name: 'province', type: 'default'},
            {id: 'postalCode', label: 'Postal Code', name: 'postalCode', type: 'default'},
            {id: 'phoneNumber', label: 'Phone Number', name: 'phoneNumber', type: 'default'}
        ]
    },
    AdminAccount: {
        schema: [
            {head: 'Name', cols: 'name', format: 'default'},
            {head: 'Quantity', cols: 'quantity', format: 'default'},
            {head: 'Remainder', cols: 'remainder', format: 'default'},
            {head: 'Interest', cols: 'interest', format: 'default'},
            {head: 'Issue Date', cols: 'updated_at', format: 'date'},
            {head: 'Status', cols: 'status', format: 'toggle'},
            {head: 'Action', cols: 'action', format: 'btnGroup'},
        ],
    }

}