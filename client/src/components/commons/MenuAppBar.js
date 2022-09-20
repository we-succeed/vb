import {useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import ProfileMenu from "./ProfileMenu";
import DrawerMenu from "./Drawer";
import {useNavigate} from "react-router-dom";

const MenuAppBar = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn] = useState((localStorage.getItem('vb')));
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
        background: '#2E3B55',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - 250px)`,
            marginLeft: `250px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    if (window.location.pathname === '/login') return null;
    return (
        <>
            <AppBar position="fixed" open={props.open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.drawerOpen}
                        edge="start"
                        sx={{
                            display: isLoggedIn ? 'block' : 'none',
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        Vancouver Bank
                    </Typography>
                    {isLoggedIn ? <ProfileMenu/>
                        :
                        <Button color="inherit" onClick={() => navigate(`/login`)}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            {isLoggedIn ? <DrawerMenu open={props.open} drawerOpen={props.drawerOpen}/> : ''}
        </>
    )
}

export default MenuAppBar;