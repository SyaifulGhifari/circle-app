import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Detail from '../pages/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='Home' element={<Home />} />
        <Route path='Detail' element={<Detail />} />
        <Route path='*' element={<div>404 Error Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
