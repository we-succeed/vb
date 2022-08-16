import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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
import {useState} from "react";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const AccountDialogs = (props) => {


    const [data, setData] = useState({
        type: "",
        name: "",
        description: "",
        quantity: 30,
        remainder:0,
        interest: 0,
        status: ''
    })


    function submit(e) {
        e.preventDefault();
        axios.post('http://localhost:5002/api/admin/accounts',data)
        .then(res=>{
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
                // onClose={props.close}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close} color='red'>
                    Add Account
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box component="form" noValidate >
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="type"
                            value={data.type}
                            onChange={handleChange}                  
                        >
                            <FormControlLabel value="saving" control={<Radio />} label="Saving" />
                            <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                        </RadioGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type="text"
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Account Name"
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
                                    rows={4}
                                    label="Account Description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="number"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Quantity"
                                    name="quantity"
                                    value={data.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="number"
                                    required
                                    fullWidth
                                    name="remainder"
                                    label="Remainder"
                                    id="outlined-basic"
                                    value={data.remainder}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    type="number"
                                    required
                                    fullWidth
                                    name="interest"
                                    label="Interest"
                                    id="outlined-basic"
                                    value={data.interest}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Switch name="Status" />
                                    }
                                    labelPlacement="start"
                                    label="Status"
                                    value={data.status}
                                    sx={{ marginLeft: '0' }}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => submit(e)}>
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default AccountDialogs