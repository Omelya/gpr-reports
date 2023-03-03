import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import logo from "../logo.svg.png";
import {Link} from "react-router-dom";
import {useIsAuthenticated, useSignOut} from "react-auth-kit";

const pages = [
    {
        name: 'Submit a report',
        link: '/involvement'
    },
    {
        name: 'Reports',
        link: '/report'
    },
    {
        name: 'Overview',
        link: '/overview'
    }];

const settings = [
    {
        name: 'Profile',
        link: '/my-page'
    }];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

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

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img className='max-h-14' src={logo} alt='logo'/>
                    </Typography>

                    {
                        isAuthenticated() &&
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
                                {pages.map((page, key) => (
                                    <MenuItem key={key} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link to={page.link}>
                                                {page.name}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img className='max-h-12' src={logo} alt='logo'/>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {
                        isAuthenticated() &&
                        <>
                            {pages.map((page, key) => (
                                <Button key={key} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link to={page.link} onClick={handleCloseNavMenu}>
                                        {page.name}
                                    </Link>
                                </Button>
                            ))}
                        </>
                    }
                    </Box>

                    {
                        isAuthenticated() &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User image" />
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
                                {settings.map((setting, key) => (
                                    <MenuItem key={key} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Link to={setting.link}>{setting.name}</Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={signOut}>Log out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }

                    {
                        !isAuthenticated() &&
                        <>
                            <Button color="inherit">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/signin">Sign in</Link>
                            </Button>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

 export default Header;
