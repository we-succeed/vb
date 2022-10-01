import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import SnackbarAlert from '../../components/shared-dialog/SnackbarAlert';
import PageTitle from '../../components/shared-forms/PageTitle';
import VBButton from '../../components/shared-forms/VBButton';
import VBInputField from '../../components/shared-forms/VBInputField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_USER_ACCOUNTS, API_USER_CONTACTS, API_USER_ETRANSFER, API_USER_TRANSFER, getApiRoute } from '../../utils/APIs';


const initialTx = {
    from: '',
    to: '',
    amount: '',
    source: '',
    type: '',
}

const TransferTxForm = (props) => {
    console.log(props.state)
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [tx, setTx] = useState(initialTx);

    const [error, setError] = useState({
        from: '',
        to: '',
        amount: '',
        source: '',
        type: '',
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });


    useEffect(() => {
        if (props.state)
            getData();
        if (props.state.type === 'eTransfer')
            getContacts();
        setTx({ ...tx, 'from': props.state.account._id });
    }, [])

    const createTX = () => {
        const url = (props.state.type === 'transfer') ? API_USER_TRANSFER : API_USER_ETRANSFER;
        const data = { tx, auth: props.auth }
        axios.post(getApiRoute(API_USER_TRANSFER, { 'userAccountId': tx.from }), data).then(res => {
            setAlert({ ...alert, open: true, message: res.data.message, status: res?.status });
        }).catch(e => {
            setAlert({ ...alert, open: true, message: 'Interval server error' });
            console.log(e.toJSON());
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
            })
            .catch((err) => console.log(err));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        createTX();
    }

    //Data that make up page
    const FormFields = {
        transfer: {
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
                        list: accounts && accounts
                            .filter(row => (row._id !== tx.from)), value: '_id', fields: ['name', 'number']
                    }
                },
                { id: 'amount', label: 'Amount', name: 'amount', type: 'default' },
                { id: 'description', label: 'Description', name: 'description', type: 'default' },
            ]
        },
        eTransfer: {
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
    }

    //Callback functions that make up page
    const PageCallBack = {
        inputChange: ({ currentTarget: input }) => {
            setTx({ ...tx, [input.name]: input.value });
        },
        selectChange: (e) => {
            setTx({ ...tx, [e.target.name]: e.target.value });
        }
    }

    return (
        <Container component="main">
            <PageTitle title={props.state.type === 'transfer' ? 'Transfer' : 'Send Money'} />
            {props.state.type && FormFields[props.state.type].schema.map((form, idx) => (
                <VBInputField key={`user-profile-grid-${idx}`} form={form} data={tx} cb={PageCallBack} />
            ))}
            <VBButton title="Done" onClick={handleSubmit} fullWidth />
            <SnackbarAlert alert={alert} />
            <Link href="/client/src/pages" variant="body2">
                Cancel
            </Link>
        </Container>

    );
};

export default TransferTxForm;