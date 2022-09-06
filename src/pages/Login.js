import * as React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";
import VBInputField from "../components/shared-forms/VBInputField";
import PageTitle from "../components/shared-forms/PageTitle";
import VBButton from "../components/shared-forms/VBButton";
import {API_AUTH} from 'utils/APIs';

const initialAlert = {
    open: false,
    message: '',
    status: 0
}
const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});
    const [alert, setAlert] = useState(initialAlert);
    useEffect(() => {
        if (localStorage.getItem('vb'))
            navigate("../")
    })
    //API
    const login = () => {
        axios.post(API_AUTH, data,{withCredentials: true, credentials: 'include'})
            .then(res => {
                localStorage.setItem("vb", JSON.stringify(res.data.user));
                window.location.assign("../");
            }).catch(e => {
            setAlert({...alert, open: true, message: e.response.data.message});
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        login();
    };

    const FormFields = {
        schema: [
            {id: 'email', label: 'Email Address', name: 'email', type: 'default', required: true},
            {id: 'password', label: 'Password', name: 'password', type: 'password', required: true}
        ]
    }
    const PageCallBack = {
        inputChange: (e) => {
            setData({...data, [e.target.name]: e.target.value});
        },
        inputBlur: (e) => {

        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <PageTitle title="Sign in"/>
            {FormFields.schema.map((form, idx) => (
                <VBInputField key={idx} form={form} data={data} cb={PageCallBack}/>
            ))}
            <VBButton title="Sign In" onClick={handleSubmit}/>
            Don't have an account?
            <Link href="/SignUp" variant="body2">
                Sign Up
            </Link>
            <SnackbarAlert alert={alert}/>
        </Container>
    );
};

export default Login;