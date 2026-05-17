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
    const [pokemonHpPurcent, setPokemonHpPurcent] = useState(0);
    const [pokemonCurrentHp, setPokemonCurrentHp] = useState(1000);
    const [pokemonMaxHp, setPokemonMaxHp] = useState(1000);
    function throwRock() {
        let dmg = Math.floor((Math.random() * 20) + 1);
        if (pokemonCurrentHp - dmg > 0) {
            setPokemonCurrentHp(pokemonCurrentHp - dmg);
            let currentHP = pokemonCurrentHp - dmg;
            setPokemonHpPurcent(100 - (currentHP / pokemonMaxHp) * 100)
        }
    }

    function getRandomPokemon() {
        const tierRoll =  Math.random() * 100;
        if (tierRoll < 39) {
            var tier = 1;
        } else if (tierRoll < 89) {
            var tier = 2;
        } else if (tierRoll < 99) {
            var tier = 3;
        } else {
            var tier = 4;
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
        } else if (tierRoll < 89) {
            var tier = 2;
        } else if (tierRoll < 99) {
            var tier = 3;
        } else {
            var tier = 4;
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
        } else if (tierRoll < 89) {
            var tier = 2;
        } else if (tierRoll < 99) {
            var tier = 3;
        } else {
            var tier = 4;
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
                <>
                <p className={"fightName"}>{pokemon.name}</p>
                <div className={"tierFight"}>Tier {pokemon.tier}</div>
                    <div className={"progressBarFightExternal"}>
                        <div style={{ width: +parseFloat(100 - pokemonHpPurcent).toFixed(2) + "%" }} className={"progressBarFightInternal"}><p>{parseFloat(100 - pokemonHpPurcent).toFixed(2) + " %"}</p></div>
                </div>
                <div style={{ filter: negative === 1 ? "drop-shadow(0 0 3px black) invert(1)" : "drop-shadow(0 0 3px black)", backgroundImage: `url(/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif)` }} className={"fightSpriteCard"}>
                    {/*<div className={"spriteContainer"}>*/}
                    {/*    <div>*/}
                    {/*        <img style={{ filter: negative === 1 ? "drop-shadow(0 0 3px black) invert(1)" : "drop-shadow(0 0 3px black)" }} class="fightSprite" src={`/Sprites/${shiny === 1 ? "shiny" : "normal"}/${pokemon.number}.gif`} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                </>
            }
            {pokemon ?
                <>
                    <div className={"fightActionsContainer"}>
                        <div onClick={throwRock} className={"fightActions"}>
                            < img src={"/stone.png"} />
                            <p>Cailloux</p>
                            <p>x 1</p>
                        </div>
                        <div className={"fightActions"}>
                            < img src={"/ball.png"} />
                            <p>Balls</p>
                        </div>
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
