import * as React from "react";
import {Login} from "./Pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import {Register} from "./Pages/Register/Register";




function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>

    </Router>



  );
}

export default App;
