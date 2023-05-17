import * as React from "react";

import { Login } from "./Pages/login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Pages/home/Home";
import Dashboard from "./Pages/dashboard/Dashboard";
import Profile from "./Pages/profile/Profile";
import { Register } from "./Pages/Register/Register";


function App() {

  function checkLoginStatus() {

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
