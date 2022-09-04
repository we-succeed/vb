import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import { API_TR_POST, API_USER_ACCOUNTS_ALL, getApiRoute } from 'components/commons/module';
import SnackbarAlert from 'components/shared-dialog/SnackbarAlert';
import PageTitle from 'components/shared-forms/PageTitle';
import VBButton from 'components/shared-forms/VBButton';
import VBInputField from 'components/shared-forms/VBInputField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const initialTr = {
    from: '',
    to: '',
    amount: '',
    desc: '',
    type: '',
}

const Transfer = (req, res) => {
    const params = useParams();
    const [transfers, setTransfers] = useState([]);
    const [tr, setTr] = useState(initialTr);

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

    const createTR = () => {
        axios.post(getApiRoute(API_TR_POST), tr).then(res => {
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
                setTransfers(res.data.accounts);
            })
            .catch((err) => console.log(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTR();
    }

    //Data that make up page
    const FormFields = {
        schema: [
            {
                id: 'from',
                label: 'From',
                name: 'from',
                type: 'select',
                select: {list: transfers, value: '_id', fields: ['name','number']}
            },
            {
                id: 'to',
                label: 'To',
                name: 'to',
                type: 'select',
                select: {
                    list: transfers
                        .filter(row => (row._id === tr.from)), value: '_id', fields: ['name','number']
                }
            },
            {id: 'amount', label: 'Amount', name: 'amount', type: 'default'},
            {id: 'description', label: 'Description', name: 'description', type: 'default'},
        ]
    }

    //Callback functions that make up page
    const PageCallBack = {
        inputChange: ({currentTarget: input}) => {
            setTr({...tr, [input.name]: input.value});
        },
        selectChange: (e) => {
            setTr({...tr, [e.target.name]: e.target.value});
        }
    }

    return (
        <Container component="main">
            <PageTitle title="Transfer"/>
                {FormFields.schema.map((form, idx) => (
                    <VBInputField key={`user-profile-grid-${idx}`} form={form} data={tr} cb={PageCallBack}/>
                ))}
            <VBButton title="Done" onClick={handleSubmit} fullWidth/>
            <SnackbarAlert alert={alert} />
            <Link href="/" variant="body2">
                Cancel
            </Link>
        </Container>

    );
};

export default Transfer;