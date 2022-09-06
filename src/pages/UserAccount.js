import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import BankAccounts from "../components/Account/BankAccounts";
import {API_USER_ACCOUNTS, getApiRoute} from "../utils/APIs";
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
            <DynamicTable form={UserAccountFormData} data={userAccounts}/>
            <BankAccounts/>
        </>
    );
};

export default UserAccount;