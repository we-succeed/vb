import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {API_USER_INFO,  getApiRoute} from 'components/commons/module';
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";
import PageTitle from "../components/shared-forms/PageTitle";
import VBButton from "../components/shared-forms/VBButton";
import VBInputField from "../components/shared-forms/VBInputField";

const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
}
const initialAlert = {
    open: false,
    message: '',
    status: 0
}
const Profile = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(initialUser);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(initialAlert);

    useEffect(() => {
        getData();
    });

    //API
    const getData = () => {
        axios.get(getApiRoute(API_USER_INFO, {userId}))
            .then((res) => {
                setUser(res.data);
            }).catch(function (e) {
            setAlert({...alert, open: true, message: e.data.message, severity: 'warning'});
        });
    }
    const updateUser = () => {
        axios.put(getApiRoute(API_USER_INFO, {userId}),user)
            .then(res => {
                setAlert({...alert, open: true, message: res.data.message, status: res.status});
            }).catch(e => {
                setAlert({...alert, open: true, message: 'Interval server error'});
                console.log(error.toJSON());
        })
    }

    //Page features
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    }

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
    //Callback functions that make up page
    const PageCallBack = {
        inputChange: (e) => {
            setUser({...user, [e.target.name]: e.target.value});
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <PageTitle title="Edit Profile"/>
            <Grid container spacing={2}>
                {FormFields.schema.map((form, idx) => (
                    <Grid key={`user-grid-${idx}`} item xs={12} sm={(['firstName', 'lastName'].includes(form.id)) ? 6 : 12}>
                        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={user} cb={PageCallBack}/>
                    </Grid>
                ))}
            </Grid>
            <VBButton title="Edit" onClick={handleSubmit} fullWidth/>
            <Link href="/src/pages" variant="body2">
                Cancel
            </Link>
            <SnackbarAlert alert={alert}/>
        </Container>
    );
};

export default Profile;