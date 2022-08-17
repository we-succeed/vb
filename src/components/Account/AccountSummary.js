import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import AccountItemList from "./AccountItemList";
import Typography from "@mui/material/Typography";
import {API_USER_ACCOUNTS_ALL, getApiRoute} from "../commons/module";

const AccountSummary = () => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    useEffect(()=> {
        axios
            .get(getApiRoute(API_USER_ACCOUNTS_ALL, {'userId': params.userId}))
            .then((res) => {
                setAccounts(res.data.accounts);
            })
            .catch((err) => console.log(err));
    },[])
    return (
        <>
            <AccountItemList userId={params.userId}/>
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Account List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Interest</TableCell>
                            <TableCell align="right">Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts && accounts.map((account, idx) => (
                            <TableRow
                                key={account.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {idx}
                                </TableCell>
                                <TableCell align="right">{account.type}</TableCell>
                                <TableCell align="right">{account.name}</TableCell>
                                <TableCell align="right">{account.description}</TableCell>
                                <TableCell align="right">{account.interest}</TableCell>
                                <TableCell align="right">{account.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AccountSummary;