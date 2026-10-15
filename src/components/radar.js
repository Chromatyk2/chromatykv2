
import { useEffect, useRef, useState } from "react";
import "../styles/PokemonRadar.css";

export default function PokemonRadar({
    pokemonImage = "/Sprites/5g/Pokemon%20(14).png",
    trigger = 0,
    onComplete,
}) {
    const [active, setActive] = useState(false);
    const [phase, setPhase] = useState("idle");
    const timers = useRef([]);
    const running = useRef(false);

    useEffect(() => {
        if (trigger > 0) launchScan();
    }, [trigger]);

    useEffect(() => {
        const handleKey = (event) => {
            if (event.code === "KeyR" && !event.repeat) {
                launchScan();
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
            timers.current.forEach(clearTimeout);
        };
    }, []);

    function launchScan() {
        if (running.current) return;

        running.current = true;
        timers.current.forEach(clearTimeout);
        timers.current = [];

        setActive(true);
        setPhase("initializing");

        const after = (delay, callback) => {
            timers.current.push(setTimeout(callback, delay));
        };

        after(500, () => setPhase("scanning"));
        after(2500, () => setPhase("detected"));
        after(4000, () => setPhase("locking"));
        after(5500, () => setPhase("revealed"));

        after(8500, () => {
            setActive(false);
            setPhase("idle");
            running.current = false;
            onComplete?.();
        });
    }

    const messages = {
        idle: "RADAR EN VEILLE",
        initializing: "INITIALISATION DU RADAR",
        scanning: "SCAN DE LA ZONE...",
        detected: "SIGNATURE DÉTECTÉE",
        locking: "VERROUILLAGE DE LA CIBLE",
        revealed: "CIBLE IDENTIFIÉE",
    };

    return (
        <div
            className={`pokemon-radar ${active ? "active" : ""}`}
            data-phase={phase}
        >
            <div className="radar-halo" />
            <div className="radar-grid" />

            <div className="radar-circle">
                <div className="radar-ring ring-one" />
                <div className="radar-ring ring-two" />
                <div className="radar-ring ring-three" />

                <div className="radar-axis horizontal" />
                <div className="radar-axis vertical" />
                <div className="radar-sweep" />

                {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={`radar-blip blip-${n}`} />
                ))}
            </div>

            <div className="radar-lock">
                <div className="lock-corner top-left" />
                <div className="lock-corner top-right" />
                <div className="lock-corner bottom-left" />
                <div className="lock-corner bottom-right" />
                <div className="lock-circle" />
            </div>

            <div className="radar-pulse" />

            <img
                className="radar-pokemon"
                src={pokemonImage}
                alt="Pokémon détecté"
            />

            <div className="radar-hud">
                <header className="radar-header">
                    <div>
                        <div className="radar-brand">POKÉRADAR // X</div>
                        <div className="radar-subtitle">
                            SYSTÈME DE RECHERCHE · V.05
                        </div>
                    </div>

                    <div className="radar-coordinates">
                        SCAN : ACTIVE<br />
                        SIGNAL : DETECTED<br />
                        MODE : SHINY HUNT
                    </div>
                </header>

                <footer className="radar-footer">
                    <div className="radar-status">
                        {messages[phase]}
                    </div>

                    <div className="radar-progress">
                        <div className="radar-progress-bar" />
                    </div>

                    <div className="radar-target-label">
                        NOUVELLE CIBLE SHINY HUNT
                    </div>
                </footer>
            </div>

            <div className="radar-frame top-left" />
            <div className="radar-frame top-right" />
            <div className="radar-frame bottom-left" />
            <div className="radar-frame bottom-right" />
        </div>
    );
}
