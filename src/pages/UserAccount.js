import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import AccountItemList from "../components/Account/AccountItemList";
import Typography from "@mui/material/Typography";
import {API_USER_ACCOUNTS_ALL, getApiRoute} from "../components/commons/module";
import DynamicTable from "../components/shared-forms/DynamicTable";
import PageTitle from "../components/shared-forms/PageTitle";

const UserAccount = () => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    useEffect(()=> {
        getData();
    })

    const getData = () => {
        axios
            .get(getApiRoute(API_USER_ACCOUNTS_ALL, {'userId': params.userId}))
            .then((res) => {
                setAccounts(res.data.accounts);
            })
            .catch((err) => console.log(err));
    }
    const UserAccountFormData = {
        schema: [
            {head: 'Type', cols: 'type', format: 'default'},
            {head: 'Interest', cols: 'interest', format: 'default'},
            {head: 'Account Name', cols: 'name', format: 'default'},
            {head: 'Account Description', cols: 'description', format: 'default'},
            {head: 'Balance($)', cols: 'balance', format: 'default'},
        ]
    }
    return (
        <>
            <PageTitle title="User Accounts"/>
            {accounts.length !== 0 ?
                <DynamicTable form={UserAccountFormData} data={accounts}/>
                :
                <Typography variant="h5" gutterBottom component="div" mt={2}>
                    No account has been opened
                </Typography>
            }
            <AccountItemList/>
        </>
    );
};

export default UserAccount;