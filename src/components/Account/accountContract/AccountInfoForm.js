import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function AccountInfoForm(props) {
    const [account, setAccount] = useState(props.account)
    useEffect(() => {
        setAccount(props.account);
    }, [props.account])
    return (
        <>
            <Typography variant="h6" gutterBottom mb={3}>
                Account Information
            </Typography>
            <List disablePadding>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Type"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {account.type.toUpperCase()}
                    </Typography>
                </ListItem>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Name"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {account.name}
                    </Typography>
                </ListItem>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Interest"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {account.interest}%
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
                        value={account.description}
                    />
                </Grid>
            </Grid>
        </>
    );
}