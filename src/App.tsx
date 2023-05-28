import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css';
import {Home} from "./components/home.component";
import {Login} from "./components/login.component";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
