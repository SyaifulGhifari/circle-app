import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Grid,
  Link,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

import Loading from '../components/Loading';

export default function Registration() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    bod: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    isError: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(values);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleChange2 = function (prop) {
  //   return function (event) {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };
  // };

  const handleChangeEmail = (e) => {
    setValues((state) => ({ ...state, email: e.target.value }));
  };

  const handleName = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDob = (value) => {
    setValues({ ...values, bod: value.format() });
  };

  const handleChangeGender = (e) => {
    setValues({ ...values, gender: e.target.value });
  };

  const handleSubmit = (e) => {
    const newValues = {
      ...values,
      gender: values.gender === 'female',
    };
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users`, newValues)
      .then((res) => {
        navigate('/login');
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
      .finally(() => {});
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
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Paper
          elevation={8}
          style={{
            padding: 30,
            width: 280,
          }}
        >
          <Grid align='center'>
            <h2>Create Your Account</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label='name'
              placeholder='Enter name'
              fullWidth
              required
              onChange={handleName}
            />
            <TextField
              sx={{ mt: 2 }}
              label='Email'
              value={values.email}
              placeholder='Enter Email'
              fullWidth
              type='email'
              required
              onChange={handleChangeEmail}
            />

            <FormControl fullWidth variant='outlined' sx={{ mt: 2 }}>
              <InputLabel htmlFor='outlined-adornment-password' required>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth required>
              <DatePicker
                sx={{ my: 5 }}
                label='Date of Birth'
                inputFormat='MM/DD/yyyy'
                value={values.bod}
                onChange={handleDob}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                onChange={handleChangeGender}
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>
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
              Sign up
            </Button>
          </form>
          <Typography>
            Already have an account?
            <Link
              component={RouterLink}
              to='/login'
              style={{ color: '#1D3743', marginLeft: 10 }}
            >
              Sign In
            </Link>
          </Typography>
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
        </Paper>
      </Grid>
    </Grid>
  );
}
