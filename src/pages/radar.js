
import { useState } from "react";
import PokemonRadar from "../components/PokemonRadar";

export default function Radar() {
    const [trigger, setTrigger] = useState(0);

    return (
        <main>
            <PokemonRadar trigger={trigger} />

            <button
                onClick={() => setTrigger((value) => value + 1)}
                style={{
                    position: "fixed",
                    zIndex: 10000,
                    top: 20,
                    left: 20,
                    padding: "12px 20px",
                    cursor: "pointer",
                }}
            >
                Lancer le radar
            </button>
        </main>
    );
}
