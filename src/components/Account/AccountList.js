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
import {Button} from "@mui/material";
import AccountDialogs from "./AccountDialogs";


const AccountList = ({onToggle, onDelete}) => {
    const [account, setAccount] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5002/api/admin/accounts')
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            });
    }, []);

    const handleModalOpen = () => {
        setOpenModal(true)
    }
    const handleModalClose = () => {
        setOpenModal(false);
    };

    const deleteTask = (data) => {
        setAccount(account.filter((account) => account.data !==data))
    }
    
    const addTask = (account) => {
        console.log(account)
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
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Remainder</TableCell>
                                <TableCell>Interest</TableCell>
                                <TableCell>Issue date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {account && account.map((row, idx) => (
                                
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                 
                                    
                                >
                                    <TableCell component="th" scope="row">
                                        {idx + 1} 
                                    </TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.remainder}</TableCell>
                                    <TableCell>{row.interest}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AccountDialogs open = {openModal} close = {handleModalClose} />
            </Container>
    );
};

export default AccountList;