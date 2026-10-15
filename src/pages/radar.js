import { useEffect, useState } from "react";
import PokemonRadar from "../components/radar";

const GENERATION_RANGES = {
    "1g": { min: 1, max: 208 },
    "2g": { min: 209, max: 350 },
    "3g": { min: 351, max: 517 },
    "4g": { min: 518, max: 667 },
    "5g": { min: 668, max: 853 },
    "6g": { min: 854, max: 986 },
    "7g": { min: 987, max: 1098 },
    "8g": { min: 1099, max: 1207 },
    "9g": { min: 1208, max: 1342 },
};

export default function Radar() {
    const [pokemonImage, setPokemonImage] = useState(null);
    const [pokemonNumber, setPokemonNumber] = useState(null);
    const [generation, setGeneration] = useState(null);
    const [scanId, setScanId] = useState(0);

    useEffect(() => {
        const handleRadar = (param) => {
            let data = param.detail?.data;

            // Accepte un objet ou une chaîne JSON
            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    console.error("JSON Radar invalide :", error);
                    return;
                }
            }

            if (!data) {
                console.error("Données Radar manquantes.");
                return;
            }

            const gen = String(
                data.generation ?? data.gen ?? ""
            ).toLowerCase();

            const range = GENERATION_RANGES[gen];

            if (!range) {
                console.error("Génération inconnue :", gen);
                return;
            }

            // Tirage aléatoire, bornes incluses
            const number =
                Math.floor(
                    Math.random() * (range.max - range.min + 1)
                ) + range.min;

            const imagePath =
                `/Sprites/Shiny/${number}.webp`;

            console.log("Génération :", gen);
            console.log("Pokémon tiré :", number);
            console.log("Sprite :", imagePath);

            setGeneration(gen);
            setPokemonNumber(number);
            setPokemonImage(imagePath);

            // Déclenche ou relance l'animation
            setScanId((id) => id + 1);
        };

        window.addEventListener("Radar", handleRadar);

        return () => {
            window.removeEventListener("Radar", handleRadar);
        };
    }, []);

    return (
        <main className="radar-page">
            <PokemonRadar
                trigger={scanId}
                pokemonImage={pokemonImage}
                generation={generation}
                pokemonNumber={pokemonNumber}
            />
        </main>
    );
}