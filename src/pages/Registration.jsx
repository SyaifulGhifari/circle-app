import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Grid,
  Link,
  Paper,
  Avatar,
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Registration() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    dob: null,
    gender: '',
  });

  console.log(values);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleChange2 = function (prop) {
  //   return function (event) {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };
  // };

  const handleUsername = (e) => {
    setValues({ ...values, username: e.target.value });
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
    console.log(value.format());
    setValues({ ...values, dob: value.format() });
  };

  const handleChangeGender = (e) => {
    console.log(e);
    setValues({ ...values, gender: e.target.value });
  };

  const handleSubmit = (e) => {};

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
            <Avatar style={{ backgroundColor: '#112D4E' }}></Avatar>
            <h2>Create Your Account</h2>
          </Grid>
          <TextField
            label='Username'
            placeholder='Enter username'
            fullWidth
            required
            onChange={handleUsername}
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
              value={values.dob}
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
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            style={{ margin: '8px 0', color: '3F72AF' }}
            fullWidth
            onSubmit={handleSubmit}
          >
            Sign up
          </Button>
          <Typography>
            Already have an account?
            <Link component={RouterLink} to='/login'>
              Log in
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
