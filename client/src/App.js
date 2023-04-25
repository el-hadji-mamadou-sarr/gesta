import * as React from "react";

import { Register } from "./Pages/Register/Register";
import { Login } from "./Pages/login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./Pages/dashboard/dashboard";
import Home from "./Pages/home/Home";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
