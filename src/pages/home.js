import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css'
import moment from "moment";
import { useCookies } from 'react-cookie';
import Login from '../services/auth.services.js';

function HomePage(props) {
    const [shinydex, setShinydex] = useState(null);
    const [cookies, setCookie] = useCookies();
    const [onLoad, setOnload] = useState(true);
    useEffect(() => {
        if (typeof cookies.user === "undefined") {
            Axios
                .get("/api/getShinydex")
                .then(function (response) {
                    setShinydex(response.data.sort((a, b) => b.id - a.id))
                    setTimeout(function () {
                        setOnload(false);
                    }, 300);
                })
        } else {
            Axios
                .get("/api/getUser/" + cookies.user.id)
                .then(function (response) {
                    if (response.data.length < 1) {
                        Axios.post('/api/addProfil', {
                            user: cookies.user.id,
                            login: cookies.user.data[0].login,
                            level: 1,
                            xp: 0,
                            skin: 9999,
                            compagnon: 0
                        })
                        .then(function (response) {
                            Axios.post('/api/addCandy', {
                                user: cookies.user.id,
                                item: "Miel Ordinaire",
                                slug: "honey",
                                quantity: 1
                            })
                            .then(function (response) {
                                Axios.post('/api/addCandy', {
                                    user: cookies.user.id,
                                    item: "Bonbon S",
                                    slug: "exps",
                                    quantity: 10
                                })
                                .then(function (response) {
                                    Axios.post('/api/addCandy', {
                                        user: cookies.user.id,
                                        item: "Poke Ball",
                                        slug: "ball",
                                        quantity: 10
                                    })
                                    .then(function (response) {
                                        Axios.post('/api/addCandy', {
                                            user: cookies.user.id,
                                            item: "Super Bonbon",
                                            slug: "rarecandy",
                                            quantity: 0
                                        })
                                        .then(function (response) {
                                            Axios
                                                .get("/api/getShinydex")
                                                .then(function (response) {
                                                    setShinydex(response.data.sort((a, b) => b.id - a.id))
                                                        setOnload(false);
                                                })
                                        })
                                    })
                                })
                            })
                        })
                    } else {
                        Axios
                            .get("/api/getShinydex")
                            .then(function (response) {
                                setShinydex(response.data.sort((a, b) => b.id - a.id))
                                    setOnload(false);
                            })
                    }
                })
            }
    }, []);
    return (
        <div className={"globalContainerCenter"}>
            <h1 className="wood-sign">
                Chromatyk - Ouvre des boosters Pokémon gratuits et capture des Pokémon
            </h1>
            {onLoad === false &&
                <>
                <p className="welcomeText">
                    Bienvenue sur Chromatyk, le jeu Pokémon gratuit de la communauté Twitch.
                    Ouvre des boosters, capture des Pokémons, complète ton Pokédex,
                    participe à l'élevage et gagne des récompenses pendant les streams.
                </p>       
            {typeof cookies.user === "undefined" &&
                <div className={"connectionBar"}>
                    <p>Connectez-vous pour jouer !</p>
                    <Login />
                </div>
            }
                <p>Rejoins les streams et viens discuter sur <a href="https://twitch.tv/chromatyk" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#83d7d7" }}>Twitch</a> !</p>
            <p className="pseudoProfil">Dernier shiny capturé</p>
                {shinydex &&
                    <div style={{ marginBottom: "25px" }} className={"shinydexCard"}>
                    <div className={"shinydexName"}>#{shinydex[0].idPkm} {shinydex[0].pokemon}<br /><span
                        className={"spanShinydex"}>{shinydex[0].surnom}</span></div>
                    <div className={"shinydexSpriteContainer"}>
                        <div>
                                <img alt={"Dernier Shiny"} className={"shinydexSprite"} src={"/Sprites/shiny/" + shinydex[0].idPkm + ".gif"} />
                        </div>
                        {shinydex[0].lien !== null &&
                                <a rel={"noreferrer"} target={"_blank"} href={shinydex[0].lien}><img alt={"youtube"} className={"linkShinydex"}
                                src={"/youtube.png"} /></a>
                        }
                    </div>
                    <div className={"description"}>
                        {moment(shinydex[0].date).utc().format('DD/MM/YYYY')}<br /><span
                            className={"spanShinydex"}>{shinydex[0].version}</span><br />{shinydex[0].description}
                    </div>
                </div>
                }
                <h2 className="wood-sign">Ouvrir des boosters Pokémon</h2>
                <p>
                    Gagne des boosters pendant les streams et découvre de nouvelles cartes.
                </p>

                <h2 className="wood-sign">Capturer des Pokémon</h2>
                <p>
                    Capture des Pokémon rares et légendaires pour compléter ta collection.
                </p>

                <h2 className="wood-sign">Élevage Pokémon</h2>
                <p>
                    Fais éclore des œufs et développe ton élevage pour obtenir des Pokémon uniques.
                </p>
                </>
            }
        </div>        
    )
}

export default HomePage
