import './styles/theme.css';
import './styles/App.css';

import { useEffect, useRef, useState } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Link
} from "react-router-dom";

import { socket } from "./services/socket";
import Axios from "axios";

// Services
import Log from "./services/log";
import Login from "./services/auth.services.js";

// Composants
import Maintenance from './pages/maintenance.js';
import TwitchLiveWidget from "./components/twitchLiveWidget";
import NavBar from './components/navbar.js';

// Pages
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
import Banger from './pages/banger.js';
import Nostalpick from './pages/nostalpick.js';
import Radar from './pages/radar.js'; 
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import Cookies from "./pages/Cookies";

import { useAuth } from "./context/AuthContext";

Axios.defaults.withCredentials = true;

function App() {
    const [multipleTabs, setMultipleTabs] = useState(false);
    const { user, loading } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [isSafariAnimation, setIsSafariAnimation] = useState(false);
    const notificationAudio = useRef(null);

    const pathname = window.location.pathname;

    const ignoreMultipleTabs = [
        "/MX86v73Uxmk2Ub",
        "/nostalpick",
        "/shiny",
        "/succes",
        "/leaderboard",
        "/pokedex",
        "/radarMK1"
    ];

    const [missingCount, setMissingCount] = useState(0);

    // Compteur Nostalpick réservé à l'administrateur
    useEffect(() => {
        if (user?.id !== "80482655") {
            setMissingCount(0);
            return;
        }

        const checkUpcoming = async () => {
            try {
                const { data } = await Axios.get("/api/getBanger");

                setMissingCount(
                    data.upcoming.filter(
                        game => game.number === null
                    ).length
                );
            } catch (err) {
                console.error(err);
            }
        };

        checkUpcoming();

        const interval = setInterval(checkUpcoming, 30000);

        return () => clearInterval(interval);
    }, [user]);

    // Son des notifications
    useEffect(() => {
        notificationAudio.current = new Audio("/notif.mp3");
        notificationAudio.current.volume = 0.1;
    }, []);

    const playNotificationSound = () => {
        if (!notificationAudio.current) return;

        notificationAudio.current.currentTime = 0;

        notificationAudio.current
            .play()
            .catch(() => { });
    };

    // Notifications
    useEffect(() => {
        const handleAchievement = data => {
            const id = crypto.randomUUID();

            setNotifications(prev => [
                ...prev,
                {
                    id,
                    ...data
                }
            ]);

            setTimeout(() => {
                setNotifications(prev =>
                    prev.filter(n => n.id !== id)
                );
            }, 5000);
        };

        socket.on("achievementUnlocked", handleAchievement);

        return () => {
            socket.off("achievementUnlocked", handleAchievement);
        };
    }, []);

    const showNotification = notification => {
        playNotificationSound();

        const id = crypto.randomUUID();

        setNotifications(prev => [
            ...prev,
            {
                id,
                ...notification
            }
        ]);

        setTimeout(() => {
            setNotifications(prev =>
                prev.filter(n => n.id !== id)
            );
        }, 5000);
    };

    // Montée de niveau
    useEffect(() => {
        const handleLevelUp = data => {
            const notification = {
                type: "levelup",
                ...data
            };

            if (sessionStorage.getItem("catchingPokemon")) {
                setTimeout(
                    () => showNotification(notification),
                    7000
                );
            } else {
                showNotification(notification);
            }
        };

        socket.on("profileLevelUp", handleLevelUp);

        return () => {
            socket.off("profileLevelUp", handleLevelUp);
        };
    }, []);

    // Authentification Socket.IO
    useEffect(() => {
        if (!user?.id) return;

        socket.emit("authenticate", user.id);
    }, [user]);

    // Thème utilisateur
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            user?.theme || "defaut"
        );
    }, [user?.theme]);

    // Détection des autres onglets
    useEffect(() => {
        const channel = new BroadcastChannel("pokemon-app");
        const tabId = crypto.randomUUID();

        let hasOtherTab = false;

        const timeout = setTimeout(() => {
            setMultipleTabs(hasOtherTab);
        }, 300);

        channel.onmessage = event => {
            const data = event.data;

            if (data.type === "PING" && data.from !== tabId) {
                channel.postMessage({
                    type: "PONG",
                    to: data.from
                });
            }

            if (data.type === "PONG" && data.to === tabId) {
                hasOtherTab = true;
            }
        };

        channel.postMessage({
            type: "PING",
            from: tabId
        });

        return () => {
            clearTimeout(timeout);
            channel.close();
        };
    }, []);
    useEffect(() => {
        const isRadarPage = window.location.pathname === "/radarMK1";

        document.body.classList.toggle("radar-page-active", isRadarPage);

        return () => {
            document.body.classList.remove("radar-page-active");
        };
    }, []);
    // IMPORTANT :
    // Le radar est affiché seul, sans le layout principal du site.
    // Cette condition doit rester après les hooks React.
    if (pathname === "/radarMK1") {
        return <Radar />;
    }

    // Protection contre plusieurs onglets
    if (
        multipleTabs &&
        !ignoreMultipleTabs.includes(pathname)
    ) {
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

    const maintenance = false;

    const bypass = new URLSearchParams(
        window.location.search
    ).get("dev");

    if (maintenance && bypass !== "chromatyk") {
        return <Maintenance />;
    }

    // Application normale
    return (
        <div className="App">
            <header className="App-header">
                <div className="notification-container">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className="notification"
                        >
                            {notification.type === "levelup" ? (
                                <>
                                    <div className="notification-title">
                                        ⭐ Niveau supérieur
                                    </div>

                                    <div className="notification-description">
                                        Niveau {notification.newLevel} atteint
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="notification-title">
                                        🏆 Succès débloqué
                                    </div>

                                    <div className="notification-description">
                                        {notification.description}
                                    </div>

                                    <div className="notification-reward">
                                        🎖 {notification.titleName}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <BrowserRouter>
                    {user?.id === "80482655" && missingCount > 0 && (
                        <Link
                            to="/nostalpick"
                            className="nostalpick-notification"
                            title={`${missingCount} jeu(x) sans numéro`}
                        >
                            {missingCount}
                        </Link>
                    )}

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
                        <Route path="/nostalpick" element={<Nostalpick />} />
                        <Route path="/MX86v73Uxmk2Ub" element={<Banger />} />
                        <Route path="/mentions-legales" element={<MentionsLegales />} />
                        <Route path="/confidentialite" element={<Confidentialite />} />
                        <Route path="/cookies" element={<Cookies />} />
                    </Routes>

                    <div className="navBarContent">
                        <NavBar />
                    </div>

                    <TwitchLiveWidget />

                    {!loading && !user && (
                        <div className="connectionBar">
                            <p>Connectez-vous pour jouer !</p>
                            <Login />
                        </div>
                    )}
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;