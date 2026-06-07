import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { getColorSync, getPaletteSync } from 'colorthief';
import ProfileHeader from "../components/profile/ProfileHeader";


function Leaderboard() {
    const [cookies, setCookie] = useCookies();
    const [leaderboard, setLeaderboard] = useState(null);
    const [color, setColor] = useState(1);
    const [colorList, setColorList] = useState(1);
    useEffect(() => {
        Axios.get("/api/getLeaderBoard/")
            .then(async (response) => {
                setLeaderboard(response.data)
            })
    }, []);
    return (
        <div className={"globalContainerCenter"}>
            <h2 class="wood-sign" >Communauté</h2>
            <div className={"leaderboardContainer"}>
                {leaderboard &&
                    leaderboard.map((val, key) => {
                        return (
                            <div className="profilHeader trainerCard">
                                <div className="trainerContainer">
                                    <img
                                        src={`/Skins/Trainer${val.skin}.png`}
                                        alt={val.login}
                                        className="trainerSprite"
                                    />
                                    {val.number && (
                                        <div
                                            className="pokemonSprite"
                                            style={{
                                                filter: val.negative ? "invert(1)" : "",
                                                backgroundImage:
                                                    `url("/Sprites/${val.shiny
                                                        ? "Shiny"
                                                        : "Normal"
                                                    }/${val.number}.gif")`
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="profilInfos">
                                    <p className="trainerName">
                                        {val.login}
                                    </p>
                                    <p className="levelProfil">
                                        Niveau {val.level}
                                    </p>
                                    <div className={`title${val.title_rarity}`}>
                                        {val.title_rarity === "legendary" && "⭐ "}
                                        {val.title_rarity === "mythic" && "👑 "}
                                        {val.title_name}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Leaderboard;
