import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./components/commons/Home"
import AdminDashboard from "components/example/admin";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import DrawerMenu from "./components/commons/Drawer";
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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
function App() {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(!open);
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
                          sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap component="div">
                          VB Bank
                      </Typography>
                  </Toolbar>
              </AppBar>
              <DrawerMenu open={open} handleOpen={handleDrawerOpen}/>
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
