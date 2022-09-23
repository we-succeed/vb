import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BankAccount from "./BankAccount";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_BANK_ACCOUNTS, getApiRoute} from "../../utils/APIs";
import PageTitle from "../shared-forms/PageTitle";

export default function BankAccounts() {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios
            .get(getApiRoute(API_BANK_ACCOUNTS))
            .then((res) => {
                setAccounts(res.data);
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <Box>
                <PageTitle title="Recommended Accounts"/>
                <Grid container spacing={2}>
                    {accounts && accounts.map((account, idx) => (
                        <BankAccount key={idx} account={account}/>
                    )).splice(0, 5)}
                </Grid>
            </Box>
        </>
    );
}