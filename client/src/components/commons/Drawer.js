import React, {useContext, useState} from "react";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Icon} from "@mui/material";
import {USER_MENUS} from '../../utils/Menus'
import {getRoute} from '../../utils/APIs'
import {useLocation, useNavigate} from "react-router-dom";
import VBStyledCollection from "../VBStyledCollection";
import {UserContext} from "../../App";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
    drawerList: {
        fontSize: '1.3em'
    },
    drawerListItem: {
        '&:hover, &:focus, &:active, & .Mui-selected': {
            backgroundColor: 'rgb(38 17 65 / 23%) !important',
        },
        '&:hover $drawerListIcon, & .Mui-selected $drawerListIcon': {
            color:'#2E3B55',
        },
        '&:hover $drawerListText, & .Mui-selected $drawerListText': {
            color:'#2E3B55',
            fontWeight: '600'
        },
    },
    drawerListIcon: {
        color:'#838388',
    },
    drawerListText: {
        color:'#838388',
    },
    drawerListItemButton: {
        color: 'red',
    }
});

const DrawerMenu = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const [menus] = useState(USER_MENUS);
    const user = useContext(UserContext);
    const { pathname } = useLocation();
    const pathArr = pathname.split('/');
    let currentPage = pathArr[pathArr.length - 1 ].toLowerCase();
    return (
        <Drawer
            sx={{
                width: '250px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '250px',
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.open}

        >
            <VBStyledCollection.DrawerHeader>
                <IconButton onClick={props.drawerOpen}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </VBStyledCollection.DrawerHeader>
            <Divider />
            <List className={classes.drawerList}>
                {menus && menus.map((elem, index) => {
                    const path = getRoute(elem.path, {'userId':user._id})
                    return(
                    <ListItem key={index} disablePadding className={classes.drawerListItem}>
                        <ListItemButton onClick={() => navigate(path)} selected={elem.id.toLowerCase() === currentPage}>
                            <ListItemIcon>
                                <Icon className={classes.drawerListIcon}>{elem.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography className={classes.drawerListText}>{elem.name}</Typography>}
                                />
                        </ListItemButton>
                    </ListItem>
                )})}
            </List>
        </Drawer>
    );
}

export default DrawerMenu

