import { Button, Container } from '@mui/material';
import axios from "axios";
import VBInputField from 'components/shared-forms/VBInputField';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_USER_ACCOUNTS, getApiRoute } from 'utils/APIs';
import PageTitle from "../components/shared-forms/PageTitle";
import TxHistory from '../components/Transfer/Transaction/TxHistory';


const Transaction = () => {
  const params = useParams();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios
      .get(getApiRoute(API_USER_ACCOUNTS, { 'userId': params.userId }))
      .then((res) => {
        setAccounts(res.data.userAccounts);
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();
  const handleChange = () => {
    navigate(`./tx`, { state: { account } })
  }

  //Data that make up page
  const FormFields = {
    schema: [
      {
        id: 'UserAccount',
        label: 'User Account',
        name: 'UserAccount',
        type: 'select',
        select: { list: accounts, value: '_id', fields: ['name', 'number'] }
      }
    ]
  }

  const PageCallBack = {
    inputChange: ({ currentTarget: input }) => {
      setAccount({ ...account, [input.name]: input.value });
    },
    selectChange: (event) => {
      setAccount({ ...account, '_id': event.target.value });
    }
  }

  return (
    <Container component="main">
      <PageTitle title="Transaction History" />
      {FormFields.schema.map((form, idx) => (
        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={account} cb={PageCallBack} />
      ))}
      <TxHistory data={account} type='transaction' />
      <Button variant="contained" onClick={handleChange}> Transfer </Button>
    </Container>
  );
};

export default Transaction;