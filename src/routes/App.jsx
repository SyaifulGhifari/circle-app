import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Detail from "../pages/Detail";
import Registration from "../pages/Registration";

const App = () => {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="detail" element={<Detail />} />
          <Route path="*" element={<div>404 Error Not Found</div>} />
        </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
