import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import ProgressBarFight from '../components/progressBarFight.js';

function Fight() {
    const [cookies, setCookie] = useCookies();
    const [pokemon, setPokemon] = useState(null);
    const [shiny, setShiny] = useState(null);
    const [negative, setNegative] = useState(null);
    const [maxLove, setMaxLove] = useState(0);
    const [currentLove, setCurrentLove] = useState(0);
    const [catchRate, setCatchRate] = useState(0);
    const [onCatch, setOnCatch] = useState(false);
    function fleeFight() {
        setPokemon(null);
        setCurrentLove(0)
    }
    function addLove(e) {
        setCurrentLove(currentLove + e);
    }
    function catchPokemon(e, f) {
        setOnCatch(true);
        var rate = (f+1) - e;
        const tryCatch = Math.floor(Math.random() * rate);
        console.log(tryCatch);
    }
    function getRandomPokemon() {
        const tierRoll =  Math.random() * 100;
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50);
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100);
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150);
        } else {
            var tier = 4;
            setMaxLove(250);
        }
        Axios.get("/api/getRandomPokemon/"+tier)
        .then(function (response) {
            setPokemon(response.data[0])
            const shiny = Math.floor((Math.random() * 4096) + 1);
            const negative = Math.floor((Math.random() * 8192) + 1);
            if (negative == 16) {
                setShiny(0);
                setNegative(1);
            } else if (shiny == 16) {
                setShiny(1);
                setNegative(0);
            } else {
                setShiny(0);
                setNegative(0);
            }
        })
    }
    function getLegendaryPokemon() {
        setMaxLove(250)
        Axios.get("/api/getRandomPokemon/4")
            .then(function (response) {
                setPokemon(response.data[0])
                const shiny = Math.floor((Math.random() * 4096) + 1);
                const negative = Math.floor((Math.random() * 8192) + 1);
                if (negative == 16) {
                    setShiny(0);
                    setNegative(1);
                } else if (shiny == 16) {
                    setShiny(1);
                    setNegative(0);
                } else {
                    setShiny(0);
                    setNegative(0);
                }
            })
    }
    function getShinyPokemon() {
        const tierRoll = Math.random() * 100;
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50)
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100)
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150)
        } else {
            var tier = 4;
            setMaxLove(250)
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0]);
                setShiny(1);
                setNegative(0);
            })
    }
    function getNegativePokemon() {
        const tierRoll = Math.random() * 100;
        if (tierRoll < 39) {
            var tier = 1;
            setMaxLove(50)
        } else if (tierRoll < 89) {
            var tier = 2;
            setMaxLove(100)
        } else if (tierRoll < 99) {
            var tier = 3;
            setMaxLove(150)
        } else {
            var tier = 4;
            setMaxLove(250)
        }
        Axios.get("/api/getRandomPokemon/" + tier)
            .then(function (response) {
                setPokemon(response.data[0])
                setShiny(0);
                setNegative(1);
            })
    }
    return (
        <div className={"fightContainer"}>
            {pokemon &&
                <div onClick={fleeFight} className={"fightActionsFlee"}>
                    < img src={"/boot.png"} />
                    <p>Fuire</p>
                </div>
            }
            {pokemon &&
                <>
                <p className={"fightName"}>{pokemon.name}</p>
                <div style={{ backgroundColor: pokemon.tier == 1 ? "#6d6d6c" : pokemon.tier == 2 ? "#21693a" : pokemon.tier == 3 ? "#744095" : "#bfa93a" }} className={"tierFight"}>Tier {pokemon.tier}</div>
                    <div className={"progressBarFightExternal"}>
                    <div style={{ width: +parseFloat(currentLove/maxLove*100).toFixed(2) + "%" }} className={"progressBarFightInternal"}>
                        <p>{currentLove + "/" + maxLove}</p>
                        <div class="heart">
                            <div style={{ backgroundColor: currentLove < maxLove ? "#fff" :"#cc333f"}} class="heartInt">
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ filter: negative === 1 && "invert(1)", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)` }} className={"fightSpriteCard"}>
                    <div style={{visibility:onCatch ? "visible" : "hidden"}} class="pokeball"></div>  
                </div>
                </>
            }
            {pokemon ?
                <>
                    <div className={"fightActionsContainer"}>
                        {currentLove < maxLove ?
                            <>
                                <div onClick={() => addLove(10)} className={"fightActions"}>
                                    < img src={"/exps.png"} />
                                    <p>Bonbon S</p>
                                    <p>x 1</p>
                                </div>
                                <div onClick={() => addLove(25)} className={"fightActions"}>
                                    < img src={"/expm.png"} />
                                    <p>Bonbon M</p>
                                    <p>x 1</p>
                                </div>
                                <div onClick={() => addLove(50)} className={"fightActions"}>
                                    < img src={"/expl.png"} />
                                    <p>Bonbon L</p>
                                    <p>x 1</p>
                                </div>
                            </>
                            :
                            <>
                                <div onClick={() => catchPokemon(0, pokemon.tier)} className={"fightActions"}>
                                    < img src={"/ball.png"} />
                                    <p>Pokéball</p>
                                    <p>x 1</p>
                                </div>
                                <div onClick={() => catchPokemon(1, pokemon.tier)} className={"fightActions"}>
                                    < img src={"/great.png"} />
                                    <p>Super Ball</p>
                                    <p>x 1</p>
                                </div>
                                <div onClick={() => catchPokemon(2,pokemon.tier)} className={"fightActions"}>
                                    < img src={"/ultra.png"} />
                                    <p>Hyper Ball</p>
                                    <p>x 1</p>
                                </div>
                                <div onClick={() => catchPokemon(4,pokemon.tier)} className={"fightActions"}>
                                    < img src={"/master.png"} />
                                    <p>Master Ball</p>
                                    <p>x 1</p>
                                </div>
                            </>
                        }
                    </div>
                </>
                :
                <>
                    <div className={"honeyActionsContainer"}>
                        <div onClick={getRandomPokemon} className={"honeyActions"}>
                            <img style={{ filter: "drop-shadow(white 0px 0px 5px) hue-rotate(352deg) contrast(1.1)" }} src={"/honey.png"} />
                            <p>Miel<br/>Classique</p>
                        </div>
                        <div onClick={getLegendaryPokemon} className={"honeyActions"}>
                            <img style={{ filter:"drop-shadow(red 0px 0px 5px) hue-rotate(303deg) contrast(1.1)" }} src={"/honey.png"} />
                            <p>Miel<br/>Légendaire</p>
                        </div>
                        <div onClick={getShinyPokemon} className={"honeyActions"}>
                            <img style={{ filter:"drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3)"}} src={"/honey.png"} />
                            <p>Miel<br/>Chromatique</p>
                        </div>
                        <div onClick={getNegativePokemon} class="honeyActions">
                            <img src="/honey.png" style={{filter: "drop-shadow(gold 0px 0px 5px) hue-rotate(15deg) contrast(1.3) invert(1)"}} />
                            <p>Miel<br/>Négatif</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Fight
