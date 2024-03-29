import Container from '@mui/material/Container';
import axios from "axios";
import DynamicTable from '../../components/shared-forms/DynamicTable';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {  API_USER_ETRANSFER, API_USER_TRANSFER, getApiRoute } from '../../utils/APIs';


const TransferHistory = (props) => {
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data._id])

  const getData = () => {
    const url = props.type !== 'transfers' ? API_USER_ETRANSFER : API_USER_TRANSFER;
    axios.get(getApiRoute(url, { 'userAccountId': props.data._id }))
      .then((res) => {
        setTxs(res.data.userAccounts[props.type]);
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTxData = {
    transfers: {
      schema: [
        { head: 'To (Number)', cols: 'to.number', format: 'default' },
        { head: 'To (Name)', cols: 'to.name', format: 'default' },
        { head: 'Amount', cols: 'amount', format: 'default' },
        { head: 'Source', cols: 'source', format: 'default' },
      ]
    },
    eTransfers: {
      schema: [
        { head: 'To (Name)', cols: 'to.name', format: 'default' },
        { head: 'To (e-mail)', cols: 'to.email', format: 'default' },
        { head: 'Amount', cols: 'amount', format: 'default' },
        { head: 'Description', cols: 'description', format: 'default' },
      ]
    },
  }

  return (
    <Container component="main">
      <DynamicTable form={UserTxData[props.type]} data={txs} />
    </Container>
  );
};


export default TransferHistory;