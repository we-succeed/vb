import React, { useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { API_ADD_USER } from '../utils/APIs';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import VBInputField from "../components/shared-forms/VBInputField";
import VBButton from "../components/shared-forms/VBButton";
import SnackbarAlert from "../components/shared-dialog/SnackbarAlert";
import { Forms } from "../utils/Forms";
import { makeStyles } from '@mui/styles';
import { CssBaseline, Paper, Typography } from '@mui/material';

const initialUser = {
    role: "User",
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
        role: "User",
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
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleChange = ({ currentTarget: input }) => {
        setUser({ ...user, [input.name]: input.value });
    }

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
                setError(error.response.data.message)
                setAlert({ ...alert, open: true, message: error.response.data.message });
            }
        }
    }
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (user.confirmPassword && value !== user.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = user.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (user.password && value !== user.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }
    //Callback functions that make up page
    const PageCallBack = {
        inputChange: (e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
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
                                    <VBInputField key={`user-profile-grid-${idx}`} form={form} data={user}
                                        cb={PageCallBack} />
                                </Grid>
                            ))}
                        </Grid>
                        <VBButton title="Sign Up" onClick={handleSubmit} fullWidth />
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