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
                            <TableCell style={{width: '5%', fontWeight: 'bold'}}>No</TableCell>
                            <TableCell style={{width: '5%', fontWeight: 'bold'}}>Type</TableCell>
                            <TableCell style={{width: '10%', fontWeight: 'bold'}}>Interest</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Description</TableCell>
                            <TableCell align='right' style={{fontWeight: 'bold'}}>Balance($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts && accounts.map((ua, idx) => (
                            <TableRow
                                key={ua.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{ua.account.type}</TableCell>
                                <TableCell>{ua.account.interest}</TableCell>
                                <TableCell>{ua.name}</TableCell>
                                <TableCell>{ua.description}</TableCell>
                                <TableCell align='right'>{ua.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AccountSummary;