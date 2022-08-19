import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_USER_PUT, API_USERS_ALL, getApiRoute} from "../commons/module";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const UserDialogs = (props) => {
    const [data, setData] = useState({})
    useEffect(() => {
        setData(props.data);
    }, [props.data])

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(getApiRoute(API_USERS_ALL), data)
            .then(res => {
                props.close();
            })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(getApiRoute(API_USER_PUT,{'dataId': data._id}) ,data)
            .then(res => {
                props.close();
            })
      
    }
    function handleChange(e) {
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        setData(newdata)
    } 
    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close} color='red'>
                    {data['_id'] === undefined ? 'Add User' : 'Edit user'}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box component="form" noValidate>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    id="outlined-basic"
                                    label="firstName"
                                    name="firstName"
                                    value={data.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="lastName"
                                    label="lastName"
                                    id="outlined-basic"
                                    value={data.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled = {(data['_id'])}
                                    type="text"
                                    fullWidth
                                    id="outlined-basic"
                                    label="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="number"
                                    fullWidth
                                    id="outlined-basic"
                                    label="phoneNumber"
                                    name="phoneNumber"
                                    value={data.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} hidden = {!(data['_id'])}>
                                <Typography variant="body2" component="span" >
                                    <button>{data.accounts?.length}</button>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="province"
                                    label="province"
                                    id="outlined-basic"
                                   value={data.province}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="city"
                                    label="city"
                                    id="outlined-basic"
                                    value={data.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="address"
                                    label="address"
                                    id="outlined-basic"
                                    value={data.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    name="postalCode"
                                    label="postalCode"
                                    id="outlined-basic"
                                    value={data.postalCode}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {data['_id'] === undefined ? <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit}>
                        Submit
                    </Button> : <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleEdit}>
                        Edit
                    </Button>}
                    <Button
                        type="reset"
                        variant="outlined"
                        sx={{mt: 3, mb: 2}}
                        onClick={()=>props.close()}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default UserDialogs