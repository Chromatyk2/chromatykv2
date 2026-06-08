import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import { getColorSync, getPaletteSync } from 'colorthief';
import ProfileHeader from "../components/profile/ProfileHeader";
import ShadowSmokeFrontDex from "../components/shadowSmokeFrontDex";
import ShadowSmokeBackDex from "../components/shadowSmokeBackDex";


function Leaderboard() {
    const [cookies, setCookie] = useCookies();
    const [leaderboard, setLeaderboard] = useState(null);
    const [color, setColor] = useState(1);
    const [colorList, setColorList] = useState(1);
    const pokemonContainerRef = useRef(null);
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
                            <Link to={"/profil?user=" + val.user}>
                                <div className="profilHeader trainerCard">
                                    <div className="trainerContainer">
                                        <img
                                            src={`/SkinsCentered/Trainer${val.skin}.png`}
                                            alt={val.login}
                                            className="trainerSprite"
                                        />
                                        {val.number && (
                                            <div className="pokemonSprite" style={{ position: "absolute", right: "-240px", top: "10px" }}>
                                                {val.negative === 1 && <ShadowSmokeBackDex targetRef={pokemonContainerRef} />}
                                                {val.negative === 1 && <ShadowSmokeFrontDex targetRef={pokemonContainerRef} />}
                                                <img style={{ maxHeight: "63px", width: "auto", maxWidth: "100%" }} className={val.negative === 1 ? "pokemonSprite shadowPokemon" : "pokemonSprite"}
                                                    src={`/Sprites/${val.shiny === 1 ? "shiny" : "normal"}/${val.number}.gif`}
                                                    alt=""
                                                />

                                            </div>
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
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Leaderboard;
