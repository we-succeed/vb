import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.form.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.form.template}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={()=>props.form.cb.handleDelete(props.data)} autoFocus  variant="outlined" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
