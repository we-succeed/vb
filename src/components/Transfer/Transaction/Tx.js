import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Transaction = (req, res) => {
  const [data, setData] = useState({
    userAccount: {
      _id: ''
    },
    from: '',
    to: '',
    amount: '',
    source: '',
    type: '',
  });

  const [error, setError] = useState({
    from: '',
    to: '',
    amount: '',
    source: '',
    type: '',
  });

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info'
  });


  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = 'http://localhost:5003/api/tx'
      const result = await axios.post(API, data);
      console.log(result);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
        setAlert({ ...alert, open: true, message: error.response.data.message, severity: 'warning' });
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
            Transaction
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <form autoComplete='off'>
                  <TextField
                    autoComplete="from"
                    name="from"
                    required
                    fullWidth
                    id="from"
                    label="From"
                    onChange={handleChange}
                    value={data.from}
                    autoFocus
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
                <form autoComplete='off'>
                  <TextField
                    required
                    fullWidth
                    id="to"
                    label="To"
                    name="to"
                    onChange={handleChange}
                    value={data.to}
                    autoComplete="to"
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
                <form autoComplete='off'>
                  <TextField
                    required
                    fullWidth
                    id="amount"
                    label="Amount"
                    name="amount"
                    onChange={handleChange}
                    value={data.amount}
                    autoComplete="amount"
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
                <form autoComplete='off'>
                  <TextField
                    required
                    fullWidth
                    id="source"
                    label="Source"
                    name="source"
                    onChange={handleChange}
                    value={data.source}
                    autoComplete="source"
                  />
                </form>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Done
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

export default Transaction;