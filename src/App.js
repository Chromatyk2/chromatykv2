import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';

//Services

import Log from "./services/log";

//Publique

import NavBar from './component/navbar.js';
import HomePage from './component/home.js';

function App() {
  const [cookies, setCookie] = useCookies();
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
                  <NavBar cookies={cookies} />
                  <Routes>
                      <Route path="/log" element={<Log cookies={cookies} />} />
                      <Route path="/" element={<HomePage />} />
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
