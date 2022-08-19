import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function AdditionalInfoForm(props) {
    return (
        <>
            <Typography variant="h6" gutterBottom mb={3}>
                Additional Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        label="name"
                        value={props.data.name}
                        name="name"
                        onChange={props.onHandleChange}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        label="Account Description"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        value={props.data.description}
                        onChange={props.onHandleChange}
                    />
                </Grid>
            </Grid>
        </>
    );
}