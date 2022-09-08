import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import SnackbarAlert from 'components/shared-dialog/SnackbarAlert';
import PageTitle from 'components/shared-forms/PageTitle';
import VBButton from 'components/shared-forms/VBButton';
import VBInputField from 'components/shared-forms/VBInputField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    API_USER_ACCOUNTS,
    API_USER_CONTACTS,
    API_USER_TRANSFER,
    getApiRoute
} from 'utils/APIs';


const initialTr = {
    from: '',
    to: '',
    amount: '',
    description: '',
    type: '',
}

const Transfer = (props) => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [tr, setTr] = useState(initialTr);

    const [error] = useState({
        from: '',
        to: '',
        amount: '',
        description: '',
        type: '',
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });


    useEffect(() => {
        getData();
        getContacts();
        setTr({ ...tr, 'from': props.state.account._id });
    }, [])

    const createTr = () => {
        axios.post(getApiRoute(API_USER_TRANSFER, { 'userAccountId': tr.from }), tr).then(res => {
            setAlert({ ...alert, open: true, message: res.data.message, status: res?.status });
        }).catch(err => {
            setAlert({ ...alert, open: true, message: 'Interval server error' });
            console.log(err.toJSON());
        })
    }

    const getData = () => {
        axios
            .get(getApiRoute(API_USER_ACCOUNTS, { 'userId': params.userId }))
            .then((res) => {
                setAccounts(res.data.userAccounts);
            })
            .catch((err) => console.log(err));
    }

    const getContacts = () => {
        axios.get(getApiRoute(API_USER_CONTACTS, { 'userId': params.userId }))
            .then((res) => {
                setContacts(res.data.contacts);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTr();
    }

    //Data that make up page
    const FormFields = {
        schema: [
            {
                id: 'from',
                label: 'From',
                name: 'from',
                type: 'select',
                select: { list: accounts, value: '_id', fields: ['name', 'number'] }
            },
            {
                id: 'to',
                label: 'To',
                name: 'to',
                type: 'select',
                select: {
                    list: contacts, value: '_id', fields: ['name', 'email']
                }
            },
            { id: 'amount', label: 'Amount', name: 'amount', type: 'default' },
            { id: 'description', label: 'Description', name: 'description', type: 'default' },
        ]
    }

    //Callback functions that make up page
    const PageCallBack = {
        inputChange: ({ currentTarget: input }) => {
            setTr({ ...tr, [input.name]: input.value });
        },
        selectChange: (e) => {
            setTr({ ...tr, [e.target.name]: e.target.value });
        }
    }

    return (
        <Container component="main">
            <PageTitle title="E-Transfer" />
            {FormFields.schema.map((form, idx) => (
                <VBInputField key={`user-profile-grid-${idx}`} form={form} data={tr} cb={PageCallBack} />
            ))}
            <VBButton title="Done" onClick={handleSubmit} fullWidth />
            <SnackbarAlert alert={alert} />
            <Link href="/" variant="body2">
                Cancel
            </Link>
        </Container>

    );
};

export default Transfer;