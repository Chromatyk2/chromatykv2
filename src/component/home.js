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
            <p>Ici, tu peux ouvrir un booster Pokémon toutes les heures, et utiliser tes points de chaîne Twitch pour en ouvrir encore plus ou capturer des Pokémon. <br />
                Complète ton Pokédex, remplis ta collection de cartes, construis ton profil pour flex sur les lives !<br />
                Tout ça, c’est du taff, alors si tu veux me soutenir, passe sur mes streams et pense à lacher ton follow, tu me régalerais !</p>
            {typeof cookies.user === "undefined" &&
                <div className={"connectionBar"}>
                    <p>Connectez-vous pour jouer !</p>
                    <Login />
                </div>
            }
        </div>
    )
}

export default HomePage
