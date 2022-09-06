import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { getApiRoute, API_USER_ACCOUNTS } from 'utils/APIs';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TransferHistory from './transferHistory';


const UserAccountsTr = () => {
    const params = useParams();
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState({name:'test'});

    useEffect(()=> {
      getData();
    },[])

    const getData = () => {
      axios
      .get(getApiRoute(API_USER_ACCOUNTS, {'userId': params.userId}))
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Accounts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          label="Accounts"
          onChange={handleChange}
        >
          {accounts && accounts.map((row,idx) => (
            <MenuItem
              key={idx}
              value={row}
            >
              {row.name} ({row.number})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TransferHistory data={account} />
      </>
    );
};

export default UserAccountsTr;