import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Registration from '../pages/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='detail' element={<Detail />} />
        <Route path='*' element={<div>404 Error Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
