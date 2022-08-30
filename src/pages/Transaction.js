import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from "axios";
import { API_USER_ACCOUNTS_ALL, getApiRoute } from 'components/commons/module';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TxHistory from '../components/Transfer/Transaction/TxHistory';
import PageTitle from "../components/shared-forms/PageTitle";


const UserAccounts = () => {
  const params = useParams();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({ name: 'test' });

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios
      .get(getApiRoute(API_USER_ACCOUNTS_ALL, { 'userId': params.userId }))
      .then((res) => {
        setAccounts(res.data.accounts);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  return (
    <>
      <PageTitle title="Transaction History" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Accounts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="Accounts"
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
      <TxHistory data={account} />
    </>
  );
};

export default UserAccounts;