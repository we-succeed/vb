import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function AccountInfoForm(props) {
    return (
        <>
            <Typography variant="h6" gutterBottom mb={3}>
                Account Information
            </Typography>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Type" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account.type.toUpperCase()}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Name" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account.name}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Interest" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account.interest}%
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} mt={1}>
                    <Typography variant="subtitle1">
                        Description
                    </Typography>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        variant={"filled"}
                        disabled={true}
                        value={props.account.description}
                    />
                </Grid>
            </Grid>

        </>
    );
}