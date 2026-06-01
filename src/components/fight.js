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
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const tierRoll = Math.random();
        if (tierRoll < 0.01) {
            var tier = 4;
        } else if (tierRoll < 0.11) {
            var tier = 3;
        } else if (tierRoll < 0.41) {
            var tier = 2;
        } else {
            var tier = 1;
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0]);
                const shiny = Math.floor((Math.random() * 4096) + 1);
                const negative = Math.floor((Math.random() * 8192) + 1);
                let isNegative;
                let isShiny;
                if (negative == 16) {
                    setShiny(0);
                    setNegative(1);
                    setHasAppeared(true);
                    isNegative = 1;
                    isShiny = 0;
                } else if (shiny == 16) {
                    setHasAppeared(true);
                    setShiny(1);
                    setNegative(0);
                    isNegative = 0;
                    isShiny = 1;
                } else {
                    setHasAppeared(true);
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
                    <div className={"progressBarFightExternalVersus"}>
                        <div style={{ width:"50%" }} className={"progressBarFightInternal"}>
                            <p>{"50 / 100"}</p>
                            <div class="heart">
                                <div style={{ backgroundColor: "#rgb(115, 0, 9)" }} class="heartInt">
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <div style={{display:"block",margin:"auto", backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                        <div className={`fightSpriteCardEnemy ${!hasAppeared ? "spawn" : ""} ${isAttacking ? "hit" : ""}`}  style={{ height: "200px", width: "100%", filter: negative === 1 && "invert(1)", backgroundSize: "contain", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)`}} />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProgressBarFight
