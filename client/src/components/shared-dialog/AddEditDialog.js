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

const AddEditDialog = (props) => {
    const {children} = props
    return (
        <>    
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={props.open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close} color='#2e3b55' sx={{borderTop: '5px solid rgb(205 200 211)'}}>
                    {props.form.title.toUpperCase()}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                <DialogActions>
                    {(props.form.title).includes('Add') ? <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={props.form.cb.add}>
                        Submit
                    </Button> : <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={props.form.cb.edit}>
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
        </>
    );
}

export default AddEditDialog