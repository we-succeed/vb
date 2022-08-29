import React, {useState} from "react";
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
import {USER_MENUS, getRoute} from './module'
import {useNavigate} from "react-router-dom";
import VBStyledCollection from "../VBStyledCollection";

const DrawerMenu = (props) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [menus, setMenus] = useState(USER_MENUS);
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

