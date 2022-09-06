import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import { useEffect, useState} from "react";
import axios from "axios";
import {API_ACCOUNT_DELETE, API_ACCOUNT_PUT, API_ACCOUNTS_ALL, getApiRoute} from "../../utils/APIs";
import AlertDialog from "../../components/shared-dialog/AlertDialog";
import DynamicTable from "../../components/shared-forms/DynamicTable";
import Box from "@mui/material/Box";
import AddEditDialog from "../../components/shared-dialog/AddEditDialog";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import PageTitle from "../../components/shared-forms/PageTitle";
import VBButton from "../../components/shared-forms/VBButton";
import VBInputField from "../../components/shared-forms/VBInputField";
const initialAccount = {
    description: "",
    interest: 0,
    name: "",
    quantity: 0,
    remainder: 0,
    status: true,
    type: "saving"
}
const AccountTemplate = (props) => {
    const [data, setData] = useState(props.data);
    useEffect(()=>{
        setData(props.data);
    },[props.data])
    const FormFields = {
        schema: [
            {id: 'name', label: 'Account Name', name: 'name', type:'default', required:true},
            {id: 'description', label: 'Account Description', name: 'description', type:'multiline', required:true},
            {id: 'quantity', label: 'Quantity', name: 'quantity', type:'number', required:true},
            {id: 'remainder', label: 'Remainder', name: 'remainder', type:'number', required:true},
            {id: 'interest', label: 'Interest', name: 'interest', type: 'number', required:true},
            {id: 'status', label: 'Status', name: 'status', type: 'toggle', required:true},
        ]
    }
    return (
        <Box component="form" noValidate>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="type"
                value={data.type}
                onChange={props.cb.inputChange}
            >
                <FormControlLabel value="saving" control={<Radio/>} label="Saving"/>
                <FormControlLabel value="chequing" control={<Radio/>} label="Chequing"/>
            </RadioGroup>
            <Grid container spacing={2}>
                {FormFields.schema.map((form, idx) => (
                    <Grid key={`account-template-${idx}`} item xs={12} sm={(['quantity', 'remainder','interest'].includes(form.id)) ? 4 : 12}>
                        <VBInputField key={`account-template-input-${idx}`} form={form} data={data} cb={props.cb}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

const Account = () => {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);
    //Api
    const getData = () => {
        axios.get(getApiRoute(API_ACCOUNTS_ALL))
            .then((res) => {
                setAccounts(res.data);
            });
    }
    const addAccount = () => {
        axios.post(getApiRoute(API_ACCOUNTS_ALL), account)
            .then(res => {
                handleModalClose();
            })
    }
    const updateAccount = () => {
        axios.put(getApiRoute(API_ACCOUNT_PUT, {'dataId': account._id}), account)
            .then(res => {
                handleModalClose();
            })
    }
    const deleteAccount = (accountId = 1) => {
        axios.delete(getApiRoute(API_ACCOUNT_DELETE, {'accountId': accountId}))
            .then(res => {
                handleAlertModalClose();
            })
    }
    const resetAccount = () => {
        setAccount(initialAccount);
    }
    const handleModalClose = () => {
        setOpenModal(false);
        getData();
        resetAccount();
    };
    const handleAlertModalClose = () => {
        setOpenAlertModal(false);
        getData();
    };

    //Data that make up page
    const AlertFormData = {
        title: "Are you absolutely sure?",
        template: "",
        cb: {
            handleDelete: (user) => {
                deleteAccount(user._id)
            }
        }
    }
    const AccountTBData = {
        schema: [
            {head: 'Name', cols: 'name', format: 'default'},
            {head: 'Quantity', cols: 'quantity', format: 'default'},
            {head: 'Remainder', cols: 'remainder', format: 'default'},
            {head: 'Interest', cols: 'interest', format: 'default'},
            {head: 'Issue Date', cols: 'updated_at', format: 'date'},
            {head: 'Status', cols: 'status', format: 'toggle'},
            {head: 'Action', cols: 'action', format: 'btnGroup'},
        ],
        cb: {
            handleEdit: (row) => {
                setAccount(row);
                setOpenModal(true);
            },
            handleDelete: (row) => {
                setAccount(row);
                setOpenAlertModal(true);
            }
        }
    }
    const AddEditFormData = {
        title:  account._id === undefined ? 'Add Account' : 'Edit account',
        cb: {
            add: () => {
                addAccount(account)
            },
            edit: () => {
                updateAccount(account);
            }
        }
    }
    //Callback functions that make up page
    const PageCallBack={
        inputChange:(e)=>{
            const newdata = {...account}
            newdata[e.target.name] = e.target.value
            setAccount(newdata)
        },
        handleStatusToggle:()=>{
            setAccount((prevState)=>({...prevState, status: !account.status}));
        }
    }
    return (
        <Container component="main">
            <PageTitle title="Account Management"/>
            <VBButton title="Add Account" onClick={()=>setOpenModal(true)}/>
            {accounts.length !== 0 ?
                <DynamicTable form={AccountTBData} data={accounts}/>
                :
                <Typography variant="h5" gutterBottom component="div" mt={2}>
                    No data
                </Typography>
            }
            <AlertDialog open={openAlertModal} close={handleAlertModalClose} data={account} form={AlertFormData}/>
            <AddEditDialog open={openModal} close={handleModalClose} form={AddEditFormData}>
                    <AccountTemplate data={account} cb={PageCallBack}/>
            </AddEditDialog>
        </Container>
    );
};

export default Account;