import { Button } from "@mui/material";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { API_CONTACT_DELETE, API_CONTACT_PUT,
  API_CONTACTS_ALL,
  getApiRoute
} from "../components/commons/module";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import AddEditDialog from "../components/shared-dialog/AddEditDialog";
import AlertDialog from "../components/shared-dialog/AlertDialog";
import DynamicTable from "../components/shared-forms/DynamicTable";
import VBInputField from "../components/shared-forms/VBInputField";
import SnackbarAlert from "components/shared-dialog/SnackbarAlert";


const initialContact = {
  name: "",
  email: "",
  mobile: ""
}
const initialAlert = {
  open: false,
  message: '',
  status: 0
}
const ContactTemplate = (props) => {
  const [contact, setContact] = useState(props.data);
  console.log(contact);
  useEffect(() => {
    setContact(props.data);
  }, [props.data])
  //Data that make up page
  const FormFields = {
    schema: [
      { id: 'name', label: 'Name', name: 'name', type: 'default', required: true },
      { id: 'email', label: 'Email', name: 'email', type: 'default', required: true },
      { id: 'mobile', label: 'Mobile', name: 'mobile', type: 'default', required: true },
    ]
  }

  return (
    <Box component="form" noValidate>
      <Grid container spacing={1}>
        {FormFields.schema.map((form, idx) => (
          <Grid key={`user-grid-${idx}`} item xs={12} sm={(['name', 'email'].includes(form.id)) ? 12 : 12}>
            <VBInputField key={`user-profile-grid-${idx}`} form={form} data={contact} cb={props.cb} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

const ContactList = () => {
  const params = useParams();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(initialContact);
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alert, setAlert] = useState(initialAlert);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get(getApiRoute(API_CONTACTS_ALL,{'userId':params.userId}))
      .then((res) => {
        setContacts(res.data);
      });
  }
  const addContact = () => {
    axios.post(getApiRoute(API_CONTACTS_ALL,{'userId':params.userId}), contact)
      .then(res => {
        setAlert({ ...alert, open: true, message: res.data.message, status: res.status });
        handleModalClose();
      })
  }
  const updateContact = (id) => {
    axios.put(getApiRoute(API_CONTACT_PUT,{'dataId': id}), contact)
      .then(res => {
        setAlert({ ...alert, open: true, message: res.data.message, status: res.status });
        handleModalClose();
      })

  }
  const deleteContact = (id) => {
    axios.delete(getApiRoute(API_CONTACT_DELETE,{'contact_id': id}))
      .then(res => {
        setAlert({ ...alert, open: true, message: res.data.message, status: res.status });
        handleAlertModalClose();
      })
  }
  const resetContact = () => {
    setContact(initialContact);
  }

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false);
    getData();
    resetContact();
  };
  const handleAlertModalClose = () => {
    setOpenAlertModal(false);
    getData();
  };
  const AlertFormData = {
    title: "Are you absolutely sure?",
    template: "",
    cb: {
      handleDelete: (contact) => {
        deleteContact(contact._id)
      }
    }
  }


  const ContactTBData = {
    schema: [
      { head: 'Name', cols: 'name', format: 'default' },
      { head: 'Email', cols: 'email', format: 'default' },
      { head: 'Mobile', cols: 'mobile', format: 'default' },
      { head: 'Update Date', cols: 'updated_at', format: 'date'},
      { head: 'Action', cols: 'action', format: 'btnGroup' },

    ],
    cb: {
      handleEdit: (row) => {
        setContact(row);
        setOpenModal(true);
      },
      handleDelete: (row) => {
        setContact(row);
        setOpenAlertModal(true);
      }
    }
  }
  const AddEditFormData = {
    title: contact._id === undefined ? 'Add Contact' : 'Edit Contact',
    cb: {
      add: () => {
        addContact(contact)
      },
      edit: () => {
        updateContact(contact._id);
      }
    }
  }
  //Callback functions that make up page
  const PageCallBack = {
    inputChange: (e) => {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }
  }

  return (
    <Container component="main">
      <Typography variant="h5" gutterBottom component="div" mt={2}>
        Contact Management
      </Typography>
      <Button variant="contained" onClick={handleModalOpen}> Add Contact </Button>
      {contacts.length !== 0 ?
        <DynamicTable form={ContactTBData} data={contacts} />
        :
        <Typography variant="h5" gutterBottom component="div" mt={2}>
          No data
        </Typography>
      }
      <AlertDialog open={openAlertModal} close={handleAlertModalClose} data={contact} form={AlertFormData} />
      <AddEditDialog open={openModal} close={handleModalClose} form={AddEditFormData}>
        <ContactTemplate data={contact} cb={PageCallBack} />
      </AddEditDialog>
      <SnackbarAlert alert={alert} />

    </Container>
  );
};


export default ContactList;
