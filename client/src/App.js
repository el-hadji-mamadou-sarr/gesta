import * as React from "react";

import {Register} from "./Pages/register/Register";
import {Login} from "./Pages/login/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/home/Home";
import Dashboard from "./Pages/dashboard/Dashboard";
import Profile from "./Pages/profile/Profile";
import { useDispatch } from "react-redux";
import { IsUserLogged } from "./reducers/userReducer";
import { useEffect } from "react";
import { Tab } from "./Pages/tab/Tab";

function App() {
   const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(IsUserLogged());
    },[dispatch])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/:project_id/:tab_id" element={<Tab/>}/>
              
            </Routes>
        </BrowserRouter>
    );
}

export default App;
