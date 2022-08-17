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
import {Grid, RadioGroup, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Radio from '@mui/material/Radio';
import axios from "axios";
import {useEffect, useState} from "react";


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
    const [switchToggle, setSwitchToggle] = useState(false);
    useEffect(() => {
        setData(props.data);
    }, [props.data])

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5002/api/users', data)
            .then(res => {
                props.close();
            })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5002/api/users/${data._id}`, data)
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
                        {/* <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="saving" control={<Radio/>} label="Saving"/>
                            <FormControlLabel value="chequing" control={<Radio/>} label="Credit"/>
                        </RadioGroup> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="text"
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="User Name"
                                    autoFocus
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={1}
                                    label="User Email"
                                    name="User Email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="number"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="PhoneNumber"
                                    name="phonenumber"
                                    value={data.phonenumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="text"
                                    required
                                    fullWidth
                                    name="province"
                                    label="Province"
                                    id="outlined-basic"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="text"
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="outlined-basic"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                {/* <FormControlLabel
                                    control={
                                        <Switch name="Status"
                                                checked={switchToggle}
                                                onClick={handleStatusToggle}
                                        />
                                    }
                                    labelPlacement="start"
                                    label="Status"
                                    value={data.status}
                                    sx={{marginLeft: '0'}}/> */}
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
                        onClick={()=>props.close()}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default UserDialogs