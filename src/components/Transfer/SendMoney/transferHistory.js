import Container from '@mui/material/Container';
import axios from "axios";
import {API_USER_TRANSFER, getApiRoute} from 'utils/APIs';
import DynamicTable from 'components/shared-forms/DynamicTable';
import * as React from 'react';
import {useEffect, useState} from 'react';

const TransferHistory = (props) => {
  const [trs, setTrs] = useState([]);

  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data])


  const getData = () => {
    axios.get(getApiRoute(API_USER_TRANSFER, { 'userAccountId': props.data._id }))
      .then((res) => {
        setTrs(res.data.userAccounts.transfers);
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTrData = {
    schema: [
      { head: 'To (name)', cols: 'to.name', format: 'default' },
      { head: 'To (e-mail)', cols: 'to.email', format: 'default' },
      { head: 'Amount', cols: 'amount', format: 'default' },
      { head: 'Description', cols: 'description', format: 'default' },
    ]
  }
  return (
    <Container component="main">
      <DynamicTable form={UserTrData} data={trs} />
    </Container>
  );
};


export default TransferHistory;