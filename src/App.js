import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Axios from "axios";

//Services

import Log from "./services/log";

//Publique

import NavBar from './component/navbar.js';
import HomePage from './component/home.js';
import ShinyDex from './component/Shinydex.js';

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
                  <div className={"globalContainer"}>
                      <Routes>
                          <Route path="/log" element={<Log />} />
                          <Route path="/" element={<HomePage />} />
                          <Route path="/shiny" element={<ShinyDex />} />
                      </Routes>
                      <NavBar />
                  </div>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
