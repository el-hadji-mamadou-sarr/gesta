import * as React from "react";

import { Login } from "./Pages/login/Login";
import { Register } from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/home/Home";
import Dashboard from "./Pages/dashboard/Dashboard";
import Profile from "./Pages/profile/Profile";
import { useDispatch } from "react-redux";
import { IsUserLogged } from "./reducers/userReducer";
import { useEffect } from "react";
import { Tab } from "./Pages/tab/Tab";
import ExampleComponent from "./Pages/test/TestComp";
import ForgotPassword from "./Pages/profile/ForgotPassword";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(IsUserLogged());
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/test" element={<ExampleComponent />} />
                <Route path="/:project_id/:tab_id" element={<Tab />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
