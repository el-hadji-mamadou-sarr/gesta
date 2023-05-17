import * as React from "react";

import {Register} from "./Pages/register/Register";
import {Login} from "./Pages/login/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home/Home";
import Dashboard from "./Pages/dashboard/Dashboard";
import Profile from "./Pages/profile/Profile";
import {UserHome} from "./Pages/homeuser/UserHome";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/homeuser" element={<UserHome/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
