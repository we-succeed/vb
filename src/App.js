import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/commons/Home"
import AdminDashboard from "components/example/admin";
import {styled, useTheme} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect} from 'react'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
      if (localStorage.getItem('VB_token'))
        setAuth(true);
      else
        setAuth(false);
    },[])
    const handleChange = (event) => {
        setAuth(event.target.checked);
      };
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleLogout = () => {
        localStorage.removeItem('VB_token');
        window.location = ("/");
      }

  return (
    <>
      <Router>
          <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
              <AppBar position="fixed" open={open}>
                  <Toolbar>
                      <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          edge="start"
                          sx={{ mr: 2, ...(open && { display: 'none' }) }}
                      >
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                          VB Bank
                      </Typography>
                      {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
                  </Toolbar>
              </AppBar>
              <Drawer
                  sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      '& .MuiDrawer-paper': {
                          width: drawerWidth,
                          boxSizing: 'border-box',
                      },
                  }}
                  variant="persistent"
                  anchor="left"
                  open={open}
              >
                  <DrawerHeader>
                      <IconButton onClick={handleDrawerClose}>
                          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                      </IconButton>
                  </DrawerHeader>
                  <Divider />
                  <List>
                      {['Accounts', 'Transfer', 'Bill Payment'].map((text, index) => (
                          <ListItem key={text} disablePadding>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
                  <List>
                      {['User management', 'Account management'].map((text, index) => (
                          <ListItem key={text} disablePadding>
                              <ListItemButton>
                                  <ListItemIcon>
                                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                              </ListItemButton>
                          </ListItem>
                      ))}
                  </List>
              </Drawer>
              <Main open={open}>
                  <DrawerHeader />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/:userId" element={<Home />} />
                      <Route path="/admin/:adminId" element={<AdminDashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                  </Routes>
              </Main>
          </Box>
      </Router>
    </>
  );
}

export default App;
