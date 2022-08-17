import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const theme = createTheme();


const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('vb'))
            navigate("../")
    }, [])
    const [data, setData] = useState({email: "", password: ""});
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleClose = () => {
        setAlert({...alert, open: false});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/auth";
            const result = await axios.post(url, data);
            localStorage.setItem("vb", JSON.stringify(result.data.user));
            window.location.assign("../")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setAlert({...alert, open: true, message: error.response.data.message, severity: 'warning'});
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <form autoComplete="off">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                            />
                        </form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            value={data.password}
                            autoComplete="current-password"
                        />
                        {/* {error && <div>{error}</div>} */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            open={alert.open}
                            onClose={handleClose}
                            key={'123'}
                        >
                            <Alert onClose={handleClose} severity={alert.severity} sx={{mt: '4rem', width: '100%'}}>
                                {alert.message}
                            </Alert>
                        </Snackbar>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;