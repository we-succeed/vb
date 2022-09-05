import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import axios from "axios";
import { API_USER_TR, getApiRoute } from 'components/commons/module';
import DynamicTable from 'components/shared-forms/DynamicTable';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const initialTr = {
  from: '',
  to: '',
  amount: '',
  description: '',
  type: '',
}

const TransferHistory = (props) => {
  const params = useParams();
  const [trs, setTrs] = useState([]);
  const [tr, setTr] = useState(initialTr);

  useEffect(() => {
    if (props.data) {
      getData();
    }
  }, [props.data._id])


  const getData = () => {
    axios.get(getApiRoute(API_USER_TR, { 'userAccountId': props.data._id }))
      .then((res) => {
        setTrs(res.data.userAccount.transfers);
      }).catch(e => {
        console.log(e);
      });
  }

  const UserTrData = {
    schema: [
      { head: 'Id', cols: '_id', format: 'default' },
      { head: 'From', cols: 'from', format: 'default' },
      { head: 'To', cols: 'to', format: 'default' },
      { head: 'Amount', cols: 'amount', format: 'default' },
      { head: 'Description', cols: 'description', format: 'default' },
    ]
  }

  return (
    <Container component="main">
      {trs.length !== 0 ?
        <DynamicTable form={UserTrData} data={trs} />
        :
        <Typography variant="h5" gutterBottom component="div" mt={2}>
          No data
        </Typography>
      }
    </Container>
  );
};


export default TransferHistory;