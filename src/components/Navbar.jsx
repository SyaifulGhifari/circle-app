import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { parseCookies, destroyCookie } from 'nookies';

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const cookies = parseCookies();
  const isName = cookies.usr_name;
  const isLogin = cookies.usr_token != null;
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSignOut = () => {
    destroyCookie(null, 'usr_token');
    destroyCookie(null, 'usr_name');
    window.location.reload();
  };

  return (
    <>
      <AppBar
        position='sticky'
        style={{ background: '#FFFFFF', padding: '5px' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <img src='/image/kecil.png' alt='' width='50' height='50' />
            </Box>
            {!isLogin ? (
              <Link href='/login'>
                <Button variant='text' sx={{ color: '#1D3743' }}>
                  Login
                </Button>
              </Link>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Link href='/'>
                  <IconButton sx={{ color: '#1D3743', marginRight: 2 }}>
                    <HomeIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Link>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {<Avatar {...stringAvatar(isName.toUpperCase())} />}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate(`/profile`)}>
                    <Typography textAlign='center'>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClickSignOut}>
                    <Typography textAlign='center'>Sign out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default NavBar;
