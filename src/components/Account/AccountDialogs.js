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

const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    console.log('working')
}



const AccountDialogs = (props) => {
    return (
        <div>
            <BootstrapDialog
                onClose={props.close}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close} color='red'>
                    Add Account
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={'saving'}
                        >
                            <FormControlLabel value="saving" control={<Radio />} label="Saving" />
                            <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                        </RadioGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="accountName"
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Account Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    label="Account Description"
                                    name="description"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Quantity"
                                    name="quantity"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="remainder"
                                    label="Remainder"
                                    id="outlined-basic"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="interest"
                                    label="Interest"
                                    id="outlined-basic"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Switch name="Status" />
                                    }
                                    labelPlacement="start"
                                    label="Status"
                                    sx={{ marginLeft: '0' }}
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
                    >
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