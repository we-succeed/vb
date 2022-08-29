import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MenuAppBar from "./components/commons/MenuAppBar";
import Profile from "./pages/Profile";
import CommonUI from "./components/shared-dialog/VBStyledCollection";
import PrivateRoute from "./components/commons/PrivateRoute";
import AccountSummary from "./pages/UserAccount";
import AccountContract from "./components/Account/accountContract/AccountContract";
import AccountList from "./pages/admin/Account";
import User from "./pages/admin/User";

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
                            <Route path="/admin/users" exact element={<PrivateRoute auth={auth} children={<User/>}/>}/>
                            <Route path="/admin/accounts" element={<PrivateRoute auth={auth} children={<AccountList/>}/>}/>
                            <Route path="/login" element={<Login/>} />
                            <Route path="/signup" element={<SignUp/>}/>
                        </Routes>
                    </CommonUI.Main>
                </Router>
            </Box>
        </>
    );
}

export default App;
