import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { getApiRoute, API_USER_ACCOUNTS_ALL, API_CONTACTS_ALL } from 'components/commons/module';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TransferHistory from './transferHistory';


const ContactEmailTr = () => {
    const params = useParams();
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({name:'test'});

    useEffect(()=> {
      getData();
    },[])
   
    const getData = () => {
      axios
      .get(getApiRoute(API_CONTACTS_ALL,{'userId':params.userId}))
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => console.log(err));
    }

    const handleChange = (event) => {
      setContact(event.target.value);  
    };

    return ( 
      <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Contact List</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={contact}
          label="Contacts"
          onChange={handleChange}
        >
          {contacts && contacts.map((row,idx) => (
            <MenuItem
              key={idx}
              value={row}
            >
              {row.name} ({row.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TransferHistory data={contact} />
      </>
    );
};

export default ContactEmailTr;