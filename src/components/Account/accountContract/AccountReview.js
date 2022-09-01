import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const AccountReview = (props) => {
    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Account Name - {props.userAccount?.name}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Account description
            </Typography>
            <div>
                {props.userAccount?.description}
            </div>
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
            </List>
        </>
    );
}

export default AccountReview;