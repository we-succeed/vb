import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import BankAccounts from "../components/Account/BankAccounts";
import Typography from "@mui/material/Typography";
import {API_USER_ACCOUNTS, getApiRoute} from "../components/commons/module";
import DynamicTable from "../components/shared-forms/DynamicTable";
import PageTitle from "../components/shared-forms/PageTitle";

const UserAccount = () => {
    const params = useParams();
    const [userAccounts, setUserAccounts] = useState([]);
    useEffect(()=> {
        getData();
    },[])

    const getData = () => {
        axios
            .get(getApiRoute(API_USER_ACCOUNTS, {'userId': params.userId}))
            .then((res) => {
                setUserAccounts(res.data.userAccounts);
            })
            .catch((err) => console.log(err));
    }
    const UserAccountFormData = {
        schema: [
            {head: 'Type', cols: 'account.type', format: 'default'},
            {head: 'Interest', cols: 'account.interest', format: 'default'},
            {head: 'Account Name', cols: 'name', format: 'default'},
            {head: 'Account Description', cols: 'description', format: 'default'},
            {head: 'Balance($)', cols: 'balance', format: 'default'},
        ]
    }
    return (
        <>
            <PageTitle title="User Accounts"/>
            {userAccounts && userAccounts.length !== 0 ?
                <DynamicTable form={UserAccountFormData} data={userAccounts}/>
                :
                <Typography variant="h5" gutterBottom component="div" mt={2}>
                    No account has been opened
                </Typography>
            }
            <BankAccounts/>
        </>
    );
};

export default UserAccount;