import * as React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Button, Switch} from "@mui/material";
import AccountDialogs from "./AccountDialogs";
import axios from "axios";
import {API_ADMIN_ACCOUNTS_ALL} from "../commons/module";

const initialAccount = {
    type: "saving",
    name: "",
    description: "",
    quantity: 0,
    remainder:0,
    interest: 0,
    status: 'open'
}

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(initialAccount);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch(API_ADMIN_ACCOUNTS_ALL)
            .then((response) => response.json())
            .then((data) => {
                setAccounts(data);
            });
    }
    const handleModalOpen = () => {
        setOpenModal(true)
    }
    const handleModalClose = () => {
        reset();
        setOpenModal(false);
        getData();
    };
    const handleEditModal = (row) => {
        setAccount(row);
        setOpenModal(true);
    }
    const reset = () => {
        setAccount(initialAccount)
    }
    const deleteAccount = (id) => {
        axios.delete(`http://localhost:5000/api/admin/accounts/${id}`)
            .then(res => {
                getData();
                // console.log(res.data.message)
            })
    }
    return (
        <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Account Management
            </Typography>
            <Button variant="contained" onClick={handleModalOpen}> Add Account </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Types</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Remainder</TableCell>
                            <TableCell>Interest</TableCell>
                            <TableCell>Issue date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts && accounts.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>12312</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.remainder}</TableCell>
                                <TableCell>{row.interest}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell><Switch disabled defaultChecked={row.status ==='open'}/></TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => handleEditModal(row)}>update</Button>
                                    <Button variant="outlined" color="error" onClick={(e) => deleteAccount(row._id)}>delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AccountDialogs open={openModal} close={handleModalClose} data={account}/>
        </Container>
    );
};

export default AccountList;