import React, { useState, useEffect } from 'react';
import '../App.css'
import Axios from 'axios'


function ProgressBarFight(props) {
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [isAttacking, setIsAttacking] = useState(false);
    const [hasAppeared, setHasAppeared] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAttacking(true);

            setTimeout(() => {
                setIsAttacking(false);
            }, 300); // durée de l'animation
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        Axios.get("/api/getRandomPokemon/" + props.compagnon[0].tier)
            .then(function (response) {
                setHasAppeared(true);
                setPokemon(response.data[0]);
                const shiny = Math.floor((Math.random() * 4096) + 1);
                const negative = Math.floor((Math.random() * 8192) + 1);
                let isNegative;
                let isShiny;
                if (negative == 16) {
                    setShiny(0);
                    setNegative(1);
                    isNegative = 1;
                    isShiny = 0;
                } else if (shiny == 16) {
                    setShiny(1);
                    setNegative(0);
                    isNegative = 0;
                    isShiny = 1;
                } else {
                    setShiny(0);
                    setNegative(0);
                    isNegative = 0;
                    isShiny = 0;
                }
            })
    }, []);
    return (            
        <div className={"globalContainerCenter"}>
            {pokemon &&
                <>
                    <p>Combat</p>
                    <div style={{ flexDirection: "row", flexWrap: "wrap", backgroundImage: `url(/gym.png)`, overflow: "overlay" }} className={"fightContainer"}>
                        <div style={{ width: "30%" }}>
                            <p className="fightName">{props.compagnon[0].pokemon}</p>
                            <div className="tierFight">
                                Nv.{props.compagnon[0].level}
                            </div>
                        <div className={`fightSpriteCardInvert ${!hasAppeared ? "spawnInvert" : ""} ${isAttacking ? "fightAttack" : ""}`} style={{ height: "200px", width: "100%", filter: props.compagnon[0].negative === 1 ? "invert(1)" : "none", backgroundSize: "contain", backgroundImage: `url(/Sprites/${props.compagnon[0].shiny === 1 ? "shiny" : "normal"}/${props.compagnon[0].number}.gif)` }} />
                        </div>
                        <div style={{ width: "33%" }}>
                            <div className="fightSpriteCard" style={{ width: "100%", backgroundSize: "contain", backgroundImage: `url(/versus.png)` }} />
                        </div>
                        <div style={{ width: "30%" }}>
                            <p className="fightName">{pokemon.name}</p>
                        <div className={`fightSpriteCard ${!hasAppeared ? "spawn" : ""} ${isAttacking ? "hit" : ""}`}  style={{ height: "200px", width: "100%", filter: negative === 1 && "invert(1)", backgroundSize: "contain", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)`}} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProgressBarFight
