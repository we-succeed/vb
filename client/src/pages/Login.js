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

const initialAlert = {
    open: false,
    message: '',
    status: 0
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '-64px'
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
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    name: {
        fontWeight: '600 !important',
    },
}));

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [alert, setAlert] = useState(initialAlert);

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
    const PageCallBack = {
        inputChange: (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
        },
        inputBlur: (e) => {

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
                    <Typography component="h1" variant="h5" gutterBottom mb={3}>
                        Welcom to
                    </Typography>
                    <Typography className={classes.name} variant="h3" fontStyle='antialiased' mb={7}>Vancouver Bank</Typography>
                    <form className={classes.form} noValidate>
                        {Forms.Login.schema.map((form, idx) => (
                            <VBInputField key={idx} form={form} data={data} cb={PageCallBack} />
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
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
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