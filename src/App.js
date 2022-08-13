import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
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
import AccountSummary from "./components/Account/AccountSummary";

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

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
  return (
    <>
      <Router>
          <Box sx={{ display: 'flex' }}>
              <CssBaseline />
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
                      <Typography variant="h6" noWrap component="div">
                          VB Bank
                      </Typography>
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
                      <Route path="/:userId/accounts" element={<AccountSummary />} />
                  </Routes>
              </Main>
          </Box>
      </Router>
    </>
  );
}

export default App;
