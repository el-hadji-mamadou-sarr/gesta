import * as React from "react";
import { Login } from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./Pages/dashboard/dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
