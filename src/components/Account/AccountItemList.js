import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountItem from "./AccountItem";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_ACCOUNTS_ALL, getApiRoute} from "../commons/module";

export default function AccountItemList(props) {
    const [accounts, setAccounts] = useState([]);
    useEffect(()=> {
        getData();
    },[])
    const getData = () => {
        axios
            .get(getApiRoute(API_ACCOUNTS_ALL))
            .then((res) => {
                if (res.status === 200)
                    setAccounts(res.data);
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <Box sx={{flexGrow: 1,
                margin: 0,
                width:'80%',
                bottom: '30px',
                position: 'absolute'}}>

                <Typography variant="h6" gutterBottom component="div" mt={2}>
                    Recommended Accounts
                </Typography>
                <Grid container spacing={2}>
                    {accounts && accounts.map((account, idx) => (
                        <AccountItem key={idx} account={account} userId={props.userId}/>
                    )).splice(0,5)}
                </Grid>
            </Box>
        </>
    );
}