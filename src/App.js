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
import Pokedex from './vues/pokedex.js';
import Profil from './vues/profil.js';
import Leaderboard from './vues/leaderboard.js';
import Compagnon from './vues/compagnon.js';
function App() {
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
                      <Routes>
                        <Route path="/log" element={<Log />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/inventaire" element={<Inventory />} />
                        <Route path="/shiny" element={<ShinyDex />} />
                        <Route path="/safari" element={<Safari />} />
                        <Route path="/pokedex" element={<Pokedex />} />
                        <Route path="/profil" element={<Profil />} />
                          <Route path="/leaderboard" element={<Leaderboard />} />
                          <Route path="/compagnon" element={<Compagnon />} />
                      </Routes>
                      <div className={"navBarContent"}>
                        <NavBar />
                      </div>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
