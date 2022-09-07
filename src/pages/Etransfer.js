import { Container } from '@mui/material';
import axios from "axios";
import {API_USER_ACCOUNTS, getApiRoute} from 'utils/APIs';
import PageTitle from 'components/shared-forms/PageTitle';
import VBInputField from 'components/shared-forms/VBInputField';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransferHistory from '../components/Transfer/SendMoney/transferHistory';


const Etransfer = () => {
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
      <PageTitle title="Etransfer History" />
      {FormFields.schema.map((form, idx) => (
        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={account} cb={PageCallBack}/>
      ))}
      <TransferHistory data={account} />
    </Container>
  );
};

export default Etransfer;