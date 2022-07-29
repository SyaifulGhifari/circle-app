import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#112D4E',
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='detail/:post_id' element={<Detail />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<div>404 Error Not Found</div>} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
