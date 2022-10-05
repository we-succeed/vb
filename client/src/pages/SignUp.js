import React, { useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import VBInputField from "../components/shared-forms/VBInputField";
import VBButton from "../components/shared-forms/VBButton";
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";
import { Forms } from "../utils/Forms";
import { API_ADD_USER } from '../utils/APIs';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Paper, Typography } from '@mui/material';

const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#2e3b5521",
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
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    name: {
        fontWeight: '600 !important',
        fontSize: '2rem',
        color: '#2e3b55'
    }
}));

const SignUp = () => {
    const [user, setUser] = useState(initialUser);
    const [error, setError] = useState({
        'firstName': {status: false, message: 'FirstName is required'},
        'lastName': {status: false, message: 'Last Name is required'},
        'email': {status: false, message: 'Email is required'},
        'password': {status: false, message: 'Password is required'},
        'confirmPassword': {status: false, message: ''}
        });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ADD_USER, user);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setAlert({ ...alert, open: true, message: error.response.data.message });
            }
        }
    }
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
            case 'confirmPassword':
                if (e.target.value !== user.password)
                    setError({ ...error, [e.target.name]: {status:true, message: 'Password and Confirm Password does not match.'}});
                else
                    setError({ ...error, [e.target.name]: {status:false}});
                break;
        }
    }
    const isDisabled = () => {
        return (Object.values(error).filter(obj => obj.status === false).length !== 0)
            && (Object.values(user).filter(value => value !== '').length === 0);
    }
    //Callback functions that make up page
    const PageCallBack = {
        inputChange: (e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
        },
        inputBlur: (e) => {
            handleErrorCheck(e)
        }
    }


    const classes = useStyles();

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
                    <Typography className={classes.name} variant="h5" fontStyle='antialiased' mb={4.5}>
                        Ready to start?
                    </Typography>
                    <Typography mb={5}>You're a few steps away from banking online.</Typography>
                    <FormControl>
                        {/* Temporary hiding RadioGroup */}
                        {/* <RadioGroup
                    row
                    space-around
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={user.role}
                >
                    <FormControlLabel value="Admin" name="role" onChange={handleChange} control={<Radio/>}
                                      label="Admin"/>
                    <FormControlLabel value="User" name="role" onChange={handleChange} control={<Radio/>}
                                      label="User"/>
                </RadioGroup> */}
                    </FormControl>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            {Forms.SignUp.schema.map((form, idx) => (
                                <Grid key={`user-grid-${idx}`} item xs={12}
                                    sm={(['firstName', 'lastName'].includes(form.id)) ? 6 : 12}>
                                    <VBInputField key={`user-profile-grid-${idx}`}
                                                  form={form}
                                                  data={user}
                                                  errors={error}
                                        cb={PageCallBack} />
                                </Grid>
                            ))}
                        </Grid>
                        <VBButton title="Sign Up" onClick={handleSubmit} fullWidth disabled = {isDisabled()} />
                        Already have an account?
                        <Link href="/login" variant="h6" sx={{fontSize: '15px', fontWeight: 'bold'}}>
                            Sign in
                        </Link>
                        <SnackbarAlert alert={alert} />
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default SignUp;