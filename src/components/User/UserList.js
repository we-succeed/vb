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
import axios from "axios";
import UserDialogs from "./UserDialogs";

const initialUser = {
  name: "",
  province: "",
  city: "",
  address:"",
  postalCode:"",
  email:"",
  phoneNumber:""

}

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('http://localhost:5002/api/users')
        .then((res) => {
          setUsers(res.data);
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
    setUser(row);
    setOpenModal(true);
  }
  const reset = () => {
    setUser(initialUser)
  }
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5002/api/users/${id}`)
        .then(res => {
            getData();
            console.log(res.data.message)
        })
  }

  return (
    <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                User Management
            </Typography>
            <Button variant="contained" onClick={handleModalOpen}> Add User </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>PhoneNumber</TableCell>
                            <TableCell>Province</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>PostalCode</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.firstName + row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell>{row.province}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.postalCode}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => handleEditModal(row)}>update</Button>
                                    <Button variant="outlined" color="error" onClick={(e) => deleteUser(row._id)}>delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserDialogs open={openModal} close={handleModalClose} data={user}/>
        </Container>
  );
};


export default UserList;
