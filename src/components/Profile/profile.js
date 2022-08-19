import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { API_USER_INFO, getApiRoute } from 'components/commons/module';

const theme = createTheme();

const Profile = () => {
    const {userId} = useParams();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
        phoneNumber: "",
    });

    const [error, setError] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity:'info'
    });

    const handleClose = () => {
        setAlert({ ...alert, open: false });
    };



    useEffect(() => {
        (async () => {
            try {
                
                const url = getApiRoute(API_USER_INFO, {userId});
                const user = await axios.get(url);
                setData(user.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    const handleInput = (e) => {
        console.log(e.target.name, " : ", e.target.value);
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = getApiRoute(API_USER_INFO, {userId});
            const result  = await axios.put(url, data);
            if (result.status === 200)
                setAlert({ ...alert, open: true, message: result.data.message, severity:'success' });
            else
                setAlert({ ...alert, open: true, message: 'bed request', severity:'warning' });
            
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                setAlert({ ...alert, open: true, message: 'bed request', severity:'warning' });
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={handleInput}
                                    value={data.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={handleInput}
                                    value={data.lastName}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={data.email}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="address"
                                    label="address"
                                    type="address"
                                    id="address"
                                    onChange={handleInput}
                                    value={data.address}
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="city"
                                    label="city"
                                    type="city"
                                    id="city"
                                    onChange={handleInput}
                                    value={data.city}
                                    autoComplete="city"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="province"
                                    label="province"
                                    type="province"
                                    id="province"
                                    onChange={handleInput}
                                    value={data.province}
                                    autoComplete="province"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="postalCode"
                                    label="postalCode"
                                    type="postalCode"
                                    id="postalCode"
                                    onChange={handleInput}
                                    value={data.postalCode}
                                    autoComplete="postalCode"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="phoneNumber"
                                    label="phoneNumber"
                                    type="phoneNumber"
                                    id="phoneNumber"
                                    onChange={handleInput}
                                    value={data.phoneNumber}
                                    autoComplete="phoneNumber"
                                />
                            </Grid>

                        </Grid>
                        {error && <div>{error}</div>}
                        {/* <Box sx={{ width: '100%' }}> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Edit
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={alert.open}
                            onClose={handleClose}
                            key={'123'}
                        >
                            <Alert onClose={handleClose} severity={alert.severity} sx={{ mt: '4rem', width: '100%' }}>
                                {alert.message}
                            </Alert>
                        </Snackbar>

                        {/* </Box> */}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Cancel
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Profile;