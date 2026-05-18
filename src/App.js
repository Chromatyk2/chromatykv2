import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Axios from "axios";

//Services

import Log from "./services/log";

//Publique

import NavBar from './vues/navbar.js';
import HomePage from './vues/home.js';
import ShinyDex from './vues/Shinydex.js';
import Safari from './vues/safari.js';
import Inventory from './vues/inventory.js';
function App() {
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
                  <div className={"globalContainer"}>
                      <Routes>
                          <Route path="/log" element={<Log />} />
                          <Route path="/" element={<HomePage />} />
                          <Route path="/inventaire" element={<Inventory />} />
                          <Route path="/shiny" element={<ShinyDex />} />
                          <Route path="/safari" element={<Safari />} />
                      </Routes>
                      <div className={"navBarContent"}>
                        <NavBar />
                      </div>
                  </div>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
