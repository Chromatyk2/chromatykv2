import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import ProgressBarFight from '../components/progressBarFight.js';

function Fight() {
    const [cookies, setCookie] = useCookies();
    const [pokemonHp, setPokemonHp] = useState(100);
    const [pokemonMaxHp, setPokemonMaxHp] = useState(1000);
    function throwRock() {
        let dmg = Math.floor((Math.random() * 20) + 1);
        setPokemonHp(pokemonHp - dmg);

    }
    return (
        <div className={"fightContainer"}>
            <p className={"fightName"}>Lugia</p>
            <div className={"tierFight"}>Tier 1</div>
            <div className={"progressBarFightExternal"}>
                <div style={{ width: +100-pokemonHp/pokemonMaxHp + "%" }} className={"progressBarFightInternal"}></div>
            </div>
            <div>
                <img class="fightSprite" src="/Shinydex/shiny/249.gif" />
            </div>
            <div className={"fightActionsContainer"}>
                <div className={"fightActions"}>
                    < img src={"/honey.png"} />
                    <p>Miels</p>
                </div>
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
        </div>
    )
}

export default Fight
