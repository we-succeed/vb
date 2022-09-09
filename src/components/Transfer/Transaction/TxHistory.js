import Container from '@mui/material/Container';
import axios from "axios";
import {API_USER_TRANSFER, getApiRoute} from 'utils/APIs';
import DynamicTable from 'components/shared-forms/DynamicTable';
import * as React from 'react';
import { useEffect, useState } from 'react';


const TxHistory = (props) => {
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data._id])
  const getData = () => {
    axios.get(getApiRoute(API_USER_TRANSFER, { 'userAccountId': props.data._id }))
      .then((res) => {
        setTxs(res.data.userAccounts.transfers);
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTxData = {
    schema: [
      { head: 'To (Number)', cols: 'to.number', format: 'default' },
      { head: 'To (Name)', cols: 'to.name', format: 'default' },
      { head: 'Amount', cols: 'amount', format: 'default' },
      { head: 'Source', cols: 'source', format: 'default' },
    ]
  }

  return (
    <Container component="main">
      <DynamicTable form={UserTxData} data={txs} />
    </Container>
  );
};


export default TxHistory;