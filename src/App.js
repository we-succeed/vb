import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MenuAppBar from "./components/commons/MenuAppBar";
import PrivateRoute from "./components/commons/PrivateRoute";
import AccountContract from "./components/Account/accountContract/AccountContract";
import ContactList from "./pages/Contact";
import Profile from "./pages/Profile";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import UserAccount from "./pages/UserAccount";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VBStyledCollection from "./components/VBStyledCollection";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Tx from "./components/Transfer/Transaction/Tx"
import {createContext} from "react";
import Etransfer from "./pages/Etransfer";
import Transfer from "./components/Transfer/SendMoney/transfer";


export const UserContext = createContext(null);
export const NotFound = () => {
    return(
        <>
            Page Not Found.
        </>
    )
}
const App = () => {
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = useState({});
    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('vb')))
    }, [])
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            <UserContext.Provider value={auth}>
                <Box sx={{display: 'flex'}}>
                    <Router>
                        <CssBaseline/>
                        <MenuAppBar open={open} drawerOpen={handleDrawerOpen}/>
                        <VBStyledCollection.Main open={open} auth={auth}>
                            <VBStyledCollection.DrawerHeader/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route exact path="/user/:userId" element={<PrivateRoute auth={auth} component={Profile}/>}/>
                                <Route exact path="/user/:userId/accounts" element={<PrivateRoute auth={auth} component={UserAccount}/>}/>
                                <Route exact path="/user/:userId/contacts" element={<PrivateRoute auth={auth} component={ContactList}/>}/>
                                <Route exact path="/user/:userId/transfer" element={<PrivateRoute auth={auth} component={Transaction}/>}/>
                                <Route exact path="/user/:userId/transfer/tx" element={<PrivateRoute auth={auth} component={Tx}/>}/>
                                <Route exact path="/user/:userId/e-transfer" element={<PrivateRoute auth={auth} component={Etransfer}/>}/>
                                <Route exact path="/user/:userId/e-transfer/tx" element={<PrivateRoute auth={auth} component={Transfer}/>}/>
                                <Route exact path="/accounts/:accountId/open" element={<PrivateRoute auth={auth} component={AccountContract}/>}/>
                                <Route exact path="/login" element={<Login/>} />
                                <Route exact path="/signup" element={<SignUp/>} />
                                <Route exact path="/admin/users" element={<PrivateRoute auth={auth} component={User}/>}/>
                                <Route exact path="/admin/accounts" element={<PrivateRoute auth={auth} component={Account}/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </VBStyledCollection.Main>
                    </Router>
                </Box>
            </UserContext.Provider>
        </>
    );
}

export default App;
