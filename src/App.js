import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/commons/Home"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import MenuAppBar from "./components/commons/MenuAppBar";
import Profile from "./components/Profile/profile";
import CommonUI from "./components/commons/CommonUI";
import PrivateRoute from "./components/commons/PrivateRoute";
import AccountSummary from "./components/Account/AccountSummary";
import AccountContract from "./components/Account/accountContract/AccountContract";
import AccountList from "./components/Account/AccountList";
import BasicTable from "./components/User/UserList";

const App = () => {
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = useState({});
    useEffect(() => {
        setAuth(getToken())
    }, [])
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const getToken = () => {
        return JSON.parse(localStorage.getItem('vb'))
    }
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Router>
                    <CssBaseline/>
                    <MenuAppBar open={open} drawerOpen={handleDrawerOpen} auth={auth} />
                    <CommonUI.Main open={open} auth={auth}>
                        <CommonUI.DrawerHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/user/:userId" element={<PrivateRoute auth={auth} children={<Profile/>}/>}/>
                            <Route path="/user/:userId/accounts" element={<PrivateRoute auth={auth} children={<AccountSummary/>}/>}/>
                            <Route path="/user/:userId/accounts/:accountId" exact element={<PrivateRoute auth={auth} children={<Home/>}/>}/>
                            <Route path="/accounts/:accountId/open" exact element={<PrivateRoute auth={auth} children={<AccountContract auth={auth}/>}/>}/>
                            <Route path="/admin/users" element={<PrivateRoute auth={auth} children={<BasicTable/>}/>}/>
                            <Route path="/admin/accounts" element={<PrivateRoute auth={auth} children={<AccountList/>}/>}/>
                            <Route path="/login" element={<Login/>} />
                            <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                    </CommonUI.Main>
                </Router>
            </Box>
        </>
    );
}

export default App;
