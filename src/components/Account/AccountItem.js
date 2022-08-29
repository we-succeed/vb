import * as React from 'react';
import Grid from "@mui/material/Grid";
import {Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export default function AccountItem(props) {
    const navigate = useNavigate();
    return (
        <Grid item xs={6} md={3}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://picsum.photos/id/1053/400/300"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.account.type.toUpperCase()}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {props.account.name} | {props.account.interest + '%'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{minHeight: '60px'}}>
                            {props.account.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => navigate(`/accounts/${props.account._id}/open`)}>
                        Open Account
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}