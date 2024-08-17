import React, { useEffect, useState } from 'react';
import { 
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Stack,
    MenuItem,
    Avatar,
    Tooltip
 } from '@mui/material';
 import LockIcon from '@mui/icons-material/Lock';

import { uuid } from "../../Helper/Helper.js";
import "../../Styles/NavBar/NavBar.scss";
 
import * as CONSTANTS from "../../Constants/Constants";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar(props) {
    const { 
        isNavTrans, 
        selectedNav, 
        handleNavSelect, 
        currentUser, 
        user_route, 
        showUserPrompt 
    } = props;
    const [ userInfo, setUserInfo ] = useState(currentUser?.user_info);
    const [ anchorElNav, setAnchorElNav ] = useState(null);
    const [ anchorElUser, setAnchorElUser ] = useState(null);

    const [ isLoggedin, setIsLoggedIn ] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setUserInfo(currentUser?.user_info);
        setIsLoggedIn(currentUser?.is_logged_in);
    }, [currentUser])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutUser = () => {
        window.location = "./logout";
    }

    function handleProfileOptions(option) {
        if(option == "Logout") {
            showUserPrompt({
                show: true, 
                title: "Logout!", msg:"Are you sure?", 
                callback: logoutUser
            });
        } else if(option == "Profile") {
            handleNavSelect(CONSTANTS.navigation.profileEditor);
            navigate(`/${user_route}/profile`);
        }
        handleCloseUserMenu();
    }

    function handleNavSelectInner(navItem) {
        handleCloseNavMenu();
        handleNavSelect(navItem);
        window.location = `/${user_route}/${navItem.route}`;
    }

    let navClassOpts = isNavTrans && selectedNav.name != "Profile";
    return (
        <AppBar position="fixed" className="navbar">
            <Toolbar className={ navClassOpts ? "toolbar-trans" : "toolbar-opq"} >
                <Stack direction="row" spacing={2}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href={window.location.origin}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            textDecoration: 'none',
                        }}
                        className={`navbar-title ${navClassOpts ? "nav-items-colord" : "nav-items-white"}`}
                    >
                        Raconteur
                    </Typography>
                </Stack>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {
                            (isLoggedin) && CONSTANTS.navigation.navItems.map(item => {
                            return (
                                <MenuItem key={uuid()} onClick={() => handleNavSelectInner(item)}>
                                    <Typography 
                                        variant="h6" 
                                        className='nav-menu-item' 
                                        textAlign="center"
                                    >
                                        {item.name}
                                        {
                                            item.isLocked ? <LockIcon className='route-lock' /> : ""
                                        }
                                    </Typography>
                                </MenuItem>
                            )})
                        }
                    </Menu>
                </Box>
                <Stack direction="row" spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }} className="navbar-title-space">
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href={window.location.origin}
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            textDecoration: 'none',
                        }}
                        className={`navbar-title-center ${navClassOpts ? "nav-items-colord" : "nav-items-white"}`}
                    >
                        Raconteur
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2} className="navbar-nav" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {
                        (isLoggedin) && CONSTANTS.navigation.navItems.map(item => {
                        return (
                            <Typography 
                                variant="h6" 
                                className='nav-item' 
                                key={uuid()}
                                onClick={() => handleNavSelectInner(item)}
                            >
                                {item.name}
                                {
                                    item.isLocked ? <LockIcon className='route-lock' /> : ""
                                }
                                
                            </Typography>
                        )})
                    }
                </Stack>
                
                {
                    (isLoggedin) && currentUser ?
                    <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={userInfo?.name} src={userInfo?.picture} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleProfileOptions(setting)} disabled={selectedNav.name == setting}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                    </Box> : ""
                }
            </Toolbar>
        </AppBar>
    );
}
export default ResponsiveAppBar;
