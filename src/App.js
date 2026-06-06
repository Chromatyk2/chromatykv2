import './styles/theme.css';
import './styles/App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { socket } from "./services/socket";
import Axios from "axios";
//Services

import Log from "./services/log";

//Publique
import Maintenance from './pages/maintenance.js';
import TwitchLiveWidget from "./components/twitchLiveWidget";
import NavBar from './components/navbar.js';
import HomePage from './pages/home.js';
import ShinyDex from './pages/Shinydex.js';
import Safari from './pages/safari.js';
import Inventory from './pages/inventory.js';
import Pokedex from './pages/pokedex.js';
import Profil from './pages/profil.js';
import Leaderboard from './pages/leaderboard.js';
import Compagnon from './pages/compagnon.js';
import Cartes from './pages/cards.js';
import Achievements from './pages/achievement.js';
import { useAuth } from "./context/AuthContext";
Axios.defaults.withCredentials = true;
function App() {
    const [multipleTabs, setMultipleTabs] = useState(false);
    const { user, loading } = useAuth();
    const [notifications, setNotifications] =
        useState([]);
    useEffect(() => {
        const handleAchievement = data => {
            const id =
                crypto.randomUUID();
            setNotifications(prev => [
                ...prev,
                {
                    id,
                    ...data
                }
            ]);
            setTimeout(() => {
                setNotifications(prev =>
                    prev.filter(
                        n => n.id !== id
                    )
                );
            }, 5000);
        };
        socket.on(
            "achievementUnlocked",
            handleAchievement
        );
        return () => {
            socket.off(
                "achievementUnlocked",
                handleAchievement
            );
        };
    }, []);
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        socket.emit(
            'authenticate',
            user.id
        );
        console.log(
            'AUTHENTICATED SOCKET',
            user.id
        );

    }, [user]);
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            user?.theme || "defaut"
        );
    }, [user?.theme]);
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

    const maintenance =
        false;

    const bypass =
        new URLSearchParams(
            window.location.search
        ).get("dev");

    if (
        maintenance &&
        bypass !== "chromatyk"
    ) {

        return (
            <Maintenance />
        );

    }    
  return (
    <div className="App">
          <header className="App-header">
              <div className="notification-container">
                  {notifications.map(notification => (
                      <div
                          key={notification.id}
                          className="notification"
                      >
                          <div className="notification-title">
                              🏆 Succès débloqué
                          </div>
                          <div className="notification-description">
                              {notification.description}
                          </div>
                          <div className="notification-reward">
                              🎖 {notification.titleName}
                          </div>
                      </div>
                  ))}
              </div>
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
                      <Route path="/succes" element={<Achievements />} />
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
