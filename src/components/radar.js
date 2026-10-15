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
        if (trigger === 0 || !pokemonImage) return;

        const timers = PHASES.map(({ name, delay }) =>
            setTimeout(() => {
                setPhase(name);

                if (name === "complete") {
                    onComplete?.();
                }
            }, delay)
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [trigger, pokemonImage, onComplete]);

    const isActive = phase !== "idle";
    const isRevealed =
        phase === "revealed" || phase === "complete";

    return (
        <section
            className={`pokemon-radar ${isActive ? "active" : ""}`}
            data-phase={phase}
        >
            {/* Fond transparent : adapté à OBS */}
            <div className="radar-hud">
                <span className="radar-label">
                    POKÉMON RADAR SYSTEM
                </span>
                <span className="radar-status">
                    {phase === "idle" && "STANDBY"}
                    {phase === "initializing" && "INITIALISATION"}
                    {phase === "scanning" && "SCAN EN COURS"}
                    {phase === "detected" && "CIBLE DÉTECTÉE"}
                    {phase === "locking" && "VERROUILLAGE"}
                    {isRevealed && "CIBLE IDENTIFIÉE"}
                </span>
            </div>

            <div className="radar-display">
                {/* Cercles holographiques */}
                <div className="radar-rings">
                    <div className="radar-ring ring-1" />
                    <div className="radar-ring ring-2" />
                    <div className="radar-ring ring-3" />
                    <div className="radar-ring ring-4" />

                    <div className="radar-crosshair horizontal" />
                    <div className="radar-crosshair vertical" />

                    <div className="radar-sweep" />

                    <div className="radar-blip blip-1" />
                    <div className="radar-blip blip-2" />
                    <div className="radar-blip blip-3" />

                    <div className="radar-lock">
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                {/* Silhouette puis sprite révélé */}
                <div className={`pokemon-target ${isRevealed ? "revealed" : ""}`}>
                    {pokemonImage && (
                        <img
                            className="pokemon-sprite"
                            src={pokemonImage}
                            alt={
                                isRevealed
                                    ? `Pokémon ${pokemonNumber}`
                                    : "Silhouette du Pokémon détecté"
                            }
                            onError={(event) => {
                                event.currentTarget.style.visibility =
                                    "hidden";
                                console.error(
                                    "Sprite introuvable :",
                                    pokemonImage
                                );
                            }}
                        />
                    )}
                </div>

                {phase === "detected" && (
                    <div className="radar-detected">
                        SIGNAL DÉTECTÉ
                    </div>
                )}
            </div>

            <div className="radar-footer">
                <div className="radar-data">
                    <span>GEN</span>
                    <strong>{generation ?? "--"}</strong>
                </div>

                <div className="radar-data">
                    <span>IDENTIFIANT</span>
                    <strong>
                        {isRevealed
                            ? `#${pokemonNumber}`
                            : "SCANNING"}
                    </strong>
                </div>

                <div className="radar-data">
                    <span>STATUT</span>
                    <strong>
                        {isRevealed ? "CONFIRMÉ" : "RECHERCHE"}
                    </strong>
                </div>
            </div>
        </section>
    );
}