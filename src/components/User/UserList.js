import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import axios from "axios";
import UserDialogs from "./UserDialogs";
import {API_USER_DELETE, API_USERS_ALL, getApiRoute} from "../commons/module";

const initialUser = {
  firstName: "",
  lastName: "",
  email:"",
  phoneNumber:"",
  province: "",
  city: "",
  address:"",
  postalCode:"",
  password:'000000',
  accounts:[],
  confirmPassword:'000000',
  role:'User'
}

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({
    'open':true,
    'severity':'info',
    'message':'',
  })


  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get(getApiRoute(API_USERS_ALL))
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
  const handleAlert = (data) => {
    setAlert({open: true, severity: 'success', message: data.message})
  }
  const deleteUser = (id) => {
    axios.delete(getApiRoute(API_USER_DELETE,{'userId':id}))
        .then(res => {
            getData();
            setAlert({
              'open': true,
              'severity': 'info',
              'message': res.data.message
            })
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
                            <TableCell>Accounts</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, 'cursor':'pointer'}}
                                onClick={(e) => handleEditModal(row)}
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.firstName + row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell>{row.accounts?.length}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => handleEditModal(row)}>update</Button>
                                    <Button variant="outlined" color="error" onClick={(e) => deleteUser(row._id)}>delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserDialogs open={openModal} close={handleModalClose} data={user} handleAlert={handleAlert}/>
            <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={alert.open}
                    key={'123'}
                >
                    <Alert severity={alert.severity} sx={{ mt: '4rem', width: '100%' }}>
                    {alert.message}
                    </Alert>
                </Snackbar>
        </Container>
  );
};


export default UserList;
