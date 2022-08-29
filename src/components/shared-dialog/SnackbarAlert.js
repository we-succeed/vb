import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useEffect, useState} from "react";

const SnackbarAlert = (props) => {
    const [alert, setAlert] = useState({});
    useEffect(()=> {
        setAlert(props.alert);
    },[props.alert])

    const handleClose = () => {
        setAlert({...alert, open: false});
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alert.open}>
                <Alert onClose={handleClose}
                       severity={((alert.status) && (alert.status === 200 || alert.status === 204))? "success" : "warning"}
                       sx={{ mt: '4rem', width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackbarAlert;