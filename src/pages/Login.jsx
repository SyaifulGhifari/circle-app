import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
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
            <h2>Sign In</h2>
          </Grid>
          <TextField
            sx={{ my: 2 }}
            label='Email'
            placeholder='Enter Email'
            fullWidth
            type='email'
            required
          />
          <TextField
            label='Password'
            placeholder='Enter password'
            type='password'
            fullWidth
            required
          />

          <Button
            type='submit'
            variant='contained'
            style={{ margin: '8px 0', color: '3F72AF' }}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>
            Don't have an account?
            <Link component={RouterLink} to='/registration'>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
