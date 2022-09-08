import Container from '@mui/material/Container';
import axios from "axios";
import DynamicTable from 'components/shared-forms/DynamicTable';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { API_USER_TRANSACTION, API_USER_TRANSFER, getApiRoute } from 'utils/APIs';


const TxHistory = (props) => {
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data._id])

  const getData = () => {
    const url = props.type === 'transaction' ? API_USER_TRANSACTION : API_USER_TRANSFER;
    axios.get(getApiRoute(url, { 'userAccountId': props.data._id }))
      .then((res) => {
        if (url === API_USER_TRANSACTION) {
          setTxs(res.data.userAccounts.transactions);
        } else {
          setTxs(res.data.userAccounts.transfers);
        }
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTxData = {
    transaction: {
      schema: [
        { head: 'To (Number)', cols: 'to.number', format: 'default' },
        { head: 'To (Name)', cols: 'to.name', format: 'default' },
        { head: 'Amount', cols: 'amount', format: 'default' },
        { head: 'Source', cols: 'source', format: 'default' },
      ]
    },
    transfer: {
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


export default TxHistory;