import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import ProgressBarFight from '../components/progressBarFight.js';

function Fight() {
    const [cookies, setCookie] = useCookies();
    return (
        <div className={"fightContainer"}>
            <p>Lugia</p>
            <ProgressBarFight />
            <div>
                <img class="shinydexSprite" src="/Shinydex/shiny/249.gif">
            </div>
            <div className={"fightActionsContainer"}>
                <div className={"fightActions"}>
                    < img src={"/honey.png"} />
                </div>
                <div className={"fightActions"}>
                    < img src={"/stone.png"} />
                </div>
                <div className={"fightActions"}>
                    < img src={"/ball.png"} />
                </div>
            </div>
        </div>
    )
}

export default Fight
