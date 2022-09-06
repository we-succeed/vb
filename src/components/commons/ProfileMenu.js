import {useContext, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../../App";

const ProfileMenu = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const gotoPage = (url) => {
        navigate(url, {replace: true});
        handleClose();
    }
    const handleLogout = () => {
        localStorage.removeItem("vb");
        window.location.reload(true);
    }
    return (
        <div>
            <IconButton
                size="large"
                onClick={handleClick}
                sx={{ml: 2}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => gotoPage(`/user/${user._id}`)}
                    exact>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileMenu;