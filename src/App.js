import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Axios from "axios";
//Services

import Log from "./services/log";

//Publique
import TwitchLiveWidget from "./components/twitchLiveWidget";
import NavBar from './pages/navbar.js';
import HomePage from './pages/home.js';
import ShinyDex from './pages/Shinydex.js';
import Safari from './pages/safari.js';
import Inventory from './pages/inventory.js';
import Pokedex from './pages/pokedex.js';
import Profil from './pages/profil.js';
import OldProfil from './pages/oldProfil.js';
import Leaderboard from './pages/leaderboard.js';
import Compagnon from './pages/compagnon.js';
import Cartes from './pages/cards.js';
function App() {
    Axios.defaults.withCredentials = true;
    const [multipleTabs, setMultipleTabs] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        Axios.get(
            "/api/me",
            {
                withCredentials: true
            }
        )
        .then((res) => {
            setUser(
                res.data.user
            );
        })
        .catch(() => {
            setUser(null);
        });
    }, []);
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
                      <Route path="/profil" element={<OldProfil />} />
                      <Route path="/nouveau_profil" element={<Profil />} />
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
