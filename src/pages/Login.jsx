import { useState } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { setCookie } from 'nookies';
import Loading from '../components/Loading';

export default function Login() {
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setDataLogin((state) => ({ ...state, email: e.target.value }));
  };

  const handleChangePassword = (e) => {
    setDataLogin((state) => ({ ...state, password: e.target.value }));
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, dataLogin)
      .then((res) => {
        console.log(res.data);
        setCookie(null, 'usr_token', res.data.token);
        setCookie(null, 'usr_name', res.data.data.Name);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.response.data);
        setSnackbar((state) => ({
          ...state,
          open: true,
          message: err.response.data,
          isError: true,
        }));
      })
      .finally(() => {
        // setIsLoading(false);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((state) => ({ ...state, open: false }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignContent='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <img src='/image/full.png' alt='' style={{ width: '100%' }} />
          </Box>
          <Box
            sx={{
              mx: '5%',
              display: { xs: 'none', sm: 'block', lg: 'block' },
            }}
          />
          <Paper
            elevation={8}
            style={{
              padding: 30,
              width: 280,
              backgroundColor: '#1D3743',
              color: '#71C9CE',
            }}
          >
            <Grid align='center'>
              <h2>Sign In</h2>
            </Grid>
            <form onSubmit={handleSubmitLogin}>
              <TextField
                sx={{ my: 2 }}
                label='Email'
                value={dataLogin.email}
                placeholder='Enter Email'
                fullWidth
                type='email'
                required
                onChange={handleChangeEmail}
              />
              <TextField
                label='Password'
                placeholder='Enter password'
                type='password'
                value={dataLogin.password}
                fullWidth
                required
                onChange={handleChangePassword}
              />

              <Button
                type='submit'
                variant='contained'
                style={{
                  margin: '8px 0',
                  backgroundColor: '#71C9CE',
                  color: '#1D3743',
                }}
                fullWidth
              >
                Sign In
              </Button>
            </form>
            <Typography>
              Don't have an account?
              <Link
                underline='hover'
                component={RouterLink}
                to='/registration'
                style={{ color: '#71C9CE', marginLeft: 10 }}
              >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Grid>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
