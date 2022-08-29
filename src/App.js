import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MenuAppBar from "./components/commons/MenuAppBar";
import PrivateRoute from "./components/commons/PrivateRoute";
import AccountContract from "./components/Account/accountContract/AccountContract";
import ContactList from "./components/Contact/ContactList";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import UserAccount from "./pages/UserAccount";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VBStyledCollection from "./components/VBStyledCollection";

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
                    <VBStyledCollection.Main open={open} auth={auth}>
                        <VBStyledCollection.DrawerHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/user/:userId" element={<PrivateRoute auth={auth} children={<Profile/>}/>}/>
                            <Route path="/user/:userId/accounts" element={<PrivateRoute auth={auth} children={<UserAccount/>}/>}/>
                            <Route path="/user/:userId/accounts/:accountId" exact element={<PrivateRoute auth={auth} children={<Home/>}/>}/>
                            <Route path="/user/:userId/contacts" element={<PrivateRoute auth={auth} children={<ContactList/>}/>}/>
                            <Route path="/accounts/:accountId/open" exact element={<PrivateRoute auth={auth} children={<AccountContract auth={auth}/>}/>}/>
                            <Route path="/admin/users" exact element={<PrivateRoute auth={auth} children={<User/>}/>}/>
                            <Route path="/admin/accounts" element={<PrivateRoute auth={auth} children={<Account/>}/>}/>
                            <Route path="/login" element={<Login/>} />
                            <Route path="/signup" element={<SignUp/>}/>
                        </Routes>
                    </VBStyledCollection.Main>
                </Router>
            </Box>
        </>
    );
}

export default App;
