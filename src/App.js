import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Axios from "axios";

//Services

import Log from "./services/log";

//Publique

import NavBar from './component/navbar.js';
import HomePage from './component/home.js';

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
              <NavBar />
                  <Routes>
                      <Route path="/log" element={<Log />} />
                      <Route path="/" element={<HomePage />} />
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
