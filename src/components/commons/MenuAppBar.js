import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AppBar, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import ProfileMenu from "./ProfileMenu";
import DrawerMenu from "./Drawer";
import {useNavigate} from "react-router-dom";

const MenuAppBar = (props) => {
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
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
    const LoggedMenu = () => {
        return (<>
                <AppBar position="fixed" open={props.open}>
                    <Toolbar>
                        <IconButton

                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.drawerOpen}
                            edge="start"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                            Vancouver Bank
                        </Typography>
                        <ProfileMenu user={props.auth}/>
                    </Toolbar>
                </AppBar>
                <DrawerMenu open={props.open} drawerOpen={props.drawerOpen} userType={'user'} user={props.auth}/>
            </>
        )
    }
    const CommonMenu = () => {
        const navigate = useNavigate();
        return (
            <>
                <AppBar position="fixed" open={props.open}>
                    <Toolbar>
                        <Typography variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        flexGrow: 1
                                    }}>
                            Vancouver Bank
                        </Typography>
                        <Button color="inherit" onClick={() => navigate(`/login`)}>Login</Button>
                    </Toolbar>
                </AppBar>
            </>
        )
    }
    return (
        <>
            {props.isLoggedIn ? <LoggedMenu/> : <CommonMenu/>}
        </>
    )
}

export default MenuAppBar;