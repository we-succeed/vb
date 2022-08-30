import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import axios from 'axios';
import { API_TX_POST, API_USER_ACCOUNTS_ALL, getApiRoute } from 'components/commons/module';
import SnackbarAlert from 'components/shared-dialog/SnackbarAlert';
import PageTitle from 'components/shared-forms/PageTitle';
import VBButton from 'components/shared-forms/VBButton';
import VBInputField from 'components/shared-forms/VBInputField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const initialTx = {
  userAccount: {
    _id: ''
  },
  from: '',
  to: '',
  amount: '',
  source: '',
  type: '',
}

const Transaction = (req, res) => {
  const params = useParams();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({ name: 'test' });
  const [data, setData] = useState(initialTx);

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


  useEffect(() => {
    getData();
  }, [])

  const createTX = () => {
    axios.post(getApiRoute(API_TX_POST), data).then(res => {
      setAlert({ ...alert, open: true, message: res.data.message, status: res.status });
    }).catch(e => {
      setAlert({ ...alert, open: true, message: 'Interval server error' });
      console.log(error.toJSON());
    })
  }
  
  const getData = () => {
    axios
      .get(getApiRoute(API_USER_ACCOUNTS_ALL, { 'userId': params.userId }))
      .then((res) => {
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTX();
  }

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  const 

  //Data that make up page
  const FormFields = {
    schema: [
      { id: 'amount', label: 'Amount', name: 'amount', type: 'default' },
      { id: 'source', label: 'Source', name: 'source', type: 'default' }
    ]
  }

  //Callback functions that make up page
  const PageCallBack = {
    inputChange: ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    }
  }

  return (

    <Container component="main" maxWidth="xs">

      <PageTitle title="Transaction" />
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">From</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="From"
          onChange={handleChange}
        >
          {accounts && accounts.map((row, idx) => (
            <MenuItem
              key={idx}
              value={row}
            >
              {row.name} ({row.number})
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">To</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="To"
          onChange={handleChange}
        >
          {accounts && accounts.map((row, idx) => (
            <MenuItem
              key={idx}
              value={row}
            >
              {row.name} ({row.number})
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      <Grid container spacing={2}>
        {FormFields.schema.map((form, idx) => (

          <VBInputField key={`user-profile-grid-${idx}`} form={form} data={data} cb={PageCallBack} />

        ))}
      </Grid>
      <VBButton title="Done" onClick={handleSubmit} fullWidth />
      <SnackbarAlert alert={alert} />
      <Link href="/" variant="body2">
        Cancel
      </Link>

    </Container>

  );
};

export default Transaction;