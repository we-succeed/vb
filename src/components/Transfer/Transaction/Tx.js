import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import axios from 'axios';
import { API_TX_POST, getApiRoute } from 'components/commons/module';
import SnackbarAlert from 'components/shared-dialog/SnackbarAlert';
import PageTitle from 'components/shared-forms/PageTitle';
import VBButton from 'components/shared-forms/VBButton';
import VBInputField from 'components/shared-forms/VBInputField';
import React, { useState } from 'react';


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

  const createTX = () => {
    axios.post(getApiRoute(API_TX_POST), data).then(res => {
      setAlert({ ...alert, open: true, message: res.data.message, status: res.status });
    }).catch(e => {
      setAlert({ ...alert, open: true, message: 'Interval server error' });
      console.log(error.toJSON());
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTX();
  }

  //Data that make up page
  const FormFields = {
    schema: [
      { id: 'from', label: 'From', name: 'from', type: 'default' },
      { id: 'to', label: 'To', name: 'to', type: 'default' },
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