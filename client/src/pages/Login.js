import { makeStyles } from '@mui/styles';
import { Checkbox, CssBaseline, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";
import VBButton from "../components/shared-forms/VBButton";
import VBInputField from "../components/shared-forms/VBInputField";
import { API_AUTH } from '../utils/APIs';
import { Forms } from "../utils/Forms";
import {InitialAlert} from "../utils/InitialInfo";



const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor:"#2e3b5521",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '-64px',
    },
    size: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        margin: theme.spacing(10, 6),
        display: "flex",
        flexDirection: "column",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    name: {
        fontWeight: '600 !important',
        color: '#2e3b55'
    },
}));

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [alert, setAlert] = useState(InitialAlert);
    const [error, setError] = useState({'email': {status: false, message: ''},
        'password': {status: false, message: ''}});

    useEffect(() => {
        if (localStorage.getItem('vb'))
            navigate(`../user/${JSON.parse(localStorage.getItem('vb'))['_id']}/accounts`)
    })
    //API
    const login = () => {
        axios.post(API_AUTH, data, { withCredentials: true, credentials: 'same-origin' })
            .then(res => {
                localStorage.setItem("vb", JSON.stringify(res.data.user));
                window.location.assign("../");
            }).catch(e => {
                setAlert({ ...alert, open: true, message: e.response.data.message });
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        login();
    };
    const handleErrorCheck = async (e) => {
            switch (e.target.name) {
                case 'email':
                    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value) && e.target.value.length !== 0){
                        setError({ ...error, [e.target.name]: {status:true, message: `${e.target.name} was not available.`}});
                    } else {
                        setError({ ...error, [e.target.name]: {status:false}});
                    }
                    break;
                case 'password':
                    if (e.target.value.length === 0)
                        setError({ ...error, [e.target.name]: {status:false}});
                    else if (e.target.value.length < 8)
                        setError({ ...error, [e.target.name]: {status:true, message: `${e.target.name} to be a minimum of 8 characters`}});
                    else if (!/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_]).{8,}$/.test(e.target.value))
                        setError({ ...error, [e.target.name]: {status:true, message: `Include a special character and at least one capital letter`}});
                    break;
            }
    }
    const PageCallBack = {
        inputChange: (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
        },
        inputBlur: (e) => {
            handleErrorCheck(e)
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
                className={classes.size}
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={1}
                square
                boxShadow={0}
            >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" gutterBottom mb={1.5}>
                        Welcom Back,
                    </Typography>
                    <Typography className={classes.name} variant="h3" fontStyle='antialiased' mb={4}>Vancouver Bank</Typography>
                    <form className={classes.form} noValidate>
                        {Forms.Login.schema.map((form, idx) => (
                            <VBInputField key={idx} form={form} data={data} cb={PageCallBack} errors={error}/>
                        ))}
                        <Grid>
                            <FormControlLabel
                                control={<Checkbox value="remember" color='primary' />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid>
                            <VBButton title="Sign In" fullWidth onClick={handleSubmit} />
                        </Grid>
                        <Grid container>
                            <Grid item>
                                Don't have an account?
                                <Link href="/signup" variant="h6" sx={{fontSize: '15px', fontWeight: 'bold'}}>
                                    Sign up
                                </Link>
                            </Grid>
                        </Grid>
                        <SnackbarAlert alert={alert} />
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default Login;