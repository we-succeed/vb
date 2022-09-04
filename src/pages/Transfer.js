import { Container } from '@mui/material';
import axios from "axios";
import { API_USER_ACCOUNTS_ALL, API_CONTACTS_ALL, getApiRoute } from 'components/commons/module';
import VBInputField from 'components/shared-forms/VBInputField';
import TransferHistory from 'components/Transfer/SendMoney/transferHistory';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/shared-forms/PageTitle";


const ContactEmail = () => {
  const params = useParams();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios
      .get(getApiRoute(API_CONTACTS_ALL,{'userId':params.userId}))
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => console.log(err));
  }

  //Data that make up page
  const FormFields = {
    schema: [
      {
        id: 'Contact List',
        label: 'Contact List',
        name: 'ContactList',
        type: 'select',
        select: { list: contacts, value: '_id', fields: ['name', 'number'] }
      }
    ]
  }

  const PageCallBack = {
    inputChange: ({ currentTarget: input }) => {
      setContact({ ...contact, [input.name]: input.value });
    },
    selectChange: (event) => {
      setContact({ ...contact, ['_id']: event.target.value });

    }
  }

  return (
    <Container component="main">
      <PageTitle title="Transaction History" />
      {FormFields.schema.map((form, idx) => (
        <VBInputField key={`user-profile-grid-${idx}`} form={form} data={contact} cb={PageCallBack} />
      ))}
      <TransferHistory data={contact} />
    </Container>
  );
};

export default ContactEmail;