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
                                <Route path="/user/:userId" element={<PrivateRoute auth={auth} component={Profile}/>}/>
                                <Route path="/user/:userId/accounts" element={<PrivateRoute auth={auth} component={UserAccount}/>}/>
                                <Route path="/user/:userId/accounts/:accountId" exact element={<PrivateRoute auth={auth} component={Home}/>}/>
                                <Route path="/user/:userId/contacts" element={<PrivateRoute auth={auth} component={ContactList}/>}/>
                                <Route path="/user/:userId/tx" element={<PrivateRoute auth={auth} component={Transaction}/>}/>
                                <Route path="/user/:userId/txs" element={<PrivateRoute auth={auth} component={Tx}/>}/>
                                <Route path="/user/:userId/transfer" element={<PrivateRoute auth={auth} component={Etransfer}/>}/>
                                <Route path="/user/:userId/transfers" element={<PrivateRoute auth={auth} component={Transfer}/>}/>
                                <Route path="/accounts/:accountId/open" element={<PrivateRoute auth={auth} component={AccountContract}/>}/>
                                <Route path="/login" element={<Login/>} />
                                <Route path="/signup" element={<SignUp/>} />
                                <Route path="/admin/users" exact element={<PrivateRoute auth={auth} component={User}/>}/>
                                <Route path="/admin/accounts" exact element={<PrivateRoute auth={auth} component={Account}/>}/>
                            </Routes>
                        </VBStyledCollection.Main>
                    </Router>
                </Box>
            </UserContext.Provider>
        </>
    );
}

export default App;
