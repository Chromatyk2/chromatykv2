import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from 'react-cookie';
import Login from '../services/auth.services.js';

function HomePage(props) {
    const [shinydex, setShinydex] = useState(null);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        Axios
            .get("/api/getShinydex")
            .then(function (response) {
                setShinydex(response.data.sort((a, b) => b.id - a.id))
            })
    }, []);
    return (
        <div className={"containerHome"}>
            <p>Bienvenue,</p>

            {typeof cookies.user === "undefined" &&
                <div className={"connectionBar"}>
                    <p>Connectez-vous pour jouer !</p>
                    <Login />
                </div>
            }
            <div className="socialContainer">
                <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i
                    className="fa-brands fa-discord"></i> Discord</a>
                <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i
                    className="fa-brands fa-twitch"></i> Twitch</a>
                <a className="socialLink" target='_blank' href="https://www.youtube.com/@chromatyk_"><i
                    className="fa-brands fa-youtube"></i> Youtube</a>
                <Link style={{ color: "gold" }} className="navLink linkFromNav socialLink" to="/shinydex">Shinydex</Link>
                <p className="pseudoProfil">Dernier shiny capturé</p>
                {shinydex &&
                    <div className={"shinydexCard"}>
                        <div className={"shinydexName"}>#{shinydex[0].idPkm} {shinydex[0].pokemon}<br /><span
                            className={"spanShinydex"}>{shinydex[0].surnom}</span></div>
                        <div className={"shinydexSpriteContainer"}>
                            <div>
                                <img className={"shinydexSprite"} src={"/Shinydex/shiny/" + shinydex[0].idPkm + ".gif"} />
                            </div>
                            {shinydex[0].lien !== null &&
                                <a target={"_blank"} href={shinydex[0].lien}><img className={"linkShinydex"}
                                    src={"/youtube.png"} /></a>
                            }
                        </div>
                        <div className={"description"}>
                            {moment(shinydex[0].date).utc().format('DD/MM/YYYY')}<br /><span
                                className={"spanShinydex"}>{shinydex[0].version}</span><br />{shinydex[0].description}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage
