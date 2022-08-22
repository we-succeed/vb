import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
export default function AccountReview(props) {
    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {props.userAccount?.name}
            </Typography>
            <Typography variant="h6" gutterBottom mt={3}>
                User Information
            </Typography>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="User Name" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.user?.firstName}{props.user?.lastName}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="User Email" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.user?.email}
                    </Typography>
                </ListItem>
            </List>
            <Typography variant="h6" gutterBottom  mt={3}>
                Account summary
            </Typography>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Account Type" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account?.type}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Account Interest" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account?.interest} %
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Account Name" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {props.account?.name}
                    </Typography>
                </ListItem>
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
                            value={props.account?.description}
                        />
                    </Grid>
                </Grid>

            </List>
        </>
    );
}