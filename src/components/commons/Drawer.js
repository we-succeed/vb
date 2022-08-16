import React, {useEffect, useState} from "react";
import {styled, useTheme} from "@mui/material/styles";
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
import {USER_MENUS, ADMIN_MENUS, getRoute} from '../commons/module'
import {useNavigate} from "react-router-dom";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const DrawerMenu = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [menus, setMenus] = useState();
    useEffect(()=>{
        if (props.userType === 'user')
            setMenus(USER_MENUS)
        else
            setMenus(ADMIN_MENUS);
    },[])
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
            <DrawerHeader>
                <IconButton onClick={props.drawerOpen}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menus && menus.map((elem, index) => {
                    const path = getRoute(elem.path, {'userId':props.user.id})
                    return(
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(path)}>
                            <ListItemIcon>
                                <Icon>{elem.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={elem.name} />
                        </ListItemButton>
                    </ListItem>
                )})}
            </List>
        </Drawer>
    );
}

export default DrawerMenu

