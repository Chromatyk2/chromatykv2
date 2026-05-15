import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
         </BrowserRouter>
    );
}

export default App;
