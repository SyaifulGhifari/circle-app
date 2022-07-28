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
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';

import { parseCookies } from 'nookies';

const settings = ['Profile', 'Account'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const cookies = parseCookies();
  const isLogin = cookies.usr_token != null;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/* <HideOnScroll> */}
      <AppBar
        position='sticky'
        style={{ background: '#FFFFFF', padding: '5px' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <img src='/image/kecil.png' alt='' width='50' height='50' />
            </Box>
            <Search
              sx={{ mx: 2, flexGrow: 1 }}
              style={{
                boxShadow: '3px 3px 10px gray',
                border: '2px solid rgb(29, 55, 67)',
                borderRadius: '20px',
              }}
            >
              <SearchIconWrapper>
                <SearchIcon
                  style={{ color: 'black' }}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                style={{ color: 'black' }}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
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
                  <IconButton sx={{ color: '#1D3743' }}>
                    <HomeIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Link>
                <IconButton sx={{ color: '#1D3743' }}>
                  <AddIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/2.jpg'
                    />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
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
