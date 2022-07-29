import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';
import { parseCookies } from 'nookies';

export default function Profile() {
  const cookies = parseCookies();
  const token = cookies.usr_token;

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    bod: null,
  });

  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    isError: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDataProfile();
  }, []);

  const handleName = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleDob = (value) => {
    setValues({ ...values, bod: value.format() });
  };

  const handleChangeGender = (e) => {
    setValues({ ...values, gender: e.target.value });
  };

  const fetchDataProfile = (e) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data } = res.data;
        setValues({
          name: data.Name,
          email: data.Email,
          password: '',
          gender: data.Gender === false ? 'female' : 'male',
          bod: data.Bod,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {});
  };

  const handleSubmit = (e) => {
    const newValues = {
      ...values,
      gender: values.gender === 'female',
    };
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/profile`, newValues, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
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
        navigate('/');
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  const handleCloseSnackbar = () => {
    setSnackbar((state) => ({ ...state, open: false }));
  };
  return (
    <>
      <NavBar />
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
              <h2>Update Your Profile</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Name'
                placeholder={values.name}
                fullWidth={true}
                value={values.name}
                onChange={handleName}
              />

              <FormControl sx={{ mt: 2 }} fullWidth>
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
                  value={values.gender}
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
                Update Profile
              </Button>
            </form>
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
    </>
  );
}
