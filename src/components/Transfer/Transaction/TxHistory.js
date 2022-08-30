import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import axios from "axios";
import { API_USER_TX, getApiRoute } from 'components/commons/module';
import DynamicTable from 'components/shared-forms/DynamicTable';
import PageTitle from 'components/shared-forms/PageTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const initialTx = {
  from: '',
  to: '',
  amount: '',
  source: '',
  type: '',
}

const TxHistory = (props) => {
  const params = useParams();
  const [txs, setTxs] = useState([]);
  const [tx, setTx] = useState(initialTx);

  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data._id])

  //${props.data._id}

  const getData = () => {
    axios.get(getApiRoute(API_USER_TX, { 'userAccountId': props.data._id }))
      .then((res) => {
        setTxs(res.data.userAccount.transactions);
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTxData = {
    schema: [
      { head: 'Id', cols: '_id', format: 'default' },
      { head: 'From', cols: 'from', format: 'default' },
      { head: 'To', cols: '_id', format: 'default' },
      { head: 'Amount', cols: 'amount', format: 'default' },
      { head: 'Source', cols: 'source', format: 'default' },
    ]
  }

  return (
    <Container component="main">
      {txs.length !== 0 ?
        <DynamicTable form={UserTxData} data={txs} />
        :
        <Typography variant="h5" gutterBottom component="div" mt={2}>
          No data
        </Typography>
      }
    </Container>
  );
};


export default TxHistory;