import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import axios from 'axios';
import {API_TX_POST, API_USER_ACCOUNTS_ALL, getApiRoute} from 'components/commons/module';
import SnackbarAlert from 'components/shared-dialog/SnackbarAlert';
import PageTitle from 'components/shared-forms/PageTitle';
import VBButton from 'components/shared-forms/VBButton';
import VBInputField from 'components/shared-forms/VBInputField';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';


const initialTx = {
    from: '',
    to: '',
    amount: '',
    source: '',
    type: '',
}

const Transaction = (req, res) => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
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
        getData();
    }, [])

    const createTX = () => {
        axios.post(getApiRoute(API_TX_POST), tx).then(res => {
            setAlert({...alert, open: true, message: res.data.message, status: res.status});
        }).catch(e => {
            setAlert({...alert, open: true, message: 'Interval server error'});
            console.log(error.toJSON());
        })
    }

    const getData = () => {
        axios
            .get(getApiRoute(API_USER_ACCOUNTS_ALL, {'userId': params.userId}))
            .then((res) => {
                setAccounts(res.data.accounts);
            })
            .catch((err) => console.log(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTX();
    }

    const handleChange = (e) => {
        setTx({...tx, [e.target.name]: e.target.value});
    };

    //Data that make up page
    const FormFields = {
        schema: [
            {
                id: 'from',
                label: 'From',
                name: 'from',
                type: 'select',
                select: {list: accounts, value: '_id', fields: ['name','number']}
            },
            {
                id: 'to',
                label: 'To',
                name: 'to',
                type: 'select',
                select: {
                    list: accounts
                        .filter(row => (row._id !== tx.from)), value: '_id', fields: ['name','number']
                }
            },
            {id: 'amount', label: 'Amount', name: 'amount', type: 'default'},
            {id: 'source', label: 'Source', name: 'source', type: 'default'},
        ]
    }

    //Callback functions that make up page
    const PageCallBack = {
        inputChange: ({currentTarget: input}) => {
            setTx({...tx, [input.name]: input.value});
        },
        selectChange: (e) => {
            setTx({...tx, [e.target.name]: e.target.value});
        }
    }

    return (

        <Container component="main">
            <PageTitle title="Transaction"/>
                {FormFields.schema.map((form, idx) => (
                    <VBInputField key={`user-profile-grid-${idx}`} form={form} data={tx} cb={PageCallBack}/>
                ))}
            <VBButton title="Done" onClick={handleSubmit} fullWidth/>
            <SnackbarAlert alert={alert} />
            <Link href="/" variant="body2">
                Cancel
            </Link>

        </Container>

    );
};

export default Transaction;