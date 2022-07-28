import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Registration from '../pages/Registration';

const theme = createTheme({
  palette: {
    primary: {
      main: green[100],
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
            <Route path='detail' element={<Detail />} />
            <Route path='*' element={<div>404 Error Not Found</div>} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
