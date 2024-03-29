import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect, useState} from "react";
import {Button} from "@mui/material";
import axios from "axios";
import {
    API_USER_INFO, API_USERS_ALL,
    getApiRoute
} from "../../utils/APIs";
import AlertDialog from "../../components/shared-dialog/AlertDialog";
import DynamicTable from "../../components/shared-forms/DynamicTable";
import Box from "@mui/material/Box";
import AddEditDialog from "../../components/shared-dialog/AddEditDialog";
import Grid from "@mui/material/Grid";
import VBInputField from "../../components/shared-forms/VBInputField";
import PageTitle from "../../components/shared-forms/PageTitle";
import {Forms} from "../../utils/Forms";

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

    return (
        <Box component="form" noValidate>
            <Grid container spacing={2}>
                {Forms.AdminUser.schema.map((form, idx) => (
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
                setUsers(res.data.users);
            });
    }
    const addUser= () => {
        axios.post(getApiRoute(API_USERS_ALL), user)
            .then(() => {
                handleModalClose();
            })
    }
    const updateUser = () => {
        axios.put(getApiRoute(API_USER_INFO,{'userId': user._id}) ,user)
            .then(() => {
                handleModalClose();
            })
    }
    const deleteUser = (userId = 1) => {
        axios.delete(getApiRoute(API_USER_INFO,{'userId': userId}))
            .then(() => {
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
            {head: 'User Account', cols: 'userAccounts', format: 'count'},
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
            <PageTitle title="User Management"/>
            <Button variant="contained" onClick={()=>setOpenModal(true)}> Add User </Button>
            <DynamicTable form={UserTBData} data={users}/>
            <AlertDialog open={openAlertModal} close={handleAlertModalClose} data={user} form={AlertFormData}/>
            <AddEditDialog open={openModal} close={handleModalClose} form={AddEditFormData}>
                <UserTemplate data={user} cb={PageCallBack}/>
            </AddEditDialog>
        </Container>
    );
};

export default User;