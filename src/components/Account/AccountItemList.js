import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountItem from "./AccountItem";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AccountItemList(props) {
    const [accounts, setAccounts] = useState([]);
    useEffect(()=> {
        axios
            .get(`http://localhost:5000/api/accounts`)
            .then((res) => {
                if (res.status === 200)
                    setAccounts(res.data);
            })
            .catch((err) => console.log(err));
    },[])
    return (
        <>
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Recommended accounts
            </Typography>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {accounts && accounts.map((account, idx) => (
                        <AccountItem key={idx} account={account} userId={props.userId}/>
                    ))}
                </Grid>
            </Box>
        </>
    );
}