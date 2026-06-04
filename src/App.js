import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Axios from "axios";

//Services

import Log from "./services/log";

//Publique
import TwitchLiveWidget from "./composants/twitchLiveWidget";
import NavBar from './vues/navbar.js';
import HomePage from './vues/home.js';
import ShinyDex from './vues/Shinydex.js';
import Safari from './vues/safari.js';
import Inventory from './vues/inventory.js';
import Pokedex from './vues/pokedex.js';
import Profil from './vues/profil.js';
import Leaderboard from './vues/leaderboard.js';
import Compagnon from './vues/compagnon.js';
import Cartes from './vues/cards.js';
function App() {
    const [multipleTabs, setMultipleTabs] = useState(false);
    useEffect(() => {
        const channel = new BroadcastChannel("pokemon-app");
        const tabId = crypto.randomUUID();
        let hasOtherTab = false;
        const timeout = setTimeout(() => {
            setMultipleTabs(hasOtherTab);
        }, 300);
        channel.onmessage = (event) => {
            const data = event.data;
            if (data.type === "PING" && data.from !== tabId) {
                channel.postMessage({
                    type: "PONG",
                    to: data.from,
                });
            }
            if (
                data.type === "PONG" &&
                data.to === tabId
            ) {
                hasOtherTab = true;
            }
        };
        channel.postMessage({
            type: "PING",
            from: tabId,
        });
        return () => {
            clearTimeout(timeout);
            channel.close();
        };
    }, []);
    if (multipleTabs) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Application déjà ouverte</h1>
                    <p>
                        Une autre instance est déjà active dans un autre onglet.
                    </p>
                    <p>
                        Fermez les autres onglets puis rechargez cette page.
                    </p>
                </header>
            </div>
        );
    }
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
                      <Route path="/cartes" element={<Cartes />} />
                      </Routes>
                      <div className={"navBarContent"}>
                        <NavBar />
                  </div>
                  <TwitchLiveWidget />
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
