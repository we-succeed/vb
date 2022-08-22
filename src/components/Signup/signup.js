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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';


const theme = createTheme();

const Signup = () => {
  
  const [data, setData] = useState({
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
    showPassword: false,
    showConfirmPassword: false,
  });
  
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
    severity:'info'
  });

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value});
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

  const onInputChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
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
          } else if (data.confirmPassword && value !== data.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = data.confirmPassword ? "" : error.confirmPassword;
          }
          break;
   
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (data.password && value !== data.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
   
        default:
          break;
      }
   
      return stateObj;
    });
  }

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setData({
      ...data,
      showConfirmPassword: !data.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <FormControl>
      <RadioGroup
        row
        space-around
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={data.role}
      >
        <FormControlLabel value="Admin" name="role" onChange={handleChange} control={<Radio />} label="Admin" />
        <FormControlLabel value="User"  name="role" onChange={handleChange} control={<Radio />} label="User" />
      </RadioGroup>
    </FormControl>
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
              <OutlinedInput
                id='standard-adornment-password'
                required
                fullWidth
                name="password"
                label="Password"
                type={data.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {data.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={data.password}
                onChange={onInputChange}
                onBlur={validateInput}
                />
                {error.password && <span className='err'>{error.password}</span>}
              </form>
            </Grid>
            <Grid item xs={12}>
              <form autoComplete='off'>
              <OutlinedInput
                id='standard-adornment-password'
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={data.showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {data.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={data.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
                />
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              </form>
            </Grid>
                </Grid>
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