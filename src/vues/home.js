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
        if (typeof cookies.user === "undefined") {
            Axios
                .get("/api/getShinydex")
                .then(function (response) {
                    setShinydex(response.data.sort((a, b) => b.id - a.id))
                })
        } else {
            Axios.post('/api/addProfil', {
                user: cookies.user.data[0].id,
                login: cookies.user.data[0].login,
                level: 1,
                xp: 0,
                skin: 9999,
                compagnon: 0
            }).then(function (response) {
                Axios.post('/api/addItem', {
                    user: cookies.user.data[0].id,
                    item: "Lootbox",
                    slug: "box"
                }).then(function (response) {
                    Axios
                        .get("/api/getShinydex")
                        .then(function (response) {
                            setShinydex(response.data.sort((a, b) => b.id - a.id))
                        })
                })
            })
        }
    }, []);
    return (
        <div className={"globalContainerCenter"}>
            {typeof cookies.user === "undefined" ?
                <p>Bienvenue</p>
                :
                <p>Bienvenue,{cookies.user.data[0].login}</p>
            }
            
            {typeof cookies.user === "undefined" &&
                <div className={"connectionBar"}>
                    <p>Connectez-vous pour jouer !</p>
                    <Login />
                </div>
            }
            <p className="pseudoProfil">Dernier shiny capturé</p>
            {shinydex &&
                <div className={"shinydexCard"}>
                    <div className={"shinydexName"}>#{shinydex[0].idPkm} {shinydex[0].pokemon}<br /><span
                        className={"spanShinydex"}>{shinydex[0].surnom}</span></div>
                    <div className={"shinydexSpriteContainer"}>
                        <div>
                            <img className={"shinydexSprite"} src={"/Sprites/shiny/" + shinydex[0].idPkm + ".gif"} />
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
    )
}

export default HomePage
