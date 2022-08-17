import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";

const initialUserAccount = {
    name: '',
    description: ''
}
export default function AdditionalInfoForm(props) {
    const [userAccount,setUserAccount] = useState(initialUserAccount);
    useEffect(() =>{
        setUserAccount(props.data.user)
    })
    return (
        <>
            <Typography variant="h6" gutterBottom mb={3}>
                Additional Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth label="Nick Name" value={userAccount.name}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        value={userAccount.description}
                    />
                </Grid>
            </Grid>
        </>
    );
}