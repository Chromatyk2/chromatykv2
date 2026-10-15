import { useEffect, useState } from "react";
import "../styles/radar.css";

const PHASES = [
    { name: "initializing", delay: 0 },
    { name: "scanning", delay: 500 },
    { name: "detected", delay: 2500 },
    { name: "locking", delay: 4000 },
    { name: "revealed", delay: 5500 },
    { name: "complete", delay: 8500 },
];

export default function PokemonRadar({
    trigger = 0,
    pokemonImage,
    generation,
    pokemonNumber,
    onComplete,
}) {
    const [phase, setPhase] = useState("idle");

    useEffect(() => {
        if (!trigger || !pokemonImage) return;

        setPhase("initializing");

        const timers = PHASES.map(({ name, delay }) =>
            setTimeout(() => {
                setPhase(name);

                if (name === "complete") {
                    onComplete?.();
                }
            }, delay)
        );

        return () => timers.forEach(clearTimeout);
    }, [trigger, pokemonImage, onComplete]);

    const active = phase !== "idle";
    const revealed =
        phase === "revealed" || phase === "complete";

    return (
        <section
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

                <div className="radar-blip blip-1" />
                <div className="radar-blip blip-2" />
                <div className="radar-blip blip-3" />
                <div className="radar-blip blip-4" />
                <div className="radar-blip blip-5" />

                <div className="radar-lock">
                    <span className="lock-corner top-left" />
                    <span className="lock-corner top-right" />
                    <span className="lock-corner bottom-left" />
                    <span className="lock-corner bottom-right" />
                    <div className="lock-circle" />
                </div>

                <div className="radar-pulse" />

                {pokemonImage && (
                    <img
                        key={pokemonImage}
                        className="radar-pokemon"
                        src={pokemonImage}
                        alt={
                            revealed
                                ? `Pokémon numéro ${pokemonNumber}`
                                : "Pokémon détecté"
                        }
                        style={{
                            filter: revealed
                                ? "drop-shadow(0 0 8px #00eaff) drop-shadow(0 0 22px #00eaff88)"
                                : "brightness(0) drop-shadow(0 0 8px #00eaff)",
                        }}
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                            console.error(
                                "Sprite introuvable :",
                                pokemonImage
                            );
                        }}
                    />
                )}
            </div>

            <div className="radar-hud">
                <div className="radar-header">
                    <div>
                        <div className="radar-brand">
                            POKÉMON RADAR
                        </div>
                        <div className="radar-subtitle">
                            SYSTÈME DE DÉTECTION HOLOGRAPHIQUE
                        </div>
                    </div>

                    <div className="radar-coordinates">
                        GEN : {generation ?? "--"}
                        <br />
                        ID : {revealed ? `#${pokemonNumber}` : "----"}
                        <br />
                        SIGNAL : {revealed ? "LOCKED" : "SEARCHING"}
                    </div>
                </div>

                <div className="radar-footer">
                    <div className="radar-status">
                        {phase === "idle" && "SYSTÈME EN ATTENTE"}
                        {phase === "initializing" && "INITIALISATION"}
                        {phase === "scanning" && "SCAN EN COURS"}
                        {phase === "detected" && "SIGNAL DÉTECTÉ"}
                        {phase === "locking" && "VERROUILLAGE CIBLE"}
                        {revealed && "CIBLE IDENTIFIÉE"}
                    </div>

                    <div className="radar-progress">
                        <div className="radar-progress-bar" />
                    </div>

                    <div className="radar-target-label">
                        POKÉMON #{pokemonNumber}
                    </div>
                </div>
            </div>

            <div className="radar-frame top-left" />
            <div className="radar-frame top-right" />
            <div className="radar-frame bottom-left" />
            <div className="radar-frame bottom-right" />
        </section>
    );
}