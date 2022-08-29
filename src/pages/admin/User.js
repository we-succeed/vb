import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import { useEffect, useState} from "react";
import {Button} from "@mui/material";
import axios from "axios";
import { API_USER_DELETE, API_USER_PUT,
    API_USERS_ALL,
    getApiRoute
} from "../../components/commons/module";
import AlertDialog from "../../components/shared-dialog/AlertDialog";
import DynamicTable from "../../components/shared-forms/DynamicTable";
import Box from "@mui/material/Box";
import AddEditDialog from "../../components/shared-dialog/AddEditDialog";
import Grid from "@mui/material/Grid";
import VBInputField from "../../components/shared-forms/VBInputField";
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

const UserTemplate = (props) => {
    const [user, setUser] = useState(props.data);
    useEffect(()=>{
        setUser(props.data);
    },[props.data])
    //Data that make up page
    const FormFields = {
        schema: [
            {id: 'firstName', label: 'First Name', name: 'firstName', type: 'default', required:true},
            {id: 'lastName', label: 'Last Name', name: 'lastName', type: 'default', required:true},
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required:true, disabled: true},
            {id: 'address', label: 'Address', name: 'address', type: 'default'},
            {id: 'city', label: 'City', name: 'city', type: 'default'},
            {id: 'province', label: 'Province', name: 'province', type: 'default'},
            {id: 'postalCode', label: 'Postal Code', name: 'postalCode', type: 'default'},
            {id: 'phoneNumber', label: 'Phone Number', name: 'phoneNumber', type: 'default'}
        ]
    }

    return (
        <Box component="form" noValidate>
            <Grid container spacing={2}>
                {FormFields.schema.map((form, idx) => (
                    <Grid key={`user-grid-${idx}`} item xs={12} sm={(['firstName', 'lastName'].includes(form.id)) ? 6 : 12}>
                        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={user} cb={props.cb}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

const User = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(getApiRoute(API_USERS_ALL))
            .then((res) => {
                setUsers(res.data);
            });
    }
    const addUser= () => {
        axios.post(getApiRoute(API_USERS_ALL), user)
            .then(res => {
                handleModalClose();
            })
    }
    const updateUser = () => {
        axios.put(getApiRoute(API_USER_PUT,{'dataId': user._id}) ,user)
            .then(res => {
                handleModalClose();
            })
    }
    const deleteUser = (userId = 1) => {
        axios.delete(getApiRoute(API_USER_DELETE,{'userId': userId}))
            .then(res => {
                handleAlertModalClose();
            })
    }
    const resetUser = () => {
        setUser(initialUser);
    }
    const handleModalClose = () => {
        setOpenModal(false);
        getData();
        resetUser();
    };
    const handleAlertModalClose = () => {
        setOpenAlertModal(false);
        getData();
    };
    const AlertFormData = {
        title: "Are you absolutely sure?",
        template: "",
        cb: {
            handleDelete: (account) => {
                deleteUser(account._id)
            }
        }
    }
    const UserTBData = {
        schema: [
            {head: 'Name', cols: ['firstName','lastName'], format: 'nameField'},
            {head: 'Email', cols: 'email', format: 'default'},
            {head: 'PhoneNumber', cols: 'phoneNumber', format: 'default'},
            {head: 'Accounts', cols: 'accounts', format: 'count'},
            {head: 'Action', cols: 'action', format: 'btnGroup'},
        ],
        cb: {
            handleEdit: (row) => {
                setUser(row);
                setOpenModal(true);
            },
            handleDelete: (row) => {
                setUser(row);
                setOpenAlertModal(true);
            }
        }
    }
    const AddEditFormData = {
        title:  user._id === undefined ? 'Add User' : 'Edit User',
        cb: {
            add: () => {
                addUser(user)
            },
            edit: () => {
                updateUser(user);
            }
        }
    }
    //Callback functions that make up page
    const PageCallBack = {
        inputChange: (e) => {
            setUser({...user, [e.target.name]: e.target.value});
        }
    }
    return (
        <Container component="main">
            <Typography variant="h5" gutterBottom component="div" mt={2}>
                User Management
            </Typography>
            <Button variant="contained" onClick={()=>setOpenModal(true)}> Add User </Button>
            {users.length !== 0 ?
                <DynamicTable form={UserTBData} data={users}/>
                :
                <Typography variant="h5" gutterBottom component="div" mt={2}>
                    No data
                </Typography>
            }
            <AlertDialog open={openAlertModal} close={handleAlertModalClose} data={user} form={AlertFormData}/>
            <AddEditDialog open={openModal} close={handleModalClose} form={AddEditFormData}>
                <UserTemplate data={user} cb={PageCallBack}/>
            </AddEditDialog>
        </Container>
    );
};

export default User;