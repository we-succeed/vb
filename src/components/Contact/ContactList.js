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
import ContactDialogs from "./ContactDialogs";
// import {API_USER_DELETE, API_USERS_ALL, getApiRoute} from "../commons/module";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useParams } from 'react-router-dom';

const initialContact = {
  name: "",
  email: "",
  mobile:""
}

const ContactList = () => {
  const params = useParams();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(initialContact);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get(`http://localhost:5003/api/contacts/${params.userId}`)
        .then((res) => {
          setContacts(res.data);
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
    setContact(row);
    setOpenModal(true);
  }

  const reset = () => {
    setContact(initialContact)
  }

  const deleteContact = (id) => {
    axios.delete(`http://localhost:5003/api/contacts/${id}`)
        .then(res => {
            getData();
        })
}

  return (
    <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                Contact Management
            </Typography>
            <Button variant="contained" onClick={handleModalOpen}> Add Contact </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>PhoneNumber</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts && contacts.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, 'cursor':'pointer'}}
                                
                            >
                                <TableCell component="th" scope="row">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.mobile}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => handleEditModal(row)}>update</Button>
                                    <Button variant="outlined" color="error" onClick={(e) => deleteContact(row._id)}>delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ContactDialogs open={openModal} close={handleModalClose} data={contact} userId={params.userId}/>
        </Container>
  );
};


export default ContactList;
