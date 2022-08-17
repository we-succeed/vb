import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { API_USERS } from 'components/commons/module';

const theme = createTheme();

const Signup = () => {
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    PhoneNumber: "",
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

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value});
    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(API_USERS, data);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
        setAlert({ ...alert, open: true, message: error.response.data.message, severity:'warning' });
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <form autoComplete='off'>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                value={data.firstName}
                autoFocus
              />
            </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <form autoComplete='off'>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                autoComplete="family-name"
              />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form autoComplete='off'>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={data.email}
                autoComplete="email"
              />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form autoComplete='off'>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={data.password}
                autoComplete="new-password"
              />
              </form>
            </Grid>
          </Grid>
          {error && <div>{error}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
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

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default Signup;